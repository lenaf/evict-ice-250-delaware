import { getPayload } from "@/lib/payload";

// The logged-in Payload user for an admin request, or null. Auth is the Payload
// session cookie (`payload-token`) — the same login as /admin. Used both to
// authorize the events admin routes and to attribute the action in the audit
// log. Same-origin fetches from the /admin UI send the cookie automatically.
export async function getAdminUser(req: Request) {
  try {
    const payload = await getPayload();
    const { user } = await payload.auth({ headers: req.headers });
    return user ?? null;
  } catch {
    return null;
  }
}
