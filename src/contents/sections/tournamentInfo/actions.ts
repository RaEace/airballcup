"use server";

import {getPayload} from "payload";
import _config from '@payload-config';
import {Tournament} from "@/payload-types.ts";

async function getTournamentInfo(): Promise<Tournament> {
    const payload = await getPayload({ config: _config });
    const lastTournament = await payload.find({
        collection: 'tournament',
        limit: 1,
        sort: 'date',
    });
    return lastTournament.docs[0]
}

export default getTournamentInfo;