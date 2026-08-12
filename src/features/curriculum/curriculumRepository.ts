import { CurriculumItem } from '../../types';
import { initialCurriculumData } from '../../data/curriculumData';
import {
  PROJETO_DE_VIDA_DATA,
  TECNOLOGIA_INOVACAO_DATA,
  ORIENTACAO_ESTUDO_MATEMATICA_DATA,
  ORIENTACAO_ESTUDO_PORTUGUES_DATA,
  EDUCACAO_FINANCEIRA_DATA,
  REDACAO_LEITURA_DATA
} from '../../data/diversificadaData';
import { itinerariosEMData } from '../../data/itinerariosEMData';
import { MATRIZ_SOCIOEMOCIONAL } from '../../data/socioemocionalDatabase';
import { OFFICIAL_RECOVERY_DATA_2026 } from '../../data/recoveryData2026';
import { ALL_TECNICO_DATA, mapTecnicoToCurriculum } from '../../data/tecnicoData';

export interface ICurriculumRepository {
  getFgbItems(): Promise<CurriculumItem[]>;
  getDiversificadaData(): Promise<any>;
  getItinerarioItems(): Promise<CurriculumItem[]>;
  getTecnicoItems(): Promise<CurriculumItem[]>;
  getAllItems(): Promise<CurriculumItem[]>;
  getRecoveryData(): Promise<any>;
  getSocioemocionalMatriz(): Promise<any>;
}

export class StaticCurriculumRepository implements ICurriculumRepository {
  private cachedAll: CurriculumItem[] | null = null;

  async getFgbItems(): Promise<CurriculumItem[]> {
    return initialCurriculumData;
  }

  async getDiversificadaData(): Promise<any> {
    return {
      PROJETO_DE_VIDA_DATA,
      TECNOLOGIA_INOVACAO_DATA,
      ORIENTACAO_ESTUDO_MATEMATICA_DATA,
      ORIENTACAO_ESTUDO_PORTUGUES_DATA,
      EDUCACAO_FINANCEIRA_DATA,
      REDACAO_LEITURA_DATA
    };
  }

  async getItinerarioItems(): Promise<CurriculumItem[]> {
    return itinerariosEMData;
  }

  async getTecnicoItems(): Promise<CurriculumItem[]> {
    return ALL_TECNICO_DATA.map(mapTecnicoToCurriculum);
  }

  async getAllItems(): Promise<CurriculumItem[]> {
    if (this.cachedAll) return this.cachedAll;

    const [fgb, itin, tec] = await Promise.all([
      this.getFgbItems(),
      this.getItinerarioItems(),
      this.getTecnicoItems(),
    ]);

    this.cachedAll = [...fgb, ...itin, ...tec];
    return this.cachedAll;
  }

  async getRecoveryData(): Promise<any> {
    return OFFICIAL_RECOVERY_DATA_2026;
  }

  async getSocioemocionalMatriz(): Promise<any> {
    return MATRIZ_SOCIOEMOCIONAL;
  }
}

export const curriculumRepository = new StaticCurriculumRepository();
