BLUSHCART V8 — Payments + Addresses + Order Status

1) LOCAL COD TEST
   python server.py
   Open http://127.0.0.1:5000
   Create/login to a customer account, add a saved address, place a COD order.

2) RAZORPAY TEST MODE
   Create Razorpay TEST keys in your Razorpay Dashboard.
   Set environment variables BEFORE running server.py.

   Windows PowerShell example:
     $env:BLUSHCART_SECRET="use-a-long-random-value"
     $env:RAZORPAY_KEY_ID="rzp_test_xxxxx"
     $env:RAZORPAY_KEY_SECRET="xxxxx"
     python server.py

   macOS/Linux example:
     export BLUSHCART_SECRET='use-a-long-random-value'
     export RAZORPAY_KEY_ID='rzp_test_xxxxx'
     export RAZORPAY_KEY_SECRET='xxxxx'
     python server.py

   Then checkout will enable Razorpay.
   The server creates a Razorpay Order and verifies the returned payment signature with HMAC SHA-256 before marking the BLUSHCART order paid and reducing stock.

3) ADMIN
   First admin: http://127.0.0.1:5000/admin_setup.html
   Admin dashboard: http://127.0.0.1:5000/admin_live.html
   Order status can be changed to Processing, Packed, Shipped, Delivered, etc.

4) BEFORE GOING LIVE
   - Use strong BLUSHCART_SECRET and HTTPS.
   - Use Razorpay Live keys only after test-mode checkout is fully verified.
   - Configure Razorpay webhooks for reliable server-side payment reconciliation.
   - Replace demo products/policies/contact information.
   - Use a production-grade deployment stack; this built-in Python server is a starter, not a hardened production server.
   - Back up/migrate SQLite to a managed database when traffic grows.

IMPORTANT: Never share your Razorpay KEY SECRET in chat, screenshots, or frontend code.
