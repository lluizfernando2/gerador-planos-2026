import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../lib/escapeHtml';

describe('escapeHtml utility', () => {
  it('escapes &, <, >, ", and \'', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    expect(escapeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(escapeHtml("Docente's Class")).toBe('Docente&#39;s Class');
    expect(escapeHtml('"><img src=x onerror=alert(1)>')).toBe('&quot;&gt;&lt;img src=x onerror=alert(1)&gt;');
  });

  it('handles null, undefined, numbers and booleans', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(123)).toBe('123');
    expect(escapeHtml(true)).toBe('true');
  });

  it('preserves normal text and accented characters', () => {
    const text = 'Educação Física & Matemática: João da Silva - São Paulo';
    expect(escapeHtml(text)).toBe('Educação Física &amp; Matemática: João da Silva - São Paulo');
  });
});
