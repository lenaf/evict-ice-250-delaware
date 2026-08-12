import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getPayload } from "@/lib/payload";
import { Admin } from "./Admin";

export const metadata: Metadata = {
  title: "Admin — Events",
  robots: { index: false, follow: false },
};

// Same login as the CMS (/admin) — gate on the Payload session, bounce to the
// CMS login if signed out (which returns here via ?redirect).
export default async function AdminPage() {
  const payload = await getPayload();
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) redirect("/admin/login?redirect=/admin-events");
  return <Admin />;
}
