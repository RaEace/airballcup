import "./index.css";
import {ClientOnly, ClientOnlyProps} from "./client.tsx";
import loadImages from "@/components/photo-displayer/actions.ts";
import getRules from "@/contents/sections/rules/actions.ts";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import getContentForSections from "@/contents/sections/cms/actions.ts";
import Header from "@/components/header.tsx";
import {Carousel, Gallery} from "@/payload-types.ts";
import config from "@payload-config";
import {getPayload} from "payload";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const payload = await getPayload({config});
    const sectionsText = await getContentForSections();
    const tournamentContent = await getTournamentInfo();
    const rulesContent = await getRules();
    const gallery: Gallery = await loadImages("gallery");
    const carousel: Carousel = await loadImages("carousels");
    const availableRankings = await payload.find({ collection: 'seasons', sort: ['-year'] , limit: 100}).then((res) => res.docs);

    return <>
        <Header signupUrl={tournamentContent.registrationLink} availableRankings={availableRankings} />
        <ClientOnly contents={{
            sectionsText,
            tournamentInfo: tournamentContent,
            rules: rulesContent,
            carousel,
            gallery
        } as ClientOnlyProps["contents"]}/>
    </>
}