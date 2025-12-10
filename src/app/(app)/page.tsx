import "./index.css";
import {ClientOnly, ClientOnlyProps} from "./client.tsx";
import loadImages from "@/components/photo-displayer/actions.ts";
import getRules from "@/contents/sections/rules/actions.ts";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import getContentForSections from "@/contents/sections/cms/actions.ts";
import Header from "@/components/header.tsx";
import {Carousel, Gallery} from "@/payload-types.ts";
import RankingsService from "@/services/rankings.service.ts";
import config from "@payload-config";
import {getPayload} from "payload";
import {headers} from "next/headers";

export const dynamic = 'auto';

export default async function Page() {
    const headersList = await headers();

    const sectionsText = await getContentForSections();
    const tournamentContent = await getTournamentInfo();
    const rulesContent = await getRules();
    const gallery: Gallery = await loadImages("gallery");
    const carousel: Carousel = await loadImages("carousels");
    
    const payload = await getPayload({ config });
    const rankingService = new RankingsService(payload);
    const availableRankings = await rankingService.getSeasons();

    const {user} = await payload.auth({headers: headersList});

    return <>
        <Header 
            signupUrl={tournamentContent.registrationLink} 
            availableRankings={availableRankings || []}
            isLoggedIn={!!user}
        />
        <ClientOnly contents={{
            sectionsText,
            tournamentInfo: tournamentContent,
            rules: rulesContent,
            carousel,
            gallery
        } as ClientOnlyProps["contents"]}/>
    </>
}
