import DOMPurify from 'dompurify';

let purifyInstance: any = null;

function getPurifier() {
  if (purifyInstance && typeof purifyInstance.sanitize === 'function') {
    return purifyInstance;
  }
  if (typeof DOMPurify?.sanitize === 'function') {
    purifyInstance = DOMPurify;
    return purifyInstance;
  }
  if (typeof window !== 'undefined') {
    purifyInstance = (DOMPurify as any)(window);
    return purifyInstance;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM('');
    purifyInstance = (DOMPurify as any)(dom.window);
    return purifyInstance;
  } catch {
    return DOMPurify;
  }
}

/**
 * Sanitizes HTML content intended for in-browser DOM preview,
 * stripping executable scripts, malicious event handlers and unsafe URIs
 * while preserving styling, tables, colgroups, classes and custom data attributes.
 */
export function sanitizePreviewHtml(rawHtml: string): string {
  if (!rawHtml) return '';

  const purifier = getPurifier();
  return purifier.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'div', 'span', 'p', 'b', 'i', 'strong', 'em', 'u', 's', 'small', 'sub', 'sup',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'hr',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'colgroup', 'col',
      'ul', 'ol', 'li', 'img', 'svg', 'path', 'button', 'section', 'header', 'footer'
    ],
    ALLOWED_ATTR: [
      'class', 'id', 'style', 'width', 'height', 'border', 'align', 'valign',
      'colspan', 'rowspan', 'colSpan', 'rowSpan',
      'src', 'alt', 'title', 'data-week-idx',
      'xmlns', 'viewBox', 'fill', 'stroke', 'stroke-width', 'd'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$)|data:image\/(?:png|jpeg|gif|webp|svg\+xml);base64,)/i,
    ALLOW_DATA_ATTR: true,
  });
}
