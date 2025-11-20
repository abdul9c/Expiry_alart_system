# Expiry Alert System

Short description
-----------------

Expiry Alert System is a lightweight web application to track product expiration dates, receive alerts, and manage a small inventory. It includes a simple frontend (HTML/CSS/JS) and a Flask+SQLite backend that provides basic product CRUD and simple user registration/login endpoints.

Key features
------------

- Add products with name, description, and expiration date.
- View a product list showing expiration status (Expired / Less than 2 weeks / Good).
- Delete products from the list.
- Basic user registration and login API endpoints (no token-based auth yet).

API Endpoints (provided by `app.py`)
-----------------------------------

- `GET /api/products` — list products
- `POST /api/products` — add product (JSON: `{name, description, expiration_date}`)
- `DELETE /api/products/<id>` — delete product
- `POST /api/register` — register user (JSON: `{username, email, password}`)
- `POST /api/login` — login (JSON: `{email, password}`)

Quick setup (local)
-------------------

Run these commands from the project root:

```bash
# create and activate a virtualenv
python3 -m venv .venv
source .venv/bin/activate

# install dependencies
pip install -r requirements.txt

# initialize DB
python3 db_init.py

# run backend (Flask, port 5000)
python3 app.py

# in another terminal serve static frontend (port 8000)
python3 -m http.server 8000
```

Open the frontend: `http://localhost:8000/index.html` (add product) and `http://localhost:8000/products.html` (view/delete products).

Notes & next steps
------------------

- Secure authentication: add JWT tokens or server-side sessions and protect product endpoints.
- Server-side validation and improved error responses.
- Add tests for API endpoints and JavaScript integration tests.
- Consider deploying using a WSGI server (Gunicorn/uvicorn) behind Nginx and move the static frontend to a CDN.

License & contribution
----------------------

This is a personal project scaffold — add a license file (`LICENSE`) and contribution guidelines if you want others to collaborate.
