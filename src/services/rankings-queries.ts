import { unstable_cache, revalidateTag } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Ranking, Season } from "@/payload-types";

/**
 * Cached: list of all seasons, sorted newest-first.
 * Arguments are included in the cache key automatically by Next.js.
 * Invalidate with revalidateTag('seasons') after writes.
 */
export const getSeasons = unstable_cache(
    async (): Promise<Season[]> => {
        const payload = await getPayload({ config });
        const result = await payload.find({
            collection: "seasons",
            sort: ["-year"],
            limit: 100,
        });
        return result.docs;
    },
    ["seasons"],
    { tags: ["seasons"], revalidate: 60 }
);

/**
 * Cached: rankings for a given season.
 * seasonId is passed as an argument so Next.js keys each season separately.
 * Invalidate with revalidateTag('rankings') after writes.
 */
export const getRankings = unstable_cache(
    async (seasonId: string): Promise<Ranking[]> => {
        const payload = await getPayload({ config });
        const result = await payload.find({
            collection: "rankings",
            where: { season: { equals: seasonId } },
            sort: ["-rank"],
            limit: 1000,
        });
        return result.docs;
    },
    ["rankings"],
    { tags: ["rankings"], revalidate: 60 }
);

/** Call after any write that mutates seasons or rankings data. */
export function invalidateRankingsCache(seasonId?: string) {
    revalidateTag("seasons");
    revalidateTag("rankings");
    if (seasonId) revalidateTag(`rankings-${seasonId}`);
}
