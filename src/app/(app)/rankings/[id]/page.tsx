import {columns} from "@/components/rankings/columns.tsx";
import mascotte from "@/assets/icons/rankings_icon.svg";
import EloRankingTable from "@/components/rankings/elo-ranking-table.tsx";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import Header from "@/components/header.tsx";
import RankingsService from "@/services/rankings.service.ts";
import {Ranking} from "@/payload-types.ts";

export const dynamic = "force-dynamic";
export type CompleteRanking = Ranking & { matchesPlayed: number; winRate: number };

async function Page(props: { params: Promise<{ id: string }> }) {
  const id = (await props.params).id;
  const { registrationLink } = await getTournamentInfo();
  const rankingsService = RankingsService.instance;
  
  // Ensure all data is loaded with proper error handling
  let currentSeason, availableRankings, rankings;
  
  try {
    [currentSeason, availableRankings] = await Promise.all([
      rankingsService.getSeason(id),
      rankingsService.getSeasons()
    ]);
    
    if (currentSeason) {
      rankings = await rankingsService.getRankings(currentSeason.id);
    }
  } catch (error) {
    console.error('Failed to load rankings data:', error);
    availableRankings = [];
    rankings = [];
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
        <img
          className={
            "smooth absolute top-[36%] lg:top-[19%] right-0 max-w-[170px] lg:max-w-[762px] -z-4"
          }
          src={mascotte.src}
          alt={"mascotte rankings"}
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
            CLASSEMENT <br /> {currentSeason?.name ?? id}
          </h1>
        </div>
        <div className={"w-full h-1/2"}>
          <EloRankingTable columns={columns} rankings={transformEloData(rankings ?? [])} />
        </div>
      </section>
    </>
  );
}

function transformEloData(data: Ranking[]): CompleteRanking[] {
  const eloSort = (a: string, b: string) => parseInt(b) - parseInt(a);

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
        eloSort(a.eloRating.toString(), b.eloRating.toString()))
}

export default Page;
