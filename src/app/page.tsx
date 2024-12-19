import "./index.css";
import {ClientOnly, ClientOnlyProps} from "./client.tsx";
import loadImages from "@/components/photo-displayer/actions.ts";
import getRules from "@/contents/sections/rules/actions.ts";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import getContentForSections from "@/contents/sections/cms/actions.ts";
import Header from "@/components/header.tsx";

export default async function Page() {
    const sectionsText = await getContentForSections();
    const tournamentContent = await getTournamentInfo();
    const rulesContent = await getRules();
    const loadImageAction = loadImages;

    return <>
        <Header signupUrl={tournamentContent.tournamentInfo.registrationLink} />
        <ClientOnly contents={{
            sectionsText,
            tournamentInfo: tournamentContent.tournamentInfo,
            rules: rulesContent.rules,
            loadImageAction,
        } as ClientOnlyProps["contents"]}/>
    </>
}