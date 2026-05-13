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
import config from "@payload-config";
import {getPayload} from "payload";
import {headers} from "next/headers";

export default async function Page() {
    const headersList = await headers();

    const [tournamentContent, rulesContent, gallery, carousel, availableRankings, {user}] = await Promise.all([
        getTournamentInfo(),
        getRules(),
        loadImages("gallery") as Promise<GalleryType>,
        loadImages("carousels") as Promise<Carousel>,
        getSeasons(),
        getPayload({config}).then(p => p.auth({headers: headersList})),
    ]);

    return (
        <>
            <Header
                signupUrl={tournamentContent.registrationLink}
                availableRankings={availableRankings}
                isLoggedIn={!!user}
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
