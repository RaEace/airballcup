import {redirect} from "next/navigation";
import RankingsService from "@/services/rankings.service.ts";
import {getPayload} from "payload";
import config from "@payload-config";

export default async function Page() {
    const payload = await getPayload({ config });
    const rankingService = new RankingsService(payload);
    const seasons = await rankingService.getSeasons();
    const season = seasons?.[0];

    if (!season) {
        redirect('/');
    }
    redirect(`/rankings/${season.id}`);
}