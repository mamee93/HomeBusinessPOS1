export function isToday(
  date: Date
): boolean {
  return (
    date.toDateString() ===
    new Date().toDateString()
  );
}

export function isCurrentMonth(
  date: Date
): boolean {
  const now = new Date();

  return (
    date.getMonth() ===
      now.getMonth() &&
    date.getFullYear() ===
      now.getFullYear()
  );
}

export function formatDate(
  value: string | Date
): string {
  return new Date(value).toLocaleDateString(
    "ar"
  );
}

export function formatDateTime(
  value: string | Date
): string {
  return new Date(value).toLocaleString(
    "ar"
  );
}