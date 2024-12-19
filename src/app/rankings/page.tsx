import {columns, EloEntry} from "@/components/rankings/columns.tsx";
import mascotte from "@/assets/icons/rankings_icon.svg";
import EloRankingTable from "@/components/rankings/elo-ranking-table.tsx";
import GoogleService from "@/services/google.service.ts";
import getTournamentInfo from "@/contents/sections/tournamentInfo/actions.ts";
import Header from "@/components/header.tsx";

async function getEloData() {
    const googleService = GoogleService.instance;
    const eloSheet = await googleService.readGoogleSheet(process.env.ELO_DOC, "2024");
    return transformEloData(eloSheet?.values ?? []);
}

async function Page() {
    const {tournamentInfo} = await getTournamentInfo();
    const rankings = await getEloData();
    return <>
        <Header signupUrl={tournamentInfo.registrationLink} />
        <section className={"relative flex flex-col justify-center items-center w-screen h-screen bg-secondary-500"}>
            <img
                className={"smooth absolute top-[36%] lg:top-[19%] right-0 max-w-[170px] lg:max-w-[762px] -z-4"}
                src={mascotte.src}
                alt={"mascotte rankings"}
            />
            <div className={"h-full mt-40 flex items-center justify-start w-full sm:w-full px-5 pb-10"}>
                <h1 className={"!z-10 p-4 uppercase smooth font-display lg:text-display-l text-display-s font-extrabold"}>
                    CLASSEMENT <br/> 2024-2025
                </h1>
            </div>
            <div className={"w-full h-1/2"}>
                <EloRankingTable columns={columns} rankings={rankings}/>
            </div>
        </section>
    </>;
}

function transformEloData(data: string[][]): EloEntry[] {
    const rows = data.slice(1);
    const placeholder = (val: number) => isNaN(val) ? -1 : val;
    const eloSort = (a: string, b: string) => parseInt(b) - parseInt(a);

    return rows.sort((a, b) => eloSort(a[1], b[1])).map((row, index) => ({
        rank: index + 1,
        teamName: row[0],
        elo: placeholder(parseInt(row[1])),
        wins: placeholder(parseInt(row[2])),
        losses: placeholder(parseInt(row[3])),
        gamesPlayed: placeholder(parseInt(row[4])),
        winRate: placeholder(parseInt(row[5])),
    }));
}

export default Page;