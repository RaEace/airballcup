"use server";

import { requireAdmin } from "@/lib/require-admin.ts";
import { invalidateRankingsCache } from "@/services/rankings-queries.ts";

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
