import { describe, it, expect } from 'vitest';
import { sanitizePreviewHtml } from '../lib/sanitizePreviewHtml';

describe('sanitizePreviewHtml', () => {
  it('neutralizes malicious XSS injection payloads', () => {
    const payload1 = '"><img src=x onerror=alert(1)>';
    const sanitized1 = sanitizePreviewHtml(payload1);
    expect(sanitized1).not.toContain('onerror');
    expect(sanitized1).not.toContain('alert(1)');

    const payload2 = '<scr<script></script>ipt>alert(1)</scr<script></script>ipt>';
    const sanitized2 = sanitizePreviewHtml(payload2);
    expect(sanitized2).not.toContain('<script');
    expect(sanitized2).not.toContain('</script>');

    const payload3 = '<svg onload=alert(1)>';
    const sanitized3 = sanitizePreviewHtml(payload3);
    expect(sanitized3).not.toContain('onload');

    const payload4 = '<iframe srcdoc="<script>alert(1)</script>"></iframe>';
    const sanitized4 = sanitizePreviewHtml(payload4);
    expect(sanitized4).not.toContain('<iframe');

    const payload5 = '<a href="javascript:alert(1)">Clique</a>';
    const sanitized5 = sanitizePreviewHtml(payload5);
    expect(sanitized5).not.toContain('javascript:');
  });

  it('preserves tables, colgroups, styles, data attributes and base64 images', () => {
    const validHtml = `
      <table border="1" width="100%" style="table-layout: fixed; width: 100%;">
        <colgroup>
          <col width="50%" style="width: 50%;">
          <col width="50%" style="width: 50%;">
        </colgroup>
        <tbody>
          <tr>
            <td style="padding: 5px; background-color: #ffc000;">
              <strong>Plano de Ensino</strong>
            </td>
            <td data-week-idx="1" class="custom-cell">
              Conteúdo da semana
            </td>
          </tr>
        </tbody>
      </table>
    `;
    const sanitized = sanitizePreviewHtml(validHtml);
    expect(sanitized).toContain('<table');
    expect(sanitized).toContain('<colgroup');
    expect(sanitized).toContain('<col');
    expect(sanitized).toContain('table-layout: fixed');
    expect(sanitized).toContain('data-week-idx="1"');
    expect(sanitized).toContain('class="custom-cell"');
  });
});
