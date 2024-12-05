"use server";

import {TournamentInfoContent} from "@/app/client.tsx";
import GoogleService from "@/services/google.service.ts";
import {TOURNAMENT_INFO, translateTomlToJson} from "@/lib/utils.ts";

async function getTournamentInfo(): Promise<{
    tournamentInfo: TournamentInfoContent;
}> {
    const file = await GoogleService.instance.readGoogleDoc(TOURNAMENT_INFO);

    if (!file) {
        throw new Error("No tournament info found");
    }

    return translateTomlToJson<{ tournamentInfo: TournamentInfoContent }>(file);
}

export default getTournamentInfo;