import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import _config from "@payload-config";
import { Tournament } from "@/payload-types.ts";

const getTournamentInfo = unstable_cache(
    async (): Promise<Tournament> => {
        const payload = await getPayload({ config: _config });
        const lastTournament = await payload.find({
            collection: "tournament",
            limit: 1,
            sort: "date",
        });
        return lastTournament.docs[0];
    },
    ["tournament-info"],
    { tags: ["tournament-info"], revalidate: 3600 } // 1 hour — changes rarely
);

export default getTournamentInfo;
