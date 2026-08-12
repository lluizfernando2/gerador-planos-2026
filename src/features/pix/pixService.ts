export interface PixPayloadParams {
  key: string;
  name: string;
  city: string;
  amount?: string;
  txtId?: string;
}

export class PixService {
  /**
   * Generates a valid EMV BR Code Pix string
   */
  public generatePayload(params: PixPayloadParams): string {
    const formatField = (id: string, value: string): string => {
      const len = value.length.toString().padStart(2, '0');
      return `${id}${len}${value}`;
    };

    const clean = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    const nameClean = clean(params.name).substring(0, 25);
    const cityClean = clean(params.city).substring(0, 15);
    const txtIdClean = params.txtId ? clean(params.txtId).replace(/[^a-zA-Z0-9]/g, '').substring(0, 25) : '***';

    let merchantAccountInfo = formatField('00', 'br.gov.bcb.pix');
    merchantAccountInfo += formatField('01', params.key);

    let payload = '';
    payload += formatField('00', '01'); // Payload Format Indicator
    payload += formatField('26', merchantAccountInfo); // Merchant Account Information
    payload += formatField('52', '0000'); // Merchant Category Code
    payload += formatField('53', '986'); // Transaction Currency (BRL)

    if (params.amount && parseFloat(params.amount) > 0) {
      payload += formatField('54', parseFloat(params.amount).toFixed(2));
    }

    payload += formatField('58', 'BR'); // Country Code
    payload += formatField('59', nameClean); // Merchant Name
    payload += formatField('60', cityClean); // Merchant City

    let additionalData = formatField('05', txtIdClean);
    payload += formatField('62', additionalData);

    payload += '6304'; // CRC16 Header

    const crc = this.computeCRC16(payload);
    return payload + crc;
  }

  /**
   * Computes CRC16 CCITT (0xFFFF)
   */
  private computeCRC16(str: string): string {
    let crc = 0xFFFF;
    const polynomial = 0x1021;

    for (let i = 0; i < str.length; i++) {
      const b = str.charCodeAt(i);
      for (let j = 0; j < 8; j++) {
        const bit = ((b >> (7 - j)) & 1) === 1;
        const c15 = ((crc >> 15) & 1) === 1;
        crc <<= 1;
        if (c15 !== bit) {
          crc ^= polynomial;
        }
      }
    }

    crc &= 0xFFFF;
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
}

export const pixService = new PixService();
