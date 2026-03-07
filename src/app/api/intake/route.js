const SHEET_ID = "13LGBqIWpevC2igU6h92H2RBwyL3THJj9WGJje7ZzsYo";
const APP_SCRIPT_URL = process.env.APP_SCRIPT_WEB_APP_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      address,
      phone,
      service,
      message,
      time_submitted,
      date_submitted,
      device_type,
      submitted_from,
    } = body;
    if (!name || !email || !service) {
      return Response.json(
        { message: "Name, email, and service are required." },
        { status: 400 }
      );
    }
    const row = [
      String(name).trim(),
      String(email).trim(),
      (address && String(address).trim()) || "",
      (phone && String(phone).trim()) || "",
      String(service).trim(),
      (message && String(message).trim()) || "",
      (time_submitted && String(time_submitted)) || "",
      (date_submitted && String(date_submitted)) || "",
      (device_type && String(device_type)) || "unknown",
      (submitted_from && String(submitted_from)) || "",
    ];

    if (APP_SCRIPT_URL) {
      const res = await fetch(APP_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheetId: SHEET_ID, row }),
      });
      if (!res.ok) {
        const text = await res.text();
        return Response.json(
          { message: text || "Failed to save to sheet." },
          { status: 502 }
        );
      }
      return Response.json({ ok: true });
    }

    return Response.json(
      { message: "Form not configured. Set APP_SCRIPT_WEB_APP_URL in .env (see scripts/README for Apps Script)." },
      { status: 501 }
    );
  } catch (e) {
    return Response.json(
      { message: "Server error. Please try again or call Celine." },
      { status: 500 }
    );
  }
}
