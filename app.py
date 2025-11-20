from flask import Flask, request, jsonify, g
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'data.db')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'change-this-secret'
CORS(app)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def execute_db(query, args=()):
    db = get_db()
    cur = db.execute(query, args)
    db.commit()
    return cur.lastrowid

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify(success=False, message='Email and password required'), 400
    existing = query_db('SELECT id FROM users WHERE email = ?', (email,), one=True)
    if existing:
        return jsonify(success=False, message='Email already registered'), 400
    pw_hash = generate_password_hash(password)
    user_id = execute_db('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', (username, email, pw_hash))
    return jsonify(success=True, user_id=user_id)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify(success=False, message='Email and password required'), 400
    user = query_db('SELECT * FROM users WHERE email = ?', (email,), one=True)
    if not user:
        return jsonify(success=False, message='User not found'), 404
    if not check_password_hash(user['password_hash'], password):
        return jsonify(success=False, message='Invalid credentials'), 401
    # For simplicity, we won't implement tokens now; client can rely on session or proceed without auth
    return jsonify(success=True, user_id=user['id'], username=user['username'])

@app.route('/api/products', methods=['GET'])
def get_products():
    rows = query_db('SELECT id, name, description, expiration_date FROM products ORDER BY id DESC')
    products = [dict(r) for r in rows]
    return jsonify(products=products)

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json() or {}
    name = data.get('name')
    description = data.get('description', '')
    expiration_date = data.get('expiration_date')
    if not name or not expiration_date:
        return jsonify(success=False, message='Name and expiration_date required'), 400
    pid = execute_db('INSERT INTO products (name, description, expiration_date) VALUES (?, ?, ?)', (name, description, expiration_date))
    return jsonify(success=True, id=pid)

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    execute_db('DELETE FROM products WHERE id = ?', (product_id,))
    return jsonify(success=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
