/**
 * Deploy as Web App (Execute as: Me, Who has access: Anyone).
 * Copy this into your Google Sheet: Extensions > Apps Script, then Deploy > New deployment > Web app.
 * Set APP_SCRIPT_WEB_APP_URL in your .env to the Web app URL.
 *
 * Sheet columns: A:name, B:email, C:address, D:phone_number, E:service_interest, F:message,
 * G:time_submitted, H:date_submitted, I:device_type, J:submitted_from
 */
const SHEET_ID = '13LGBqIWpevC2igU6h92H2RBwyL3THJj9WGJje7ZzsYo';
const EMAIL_TO = 'logothepogo1212@gmail.com';
const HEADERS = [
  'name',
  'email',
  'address',
  'phone_number',
  'service_interest',
  'message',
  'time_submitted',
  'date_submitted',
  'device_type',
  'submitted_from'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetId = data.sheetId || SHEET_ID;
    const row = data.row || [];
    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheets()[0];
    const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    if (!existing || existing.join('') === '') {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }
    const fullRow = row.length >= HEADERS.length ? row.slice(0, HEADERS.length) : [...row, ...Array(HEADERS.length - row.length).fill('')];
    sheet.appendRow(fullRow);
    const emailBody = HEADERS.map(function (h, i) { return h + ': ' + (fullRow[i] || ''); }).join('\n');
    MailApp.sendEmail(EMAIL_TO, 'New intake: ' + (row[0] || 'No name'), emailBody);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
