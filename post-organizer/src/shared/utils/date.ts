export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const units: [number, string][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [30, 'day'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];
  let value = seconds;
  for (const [amount, name] of units) {
    if (value < amount) return `${Math.max(1, Math.floor(value))} ${name}${Math.floor(value) === 1 ? '' : 's'} ago`;
    value /= amount;
  }
  return 'just now';
}
