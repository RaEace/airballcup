import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";

// Partagé entre server actions : jette si l'utilisateur n'est pas connecté.
export async function requireAdmin() {
    const payload = await getPayload({ config });
    const headersList = await headers();
    const { user } = await payload.auth({ headers: headersList });
    if (!user) {
        throw new Error("Unauthorized: admin access required.");
    }
    return payload;
}
