"use server";

import RankingsService from "@/services/rankings.service.ts";
import Papaparse from "papaparse";
import {Ranking} from "@/payload-types.ts";
import {getPayload} from "payload";
import config from "@payload-config";

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
                        wins: ranking.wins,
                        losses: ranking.losses,
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
                        wins: ranking.wins,
                        losses: ranking.losses,
                    },
                });
            } catch (error) {
                return {success: false, message: `Failed to create ranking for ${ranking.playerName}: ${error}`};
            }
        }
    }

    return {success: true, message: 'Rankings uploaded successfully. '};
}

type PartialRanking = {
    rank: number,
    playerName: string,
    eloRating: number,
    wins: number,
    losses: number,
}

async function csvToRanking(file: File): Promise<PartialRanking[]> {
    const text = await file.text();

    return new Promise((resolve, reject) => {
        Papaparse.parse<{
            Rank: number | null,
            'Player Name': string | null,
            'ELO Rating': number | null,
            Wins: number | null,
            Losses: number | null,
            'Games Played': number | null,
            'Win Rate': string | null,
        }>(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
                try {
                    const rankings: PartialRanking[] = results.data
                        .filter((row) => {
                            return row.Rank !== null &&
                                row['Player Name'] !== null &&
                                row['ELO Rating'] !== null;
                        })
                        .map((row) => ({
                            rank: row.Rank!,
                            playerName: String(row['Player Name']!),
                            eloRating: row['ELO Rating']!,
                            wins: row.Wins ?? 0,
                            losses: row.Losses ?? 0,
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
        a.eloRating === b.eloRating &&
        a.wins === b.wins &&
        a.losses === b.losses;
}