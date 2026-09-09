BLUSHCART V9 — LAUNCH PREPARATION
=================================

WHAT IS NEW
- /api/health endpoint for hosting health checks.
- Razorpay webhook endpoint: POST /api/webhooks/razorpay
- Webhook HMAC-SHA256 verification using the RAW request body.
- Duplicate webhook protection using X-Razorpay-Event-Id.
- payment.captured / order.paid reconciliation and payment.failed handling.
- Configurable persistent SQLite path via BLUSHCART_DB_PATH.
- Admin courier + tracking number + tracking URL controls.
- Customer My Orders page displays shipment tracking.
- Security headers on API/static responses.
- Dockerfile + health check + database backup helper.

LOCAL START
1. Extract the folder.
2. In the folder run: python server.py
3. Open: http://127.0.0.1:5000
4. Health test: http://127.0.0.1:5000/api/health

FIRST ADMIN
http://127.0.0.1:5000/admin_setup.html
Then login through My Account and open:
http://127.0.0.1:5000/admin_live.html

RAZORPAY TEST MODE
Set BLUSHCART_SECRET, RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET before starting.
Also set a separate RAZORPAY_WEBHOOK_SECRET.
In Razorpay Dashboard (TEST mode), configure webhook URL:
  https://YOUR-DOMAIN/api/webhooks/razorpay
Recommended events for this starter:
  order.paid
  payment.captured
  payment.failed

IMPORTANT: the webhook secret is NOT the same thing as your Razorpay Key Secret.
Never put either secret in HTML or JavaScript.

PRODUCTION / HOSTING
- Set BLUSHCART_HOST=0.0.0.0.
- Set BLUSHCART_HTTPS=1 when your public site is HTTPS.
- Set PUBLIC_BASE_URL to your real https:// domain.
- Mount a persistent disk and set BLUSHCART_DB_PATH, for example /data/blushcart.db.
- Back up the database using: python backup_db.py
- The included Dockerfile can be deployed to a container host.
- Use your hosting provider's TLS/HTTPS termination and domain DNS.

SHIPPING
V9 includes provider-neutral shipping fields. In Admin Orders enter:
- Courier name
- Tracking number
- Tracking URL
Then set order status to Shipped and Save. The customer sees it in My Orders.
A courier API (Shiprocket/Delhivery/etc.) is intentionally not hard-coded because it requires your merchant account and API credentials. These fields are ready to receive those values later.

BEFORE LIVE SALES
- Replace demo products, prices, contact details and legal/policy text.
- Test customer registration, logout/login, COD, Razorpay TEST checkout, failed payment and webhook recovery.
- Test stock updates under multiple orders.
- Test admin permissions and use a strong admin password.
- Switch from Razorpay TEST to LIVE keys only after testing.
- Configure production webhook separately in Razorpay LIVE mode.
- Confirm your shipping/courier account and return workflow.
- Keep regular off-site database backups.

NOTE
This remains a compact starter architecture. SQLite is suitable for learning, demos and modest single-instance deployments. For higher traffic or multi-instance hosting, migrate the database layer to a managed relational database and run behind a production application server/reverse proxy.
