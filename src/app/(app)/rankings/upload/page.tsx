"use server";

import Header from "@/components/header";
import RankingsService from "@/services/rankings.service";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions";
import RankingUploadForm from "@/contents/upload/RankingUploadForm.tsx";
import {headers} from "next/headers";
import {redirect, RedirectType} from "next/navigation";
import {getPayload} from "payload";
import config from "@payload-config";

export default async function UploadPage() {
    const headersList = await headers();
    const {registrationLink} = await getTournamentInfo();
    const payload = await getPayload({ config });
    const rankingsService = new RankingsService(payload);


    if (!rankingsService.payload) {
        return <>
            No Payload instance found. Please ensure the RankingsService is properly initialized.
        </>
    }

    const {user} = await rankingsService.payload.auth({headers: headersList});

    const seasons = await rankingsService.getSeasons();

    if (!seasons || seasons.length === 0) {
        return (
            <div>
                No seasons available. Please create a season before uploading rankings.
            </div>
        );
    }

    if (!user) {
        redirect(`/admin/login?redirect=/rankings/upload`, RedirectType.replace);
    }

    return (
        <div className={'w-screen h-screen'}>
            <Header
                signupUrl={registrationLink}
                availableRankings={seasons}
                isLoggedIn={!!user}
            />
            <main className={"w-full h-full bg-secondary-500"}>
                <RankingUploadForm seasons={seasons}/>
            </main>
        </div>
    );
}
