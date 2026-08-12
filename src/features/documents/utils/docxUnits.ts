/**
 * Centralized Unit Conversion Utilities for WordprocessingML (OOXML)
 * 1 inch = 1440 twips (DXA)
 * 1 cm = 566.929 twips
 * 1 mm = 56.6929 twips
 * 1 pt = 20 twips
 * 1 pt = 2 half-points (used for docx font sizes)
 */

export function cmToTwips(cm: number): number {
  return Math.round(cm * 566.929);
}

export function mmToTwips(mm: number): number {
  return Math.round(mm * 56.6929);
}

export function ptToTwips(pt: number): number {
  return Math.round(pt * 20);
}

export function ptToHalfPt(pt: number): number {
  return Math.round(pt * 2);
}

export function pxToTwips(px: number): number {
  return Math.round((px / 96) * 1440);
}

export function calculateUsableWidthTwips(
  paperWidthMm: number = 210, // A4 width in mm
  leftMarginMm: number = 15,
  rightMarginMm: number = 15
): number {
  const usableMm = paperWidthMm - leftMarginMm - rightMarginMm;
  return mmToTwips(usableMm);
}
