// Utilidades de fecha compartidas por varios componentes.

export function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function monthsBetween(start, now) {
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  return Math.max(months, 0);
}

export function progressPercent(startDate, endDate, now) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const current = now instanceof Date ? now.getTime() : now;
  if (end <= start) return 100;
  const pct = ((current - start) / (end - start)) * 100;
  return Math.min(100, Math.max(0, pct));
}

export function pad2(n) {
  return String(n).padStart(2, "0");
}
