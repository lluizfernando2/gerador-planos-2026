import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportToGoogleSheets } from '../lib/sheets';
import { mapAuthError } from '../lib/firebase';

describe('Google Sheets Integration & Auth Diagnostics', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('throws an error when OAuth token is absent', async () => {
    await expect(exportToGoogleSheets('Test Title', [['Header 1']], ''))
      .rejects
      .toThrow(/Token OAuth do Google ausente/);
  });

  it('creates and populates spreadsheet when valid token and data are provided', async () => {
    const mockSpreadsheetId = 'sheet-abc-123';
    const mockSpreadsheetUrl = `https://docs.google.com/spreadsheets/d/${mockSpreadsheetId}/edit`;

    global.fetch = vi.fn().mockImplementation((url: string, opts: any) => {
      if (url.includes('https://sheets.googleapis.com/v4/spreadsheets') && opts?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ spreadsheetId: mockSpreadsheetId, spreadsheetUrl: mockSpreadsheetUrl })
        });
      }
      if (url.includes('/values/') && opts?.method === 'PUT') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ updatedRows: 2 })
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    }) as any;

    const result = await exportToGoogleSheets('Meu Plano', [['Aula', 'Conteúdo'], ['1', 'Introdução']], 'fake-access-token');
    expect(result).toBe(mockSpreadsheetUrl);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('correctly maps 401 and 403 API errors to human-actionable messages', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: 'Invalid Credentials' } })
    });

    await expect(exportToGoogleSheets('Test', [['1']], 'expired-token'))
      .rejects
      .toThrow(/Sessão Google expirada/);
  });

  it('correctly maps Firebase auth error codes', () => {
    const popupError = mapAuthError({ code: 'auth/popup-blocked' });
    expect(popupError.message).toContain('popup de login foi bloqueada');

    const domainError = mapAuthError({ code: 'auth/unauthorized-domain' });
    expect(domainError.message).toContain('não está autorizado');

    const closedError = mapAuthError({ code: 'auth/popup-closed-by-user' });
    expect(closedError.message).toContain('fechada antes de concluir');
  });
});
