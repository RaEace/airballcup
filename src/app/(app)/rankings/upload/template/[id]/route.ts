import {getPayload} from "payload";
import config from "@payload-config";
import {headers} from "next/headers";
import {NextRequest} from "next/server";
import RankingsService from "@/services/rankings.service.ts";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const headerList = await headers();
    const payload = await getPayload({ config })
    const {user} = await payload.auth({headers: headerList});

    if (!user) {
        return new Response("Unauthorized", {status: 401});
    }

    const rankingsService = new RankingsService(payload);
    const id = (await params).id;

    const rankings = await rankingsService.getRankings(id);

    if (!rankings) {
        return new Response("Season not found", {status: 404});
    }

    const csvHeaders = ["Rank", "Team", "ELO"];
    const csvRows = [csvHeaders.join(",")];

    for (const ranking of rankings) {
        const row = [
            ranking.rank,
            `"${ranking.playerName.replace(/"/g, '""')}"`,
            ranking.eloRating
        ];
        csvRows.push(row.join(","));
    }

    const csvContent = csvRows.join("\n");

    return new Response(csvContent, {
        status: 200,
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="rankings_season_${id}.csv"`,
        },
    });
}