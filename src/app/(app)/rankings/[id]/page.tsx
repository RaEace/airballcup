import mascotte from "@/assets/icons/rankings_icon.svg";
import Image from "next/image";
import EloRankingTable from "@/components/rankings/elo-ranking-table.tsx";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import Header from "@/components/header.tsx";
import {getSeasons, getRankings} from "@/services/rankings-queries.ts";
import {Ranking} from "@/payload-types.ts";

export const revalidate = 60;
export type CompleteRanking = Ranking & { matchesPlayed: number; winRate: number };

async function Page(props: { params: Promise<{ id: string }> }) {
    const id = (await props.params).id;

    const [{registrationLink}, availableRankings, rankings] = await Promise.all([
        getTournamentInfo(),
        getSeasons(),
        getRankings(id),
    ]);

    const currentSeason = availableRankings.find((season) => season.id === id);

    if (!currentSeason) {
        return <>
            <Header signupUrl={registrationLink} availableRankings={availableRankings ?? []}/>
            <section className={"flex items-center justify-center w-screen h-screen bg-secondary-500"}>
                <p className={"font-display text-title-m font-bold uppercase"}>
                    Ce classement n'existe pas.
                </p>
            </section>
        </>
    }

    return (
        <>
            <Header
                signupUrl={registrationLink}
                availableRankings={availableRankings || []}
            />
            <section
                className={
                    "relative flex flex-col justify-center items-center w-screen h-screen bg-secondary-500"
                }
            >
                <Image
                    className={
                        "smooth absolute top-[36%] lg:top-[19%] right-0 max-w-[170px] lg:max-w-[762px] -z-4"
                    }
                    src={mascotte}
                    alt={"mascotte rankings"}
                    priority
                />
                <div
                    className={
                        "h-full mt-40 flex items-center justify-start w-full sm:w-full px-5 pb-10"
                    }
                >
                    <h1
                        className={
                            "!z-10 p-4 uppercase smooth font-display lg:text-display-l text-display-s font-extrabold"
                        }
                    >
                        CLASSEMENT <br/> {currentSeason?.name ?? id}
                    </h1>
                </div>
                <div className={"w-full h-1/2"}>
                    <EloRankingTable
                        rankings={transformEloData(rankings)}
                        seasonId={id}
                    />
                </div>
            </section>
        </>
    );
}

function transformEloData(data: Ranking[]): CompleteRanking[] {
    return data
        .map((entry) => ({
            ...entry,
            matchesPlayed: entry.wins + (entry.losses ?? 0),
            winRate:
                entry.wins + (entry.losses ?? 0) > 0
                    ? parseFloat(
                        ((entry.wins / (entry.wins + (entry.losses ?? 9))) * 100).toFixed(2)
                    )
                    : 0,
        }))
        .sort((a, b) =>
            a.rank - b.rank)
}

export default Page;
