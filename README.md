# Expiry Alert System — Local Development

This project is a small web app to track product expiration dates. It includes a frontend (HTML/CSS/JS) and a simple Flask+SQLite backend.

Setup

1. Create a Python virtual environment and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Initialize the database:

```bash
python3 db_init.py
```

3. Run the server:

```bash
python3 app.py
```

4. Serve frontend files or open `index.html` directly. For best results, run a dev server from the project root:

```bash
# from project root
python3 -m http.server 8000
```

Then visit `http://localhost:8000` and use the UI.

Notes & Next Steps

- The backend provides REST endpoints under `/api/*` for products and basic auth (no tokens implemented).
- Improve authentication with JWT and sessions for protected operations.
- Add validation and better error handling server-side.
- Add tests and CI integration.