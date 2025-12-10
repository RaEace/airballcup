"use server";

import RankingsService from "@/services/rankings.service.ts";
import Papaparse from "papaparse";
import {Ranking} from "@/payload-types.ts";
import {getPayload} from "payload";
import config from "@payload-config";
import {z} from "zod";

const csvSchema = z.object({
    Rank: z.number(),
    Team: z.string(),
    ELO: z.number(),
});

type ParsedCsv = z.infer<typeof csvSchema>;

export default async function uploadAction(_initialState: { success: boolean; message: string }, formData: FormData) {
    const rankingFile = formData.get("rankingFile") as File;
    const seasonId = formData.get("seasonId") as string;

    if (!rankingFile || !seasonId) {
        return {success: false, message: "Missing ranking file or season ID."};
    }

    const payload = await getPayload({config});
    const rankingService = new RankingsService(payload);
    const currentSeason = await rankingService.getSeason(seasonId);

    if (!currentSeason) {
        return {success: false, message: "Invalid season ID."};
    }

    try {
        const parsedRankings = await csvToRanking(rankingFile);

        if (!payload) {
            return {success: false, message: "User not authenticated."};
        }

        for (const ranking of parsedRankings) {
            const existing = await (payload?.find({
                collection: 'rankings',
                where: {
                    season: {
                        equals: seasonId,
                    },
                    playerName: {
                        equals: ranking.playerName,
                    },
                },
            }));

            if (existing && existing.totalDocs > 0) {
                const existingRanking = existing.docs[0];
                if (isSame(existingRanking, ranking)) {
                    continue; // No changes needed
                }
                try {
                    await payload.update({
                        collection: 'rankings',
                        id: existingRanking.id,
                        data: {
                            rank: ranking.rank,
                            playerName: ranking.playerName,
                            eloRating: ranking.eloRating,
                        },
                    });
                } catch (error) {
                    return {success: false, message: `Failed to update ranking for ${ranking.playerName}: ${error}`};
                }
            } else {
                try {
                    await payload.create({
                        collection: 'rankings',
                        data: {
                            season: seasonId,
                            rank: ranking.rank,
                            playerName: ranking.playerName,
                            eloRating: ranking.eloRating,
                            wins: 0,
                            losses: 0,
                            matches: 0,
                        },
                    });
                } catch (error) {
                    return {success: false, message: `Failed to create ranking for ${ranking.playerName}: ${error}`};
                }
            }
        }

        return {success: true, message: 'Rankings uploaded successfully. '};
    } catch (error) {
        return {success: false, message: `Error processing file: ${error}`};
    }
}

type PartialRanking = {
    rank: number,
    playerName: string,
    eloRating: number,
}

async function csvToRanking(file: File): Promise<PartialRanking[]> {
    const text = await file.text();

    return new Promise((resolve, reject) => {
        Papaparse.parse<ParsedCsv>(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    reject(results.errors.map((e) => e.message).join(", "));
                    return;
                }

                const arraySchema = z.array(csvSchema);
                const parsedResults = arraySchema.safeParse(results.data);

                if (!parsedResults.success) {
                    reject(`
                        Couldn't parse CSV data because it doesn't follow the required format.
                        Please ensure the CSV has the following columns with correct data types:
                        
                        Rank (number), Team (string), ELO (number)
                    `)
                    return;
                }

                try {
                    const rankings: PartialRanking[] = parsedResults.data
                        .filter((row) => {
                            return row.Rank !== null &&
                                row.Team !== null &&
                                row.ELO !== null;
                        })
                        .map((row) => ({
                            rank: row.Rank!,
                            playerName: String(row!.Team),
                            eloRating: row.ELO!,
                        }))
                    resolve(rankings);
                } catch (error) {
                    reject(error);
                }
            },
            error: (error: unknown) => {
                reject(error);
            }
        });
    });
}

function isSame(a: Ranking, b: PartialRanking): boolean {
    return a.rank === b.rank &&
        a.playerName === b.playerName &&
        a.eloRating === b.eloRating;
}