export function formatCurrency(
  value: number
): string {
  return `${value.toFixed(3)} ر.ع`;
}

export function parseCurrency(
  value: string
): number {
  return Number(value) || 0;
}