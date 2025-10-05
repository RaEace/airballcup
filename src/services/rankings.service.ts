import {BasePayload, getPayload} from "payload";
import config from "@payload-config";
import {Ranking, Season} from "@/payload-types.ts";

class RankingsService {
    static #instance: RankingsService;
    private payload: BasePayload | null = null;
    private seasonsCache: Season[] | null = null;
    private cacheTimestamp: number = 0;
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    constructor() {
        this.initializePayload();
    }

    public static get instance() {
        if (!RankingsService.#instance) {
            RankingsService.#instance = new RankingsService();
        }
        return RankingsService.#instance;
    }

    async getSeasons(): Promise<Season[] | undefined> {
        // Check cache first
        if (this.seasonsCache && Date.now() - this.cacheTimestamp < this.CACHE_DURATION) {
            return this.seasonsCache;
        }

        try {
            const payload = await this.ensurePayload();
            const result = await payload.find({ collection: 'seasons', sort: ['-year'], limit: 100});
            this.seasonsCache = result.docs;
            this.cacheTimestamp = Date.now();
            return this.seasonsCache;
        } catch (error) {
            console.error('Failed to fetch seasons:', error);
            return this.seasonsCache ?? undefined; // Return cached data if available
        }
    }

    async getSeason(id: string): Promise<Season | undefined> {
        try {
            const payload = await this.ensurePayload();
            const result = await payload.find({ collection: 'seasons', where: { id: { equals: id } }, limit: 1 });
            return result.docs[0];
        } catch (error) {
            console.error('Failed to fetch season:', error);
            return undefined;
        }
    }

    async getSeasonByYear(year: string | number): Promise<Season | undefined> {
        try {
            const payload = await this.ensurePayload();
            const result = await payload.find({
                collection: 'seasons',
                where: { startDate: { greater_than: `${year}-01-01` }, endDate: { less_than: `${year}-12-31` } },
                limit: 1
            });
            return result.docs[0];
        } catch (error) {
            console.error('Failed to fetch season by year:', error);
            return undefined;
        }
    }

    async getRankings(seasonId: string): Promise<Ranking[] | undefined> {
        try {
            const payload = await this.ensurePayload();
            const result = await payload.find({ collection: 'rankings', where: { season: { equals: seasonId } }, sort: ['-rank'], limit: 1000});
            return result.docs;
        } catch (error) {
            console.error('Failed to fetch rankings:', error);
            return undefined;
        }
    }

    async getRankingsByYear(year: string | number): Promise<Ranking[] | undefined> {
        const season = await this.getSeasonByYear(year);
        return season ? this.getRankings(season.id) : undefined;
    }

    private async initializePayload(retries = 3): Promise<void> {
        try {
            this.payload = await getPayload({ config });
        } catch (error) {
            if (retries > 0) {
                console.warn(`Payload initialization failed, retrying... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.initializePayload(retries - 1);
            }
            console.error('Failed to initialize payload after multiple attempts:', error);
        }
    }

    private async ensurePayload(): Promise<BasePayload> {
        if (!this.payload) {
            await this.initializePayload();
        }
        if (!this.payload) {
            throw new Error('Payload not available');
        }
        return this.payload;
    }
}

export default RankingsService;
