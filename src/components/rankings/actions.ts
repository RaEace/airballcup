"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";
import { invalidateRankingsCache } from "@/services/rankings-queries.ts";

async function requireAdmin() {
    const payload = await getPayload({ config });
    const headersList = await headers();
    const { user } = await payload.auth({ headers: headersList });
    if (!user) {
        throw new Error("Unauthorized: admin access required.");
    }
    return payload;
}

export async function deleteRanking(id: string, seasonId: string): Promise<{ success: boolean; message: string }> {
    try {
        const payload = await requireAdmin();
        await payload.delete({ collection: "rankings", id });
        invalidateRankingsCache(seasonId);
        return { success: true, message: "Ranking deleted." };
    } catch (error) {
        return { success: false, message: String(error) };
    }
}

export async function updateRanking(
    id: string,
    seasonId: string,
    data: { rank: number; playerName: string; eloRating: number }
): Promise<{ success: boolean; message: string }> {
    try {
        const payload = await requireAdmin();
        await payload.update({
            collection: "rankings",
            id,
            data,
        });
        invalidateRankingsCache(seasonId);
        return { success: true, message: "Ranking updated." };
    } catch (error) {
        return { success: false, message: String(error) };
    }
}
