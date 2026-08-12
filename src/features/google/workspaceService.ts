import { exportToGoogleSheets, CreateSheetResponse } from '../../lib/sheets';
import { authService } from '../auth/authService';

export interface GoogleExportOptions {
  filteredItems: any[];
  subject: string;
}

export class GoogleWorkspaceService {
  /**
   * Exports curriculum items to Google Sheets
   */
  public async exportToSheets(options: GoogleExportOptions): Promise<CreateSheetResponse> {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error('Não foi possível obter a credencial de acesso do Google. Por favor, faça login com a conta Google novamente.');
    }

    return await exportToGoogleSheets(
      token,
      options.filteredItems,
      `Currículo Priorizado - ${options.subject}`
    );
  }
}

export const googleWorkspaceService = new GoogleWorkspaceService();
