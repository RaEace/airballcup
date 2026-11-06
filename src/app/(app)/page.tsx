import "./index.css";
import {PageShell} from "@/contents/PageShell.tsx";
import CallToAction from "@/contents/sections/cta.tsx";
import History from "@/contents/sections/history.tsx";
import Participate from "@/contents/sections/participate.tsx";
import Winners from "@/contents/sections/winners.tsx";
import Cost from "@/contents/sections/cost.tsx";
import Rules from "@/contents/sections/rules.tsx";
import Gallery from "@/contents/sections/gallery.tsx";
import TournamentInfo from "@/contents/sections/tournament-info.tsx";
import Footer from "@/components/footer.tsx";
import loadImages from "@/components/photo-displayer/actions.ts";
import getRules from "@/contents/sections/rules/actions.ts";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import Header from "@/components/header.tsx";
import {Carousel, Gallery as GalleryType} from "@/payload-types.ts";
import {getSeasons} from "@/services/rankings-queries.ts";

export const revalidate = 3600;

export default async function Page() {
    const [tournamentContent, rulesContent, gallery, carousel, availableRankings] = await Promise.all([
        getTournamentInfo(),
        getRules(),
        loadImages("gallery") as Promise<GalleryType>,
        loadImages("carousels") as Promise<Carousel>,
        getSeasons(),
    ]);

    return (
        <>
            <Header
                signupUrl={tournamentContent.registrationLink}
                availableRankings={availableRankings}
            />
            <PageShell>
                <CallToAction tournamentInfo={tournamentContent}/>
                <History/>
                <Participate tournamentInfo={tournamentContent}/>
                <Winners carousel={carousel}/>
                <Cost/>
                <Rules rules={rulesContent}/>
                <Gallery gallery={gallery}/>
                <TournamentInfo tournamentInfo={tournamentContent}/>
                <Footer registrationLink={tournamentContent.registrationLink}/>
            </PageShell>
        </>
    );
}
