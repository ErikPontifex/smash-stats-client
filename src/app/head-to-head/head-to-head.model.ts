import { Set } from "../set/set.model";

export class HeadToHead {

    sets: Set[];
    opponentID: number;
    opponentTag: string;
    playerRecord: number;
    opponentRecord: number;
    playerRecord2018: number;
    opponentRecord2018: number;
    miomRank: number | string;
    mpgrRank: number | string;

    constructor(obj?: any) {
        this.sets               = obj && obj.sets               || [],
        this.opponentID         = obj && obj.opponentID         || '',
        this.opponentTag        = obj && obj.opponentTag        || '',
        this.playerRecord       = obj && obj.playerRecord       || 0,
        this.opponentRecord     = obj && obj.opponentRecord     || 0,
        this.playerRecord2018   = obj && obj.playerRecord2018   || 0,
        this.opponentRecord2018 = obj && obj.opponentRecord2018 || 0,
        this.miomRank           = obj && obj.miomRank           || 'unranked',
        this.mpgrRank           = obj && obj.mpgrRank           || 'unranked'

    }
}