import "./index.css";
import {ClientOnly, ClientOnlyProps} from "./client.tsx";
import loadImages from "@/components/photo-displayer/actions.ts";
import getRules from "@/contents/sections/rules/actions.ts";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import getContentForSections from "@/contents/sections/cms/actions.ts";

export const dynamic = "force-dynamic";

export default async function Page() {
    const sectionsText = await getContentForSections();
    const tournamentContent = await getTournamentInfo();
    const rulesContent = await getRules();
    const loadImageAction = loadImages;

    console.log(sectionsText);

    return <ClientOnly contents={{
        sectionsText,
        tournamentInfo: tournamentContent.tournamentInfo,
        rules: rulesContent.rules,
        loadImageAction,
    } as ClientOnlyProps["contents"]}/>;
}