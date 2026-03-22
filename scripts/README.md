# Google Sheets intake form backend

The footer form posts to `/api/intake`, which forwards to a Google Apps Script Web App.

## Setup

1. Open the [Google Sheet](https://docs.google.com/spreadsheets/d/13LGBqIWpevC2igU6h92H2RBwyL3THJj9WGJje7ZzsYo/edit) (or create one and update the ID in code).
2. In the sheet: **Extensions → Apps Script**. Delete any sample code and paste the contents of `google-sheets-intake-apps-script.js`.
3. Save the project. Click **Deploy → New deployment**. Choose **Web app**.
   - Description: e.g. "Intake form"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**. Copy the **Web app URL**.
5. In this repo root, create or edit `.env.local`:
   ```bash
   APP_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/.../exec
   ```
6. Restart the Next.js dev server.

Submissions will append a row to the sheet (name, email, address, city, phone, service, message, timestamps, device, source) and send a notification email.

**SMS alert:** The Apps Script sends that notification to **`8472620158@vtext.com`** (Verizon email-to-SMS) with the full intake details in the message body. This happens in the **same** `doPost` request that appends the row—no separate “watch the sheet” trigger is required for form submissions.

After you change `EMAIL_TO` or any script logic, **Deploy → Manage deployments → Edit** (or new deployment) and pick a new version, then save—otherwise the live Web App keeps running the old code.
