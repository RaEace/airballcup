import "./index.css";
import {ClientOnly, ClientOnlyProps} from "./client.tsx";
import loadImages from "@/components/photo-displayer/actions.ts";
import getRules from "@/contents/sections/rules/actions.ts";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import getContentForSections from "@/contents/sections/cms/actions.ts";
import Header from "@/components/header.tsx";
import {Carousel, Gallery} from "@/payload-types.ts";
import RankingsService from "@/services/rankings.service.ts";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const sectionsText = await getContentForSections();
    console.log(sectionsText);
    const tournamentContent = await getTournamentInfo();
    const rulesContent = await getRules();
    const gallery: Gallery = await loadImages("gallery");
    const carousel: Carousel = await loadImages("carousels");
    
    // Ensure rankings are always available with fallback
    let availableRankings;
    try {
        availableRankings = await RankingsService.instance.getSeasons();
    } catch (error) {
        console.error('Failed to load rankings for header:', error);
        availableRankings = []; // Fallback to empty array
    }

    return <>
        <Header 
            signupUrl={tournamentContent.registrationLink} 
            availableRankings={availableRankings || []} 
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
