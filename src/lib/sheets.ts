import { CurriculumItem } from '../types';

export interface CreateSheetResponse {
  spreadsheetId: string;
  spreadsheetUrl: string;
}

/**
 * Creates a formatted Google Sheet in the user's Google Drive containing curriculum data
 */
export async function exportToGoogleSheets(
  accessToken: string,
  items: CurriculumItem[],
  title: string = 'Currículo Priorizado - Matemática'
): Promise<CreateSheetResponse> {
  // 1. Create a brand new Google Spreadsheet
  const createResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: title,
      },
    }),
  });

  if (!createResponse.ok) {
    const errText = await createResponse.text();
    throw new Error(`Erro ao criar planilha: ${errText}`);
  }

  const spreadsheet: any = await createResponse.json();
  const spreadsheetId = spreadsheet.spreadsheetId;
  const spreadsheetUrl = spreadsheet.spreadsheetUrl;

  const defaultSheet = spreadsheet.sheets?.[0]?.properties;
  const sheetId = defaultSheet?.sheetId ?? 0;
  const sheetName = defaultSheet?.title || 'Sheet1';

  // 2. Prepare the grid data
  const headers = [
    'Ano',
    'Bimestre',
    'Aula',
    'Título da Aula',
    'Conteúdo',
    'Objetivos de Aprendizagem',
    'Habilidade',
    'Aprendizagem Essencial',
  ];

  const rows = items.map((item) => [
    item.ano,
    item.bimestre,
    item.aula,
    item.titulo,
    item.conteudo,
    item.objetivos,
    item.habilidade,
    item.aprendizagem,
  ]);

  const allValues = [headers, ...rows];

  // 3. Write data to the first sheet using its actual retrieved name
  const range = `'${sheetName.replace(/'/g, "''")}'!A1`;
  const writeResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: allValues,
      }),
    }
  );

  if (!writeResponse.ok) {
    const errText = await writeResponse.text();
    throw new Error(`Erro ao escrever dados na planilha: ${errText}`);
  }

  // 4. Format spreadsheet: Elegant Emerald/Sage Dashboard Theme
  const totalRows = allValues.length;
  
  // Specific column widths to prevent giant stretched columns
  const columnWidths = [90, 100, 60, 220, 280, 300, 110, 300];
  const dimensionRequests = columnWidths.map((width, index) => ({
    updateDimensionProperties: {
      range: {
        sheetId: sheetId,
        dimension: 'COLUMNS',
        startIndex: index,
        endIndex: index + 1,
      },
      properties: {
        pixelSize: width,
      },
      fields: 'pixelSize',
    },
  }));

  const batchResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          // 4.1 Base formatting for all data rows (Font, Borders, Wrap Strategy)
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 1,
                endRowIndex: totalRows,
                startColumnIndex: 0,
                endColumnIndex: 8,
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    fontSize: 10,
                    fontFamily: 'Arial',
                    foregroundColor: { red: 0.15, green: 0.15, blue: 0.15 },
                  },
                  wrapStrategy: 'WRAP',
                  verticalAlignment: 'MIDDLE',
                  borders: {
                    top: { style: 'SOLID', color: { red: 0.88, green: 0.88, blue: 0.88 } },
                    bottom: { style: 'SOLID', color: { red: 0.88, green: 0.88, blue: 0.88 } },
                    left: { style: 'SOLID', color: { red: 0.88, green: 0.88, blue: 0.88 } },
                    right: { style: 'SOLID', color: { red: 0.88, green: 0.88, blue: 0.88 } },
                  },
                },
              },
              fields: 'userEnteredFormat(textFormat,wrapStrategy,verticalAlignment,borders)',
            },
          },
          // 4.2 Bold headers, deep emerald green background, centered white text
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 8,
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true,
                    fontSize: 11,
                    fontFamily: 'Arial',
                    foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                  },
                  backgroundColor: {
                    red: 0.016,
                    green: 0.47,
                    blue: 0.34,
                  },
                  alignment: {
                    horizontal: 'CENTER',
                    vertical: 'MIDDLE',
                  },
                  borders: {
                    top: { style: 'SOLID', color: { red: 0.02, green: 0.37, blue: 0.27 } },
                    bottom: { style: 'SOLID', color: { red: 0.02, green: 0.37, blue: 0.27 } },
                    left: { style: 'SOLID', color: { red: 0.02, green: 0.37, blue: 0.27 } },
                    right: { style: 'SOLID', color: { red: 0.02, green: 0.37, blue: 0.27 } },
                  },
                },
              },
              fields: 'userEnteredFormat(textFormat,backgroundColor,alignment,borders)',
            },
          },
          // 4.3 Center alignment for Columns A, B, C (Ano, Bimestre, Aula)
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 1,
                endRowIndex: totalRows,
                startColumnIndex: 0,
                endColumnIndex: 3,
              },
              cell: {
                userEnteredFormat: {
                  alignment: {
                    horizontal: 'CENTER',
                  },
                },
              },
              fields: 'userEnteredFormat(alignment)',
            },
          },
          // 4.4 Center alignment for Column G (Habilidade)
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 1,
                endRowIndex: totalRows,
                startColumnIndex: 6,
                endColumnIndex: 7,
              },
              cell: {
                userEnteredFormat: {
                  alignment: {
                    horizontal: 'CENTER',
                  },
                },
              },
              fields: 'userEnteredFormat(alignment)',
            },
          },
          // 4.5 Alternating row colors (subtle emerald-tinted light gray-green on odd rows)
          {
            addConditionalFormatRule: {
              rule: {
                ranges: [
                  {
                    sheetId: sheetId,
                    startRowIndex: 1,
                    endRowIndex: totalRows,
                    startColumnIndex: 0,
                    endColumnIndex: 8,
                  },
                ],
                booleanRule: {
                  condition: {
                    type: 'CUSTOM_FORMULA',
                    values: [
                      {
                        userEnteredValue: '=ISODD(ROW())',
                      },
                    ],
                  },
                  format: {
                    backgroundColor: {
                      red: 0.96,
                      green: 0.99,
                      blue: 0.97,
                    },
                  },
                },
              },
              index: 0,
            },
          },
          // 4.6 Set basic filter for sorting/filtering
          {
            setBasicFilter: {
              filter: {
                range: {
                  sheetId: sheetId,
                  startRowIndex: 0,
                  endRowIndex: totalRows,
                  startColumnIndex: 0,
                  endColumnIndex: 8,
                },
              },
            },
          },
          // 4.7 Set custom column widths
          ...dimensionRequests,
        ],
      }),
    }
  );

  if (!batchResponse.ok) {
    // If format fails, do not throw since data is already created successfully
    console.warn('Falha ao aplicar formatação opcional na planilha.');
  }

  return { spreadsheetId, spreadsheetUrl };
}
