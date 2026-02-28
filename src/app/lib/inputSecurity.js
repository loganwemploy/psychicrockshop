/**
 * Client-side input constraints and sanitization.
 * Server must still use parameterized queries / prepared statements to prevent SQL injection.
 */

/** Max lengths by purpose (align with DB/API limits when you add backend). */
export const INPUT_MAX_LENGTHS = {
  /** Full name (e.g. "First Last" or "First Middle Last") */
  name: 120,
  /** Email per RFC 5321 */
  email: 254,
  /** ZIP code or city/town name */
  location: 100,
  /** Short message (e.g. footer "Leave us a message") */
  shortMessage: 500,
};

/**
 * Sanitize text for safe client→server use: trim, strip control chars and null bytes.
 * Does NOT prevent SQL injection; server must use parameterized queries.
 */
export function sanitizeText(value, maxLength = 0) {
  if (value == null || typeof value !== "string") return "";
  let s = value.trim();
  // Remove null bytes and control characters (except tab, newline, carriage return)
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  if (maxLength > 0) s = s.slice(0, maxLength);
  return s;
}

/**
 * Sanitize email: trim and enforce max length. Basic format still validated by type="email" / server.
 */
export function sanitizeEmail(value) {
  if (value == null || typeof value !== "string") return "";
  return value.trim().slice(0, INPUT_MAX_LENGTHS.email);
}
