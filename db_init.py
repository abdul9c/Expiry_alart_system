"""Initialize the SQLite database for the Expiry Alert System."""
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'data.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            expiration_date TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()
    print('Initialized database at', DB_PATH)

if __name__ == '__main__':
    init_db()
