BLUSHCART V7 — FULL-STACK STARTER

WHAT IS REAL IN THIS VERSION
- Flask backend server
- SQLite database
- Customer register/login/logout
- Password hashing (Werkzeug)
- Server-side sessions
- Database-backed products and stock
- Real COD orders saved in SQLite
- Inventory reduces after successful order
- First-run secure admin setup endpoint
- Admin product/order APIs

WHAT IS NOT LIVE YET
- Razorpay/UPI/card payment: requires your real Razorpay account + API keys
- Email/SMS/OTP
- Production hosting/domain/SSL
- Courier/shipping API

HOW TO RUN ON WINDOWS
1. Install Python 3.11+ from python.org (tick "Add Python to PATH").
2. Extract this ZIP.
3. Open Command Prompt inside the extracted folder.
4. Run:  python server.py
5. Open: http://127.0.0.1:5000

No pip install is needed in V7.

FIRST ADMIN
1. Start server.py.
2. Open: http://127.0.0.1:5000/admin_setup.html
3. Create your admin with a strong password (10+ characters).
4. The setup endpoint automatically disables itself after the first admin is created.
5. Open: http://127.0.0.1:5000/admin_live.html for the database-backed admin dashboard.

CUSTOMER TEST
1. Open account.html through the server and create a customer account.
2. Add products to cart.
3. Checkout with Cash on Delivery.
4. Open My Orders.
5. Order and stock are stored in blushcart.db.

IMPORTANT
Do not double-click index.html for real backend features. Double-click/file mode remains useful only as the old front-end demo. For database/login/orders, always use http://127.0.0.1:5000 after running server.py.

Before a public launch, use a permanent BLUSHCART_SECRET environment variable, HTTPS, a production WSGI server, backups, CSRF protection, rate limiting, email verification, and your final legal/product content.
