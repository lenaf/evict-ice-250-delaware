export const LEASE_EXPIRY = "2027-03-31T00:00:00";

export function getDaysUntilLeaseExpiry(now: number = Date.now()): number {
  const diff = new Date(LEASE_EXPIRY).getTime() - now;
  return Math.max(0, Math.floor(diff / 86_400_000));
}
