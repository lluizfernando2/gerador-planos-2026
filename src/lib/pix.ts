/**
 * Utility to generate standard EMV Co Pix BR Code payload and CRC16 checksum
 * compatible with all Brazilian bank apps (Nubank, Itaú, Bradesco, BB, Inter, Caixa, etc.)
 */

function crc16CCITT(str: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= (str.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

function formatTag(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

export interface PixPayloadParams {
  key: string;
  name?: string;
  city?: string;
  amount?: number;
  txId?: string;
  description?: string;
}

export function generatePixPayload({
  key,
  name = 'APOIO PROFESSOR',
  city = 'SAO PAULO',
  amount,
  txId = '***',
  description = 'Apoio Curriculo Priorizado'
}: PixPayloadParams): string {
  // Clean key and values
  const cleanKey = key.trim();
  // Sanitize name (remove accents, max 25 chars, uppercase)
  const cleanName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().slice(0, 25);
  // Sanitize city (remove accents, max 15 chars, uppercase)
  const cleanCity = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().slice(0, 15);
  const cleanTxId = (txId || '***').slice(0, 25);

  // Merchant Account Info (Tag 26)
  const gui = formatTag('00', 'br.gov.bcb.pix');
  const keyTag = formatTag('01', cleanKey);
  let merchantAccountInfoValue = `${gui}${keyTag}`;
  if (description) {
    const descTag = formatTag('02', description.slice(0, 40));
    merchantAccountInfoValue += descTag;
  }
  const tag26 = formatTag('26', merchantAccountInfoValue);

  // Merchant Category Code (Tag 52)
  const tag52 = formatTag('52', '0000');

  // Currency BRL (Tag 53: 986)
  const tag53 = formatTag('53', '986');

  // Amount optional (Tag 54)
  const tag54 = amount && amount > 0 ? formatTag('54', amount.toFixed(2)) : '';

  // Country Code BR (Tag 58)
  const tag58 = formatTag('58', 'BR');

  // Merchant Name (Tag 59)
  const tag59 = formatTag('59', cleanName);

  // Merchant City (Tag 60)
  const tag60 = formatTag('60', cleanCity);

  // Additional Data (Tag 62) -> TxID (subtag 05)
  const subtag05 = formatTag('05', cleanTxId);
  const tag62 = formatTag('62', subtag05);

  // Assemble before CRC
  const rawPayload = `000201${tag26}${tag52}${tag53}${tag54}${tag58}${tag59}${tag60}${tag62}6304`;

  // CRC16 Checksum (Tag 63)
  const crc = crc16CCITT(rawPayload);

  return `${rawPayload}${crc}`;
}
