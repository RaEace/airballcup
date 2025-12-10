"use server"

import {getPayload} from "payload";
import config from "@payload-config";
import RankingsService from "@/services/rankings.service.ts";

export default async function downloadSampleCsv(seasonId: string) {
    const headers = ["Rank", "Team", "ELO"];
    const payload = await getPayload({config});
    const rankingService = new RankingsService(payload);

    const existingRankings = await rankingService.getRankings(seasonId);
    const csvRows = [headers.join(",")];

    if (existingRankings) {
        for (const ranking of existingRankings) {
            const row = [
                ranking.rank,
                `"${ranking.playerName.replace(/"/g, '""')}"`,
                ranking.eloRating
            ];
            csvRows.push(row.join(","));
        }
    }

    return csvRows.join("\n");
}