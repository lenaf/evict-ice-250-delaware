import { getDaysUntilLeaseExpiry } from "@/lib/lease";

export function InlineDaysLeft({ className }: { className?: string }) {
  return <span className={className}>{getDaysUntilLeaseExpiry()} days</span>;
}
