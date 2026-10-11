import { getGoogleAccessToken } from './firebase';

/**
 * Exports data directly to Google Sheets via Google Sheets API v4.
 * Creates a new spreadsheet in the user's Google Drive and writes the tabular data.
 *
 * Supports flexible parameter signatures:
 * - exportToGoogleSheets(title, values, token?)
 * - exportToGoogleSheets(token, title, values)
 */
export async function exportToGoogleSheets(
  titleOrToken: string,
  dataOrTitle: any[][] | string,
  tokenOrData?: string | any[][]
): Promise<string> {
  let token: string = '';
  let title: string = '';
  let values: any[][] = [];

  if (typeof titleOrToken === 'string' && Array.isArray(dataOrTitle)) {
    title = titleOrToken;
    values = dataOrTitle;
    token = (typeof tokenOrData === 'string' ? tokenOrData : '') || getGoogleAccessToken() || '';
  } else if (typeof titleOrToken === 'string' && typeof dataOrTitle === 'string' && Array.isArray(tokenOrData)) {
    token = titleOrToken;
    title = dataOrTitle;
    values = tokenOrData;
  } else {
    title = 'Planejamento Curricular SP 2026';
    values = Array.isArray(dataOrTitle) ? dataOrTitle : (Array.isArray(tokenOrData) ? tokenOrData : []);
    token = getGoogleAccessToken() || '';
  }

  if (!token) {
    throw new Error('Token OAuth do Google ausente. Por favor, conecte-se com sua conta Google para autorizar o acesso ao Google Sheets.');
  }

  // 1. Create a new Spreadsheet in the user's Google Drive
  const createResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: title || 'Planejamento Curricular SP 2026'
      }
    })
  });

  if (!createResponse.ok) {
    throw await formatGoogleApiError(createResponse);
  }

  const sheetData = await createResponse.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Write data values if rows were provided
  if (values && values.length > 0) {
    const range = encodeURIComponent('Página1!A1');
    const writeResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values })
      }
    );

    if (!writeResponse.ok) {
      // Fallback for spreadsheets where default sheet is 'Sheet1'
      const fallbackRange = encodeURIComponent('Sheet1!A1');
      const fallbackWrite = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${fallbackRange}?valueInputOption=RAW`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values })
        }
      );

      if (!fallbackWrite.ok) {
        throw await formatGoogleApiError(writeResponse);
      }
    }
  }

  return spreadsheetUrl;
}

/**
 * Human-readable error mapping for Google API HTTP responses
 */
async function formatGoogleApiError(response: Response): Promise<Error> {
  let message = '';
  try {
    const data = await response.json();
    message = data?.error?.message || '';
  } catch {
    // Response body not JSON
  }

  if (response.status === 401) {
    return new Error('Sessão Google expirada. Por favor, faça login novamente para renovar a autorização do Google Sheets.');
  }
  if (response.status === 403) {
    return new Error('Permissão insuficiente no Google Sheets. Certifique-se de autorizar a permissão de criar e editar planilhas ao entrar com o Google.');
  }
  if (response.status === 429) {
    return new Error('Limite temporário de requisições excedido na API Google. Aguarde alguns segundos e tente novamente.');
  }
  if (response.status >= 500) {
    return new Error(`Serviços do Google temporariamente instáveis (HTTP ${response.status}). Tente novamente em instantes.`);
  }

  return new Error(message || `Erro de comunicação com a API Google Sheets (HTTP ${response.status})`);
}
