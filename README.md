# Everlasting Kin

A respectful, modern platform for connecting lost loved ones with their families, supporting mortuary staff, police, and the public.

## Features

- Robust, role-based authentication
- OTP verification and admin approvals
- Public search (read-only), staff/police/admin dashboards
- Audit logging and notification tracking
- SMS/WhatsApp/Email integration (Twilio, SendGrid)
- Admin-only editing, all others view-only
- Accessible, single-page app with popups/menus
- Deployed easily on **Netlify** and **Supabase**

## Setup

1. **Clone the repo and install dependencies:**
   ```sh
   npm install
   ```

2. **Supabase Project:**
   - Create a [Supabase](https://supabase.com/) project
   - Run the SQL in `schema/everlasting-kin.sql`
   - Get your SUPABASE_URL and SUPABASE_ANON_KEY

3. **Configure Environment:**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase and notification provider keys

4. **Notification Providers:**
   - [Twilio](https://twilio.com/) for SMS/WhatsApp
   - [SendGrid](https://sendgrid.com/) for email
   - Paste your API keys in `.env`

5. **Run Locally:**
   ```sh
   npm run dev
   ```

6. **Deploy to Netlify:**
   - Connect your GitHub repo to Netlify
   - Set the same environment variables in Netlify dashboard

## Notes

- **Admin creation:** Only via registration form; all edits restricted to admin role.
- **Scaling:** Supabase/Postgres and Netlify can easily scale; see README for future scaling tips.
- **Notifications:** All logs are stored in the database (see `notification_logs` table).
- **Logo and branding** in `public/`.

---

**For support or improvements, see the `README.md` for suggestions and onboarding tips!**