import {redirect} from "next/navigation";
import {getSeasons} from "@/services/rankings-queries.ts";

export default async function Page() {
    const seasons = await getSeasons();
    const season = seasons[0];

    if (!season) redirect('/');
    redirect(`/rankings/${season.id}`);
}