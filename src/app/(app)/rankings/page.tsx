import {redirect} from "next/navigation";
import RankingsService from "@/services/rankings.service.ts";

export default async function Page() {
    const seasons = await RankingsService.instance.getSeasons();
    const season = seasons?.[0];

    if (!season) {
        redirect('/');
    }
    redirect(`/rankings/${season.id}`);
}