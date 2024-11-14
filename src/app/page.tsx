import "./index.css";
import {ClientOnly, ClientOnlyProps} from "./client.tsx";
import loadImages from "@/components/photo-displayer/actions.ts";

const placeholderData: ClientOnlyProps["contents"] = {
    cta: {
        badgeText: "Inscriptions ouvertes",
        headerText: "PARTICIPEZ À L'AIRBALL CUP",
    },
    tournamentInfo: {
        badgeText: "Prochain tournoi",
        date: "2022-01-01",
        startingHour: "14h00"
    },
    loadImageAction: loadImages,
}



export default async function Page() {
    // const files = await googleService.readGoogleDoc("1ytVX7bgO0Na3dpYj7MeE5Uvxmj5CotkkVIJ4Iq1MWtU");
    // const parsedTomlObject = parse(files as string) as unknown as ClientOnlyProps["contents"];
    //
    // console.log(parsedTomlObject);
    return <ClientOnly contents={{...placeholderData}}/>;
}