/**
 * Escapes characters with special meaning in HTML (&, <, >, ", ')
 * to protect against Cross-Site Scripting (XSS) and broken markup.
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) {
    return '';
  }
  const s = String(str);
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
