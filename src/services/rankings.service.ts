import {BasePayload, getPayload} from "payload";
import config from "@payload-config";
import {Ranking, Season} from "@/payload-types.ts";

class RankingsService {
    static #instance: RankingsService;
    private payload: BasePayload | null = null;

    constructor() {
        getPayload({ config }).then((payload) => {
            this.payload = payload
        });
    }

    public static get instance() {
        if (!RankingsService.#instance) {
            RankingsService.#instance = new RankingsService();
        }
        return RankingsService.#instance;
    }

    async getSeasons(): Promise<Season[] | undefined> {
        return this.payload?.find({ collection: 'seasons', sort: ['-year'], limit: 100}).then((res) => res.docs);
    }

    async getSeason(id: string): Promise<Season | undefined> {
        return this.payload?.find({ collection: 'seasons', where: { id: { equals: id } }, limit: 1 }).then((res) => res.docs[0]);
    }

    async getSeasonByYear(year: string | number): Promise<Season | undefined> {
        return this.payload?.find({
            collection: 'seasons',
            where: { startDate: { greater_than: `${year}-01-01` }, endDate: { less_than: `${year}-12-31` } },
            limit: 1
        }).then((res) => res.docs[0]);
    }

    async getRankings(seasonId: string): Promise<Ranking[] | undefined> {
        return this.payload?.find({ collection: 'rankings', where: { season: { equals: seasonId } }, sort: ['-rank'], limit: 1000}).then((res) => res.docs);
    }

    async getRankingsByYear(year: string | number): Promise<Ranking[] | undefined> {
        const season = await this.getSeasonByYear(year);
        return season ? this.getRankings(season.id) : undefined;
    }
}

export default RankingsService;