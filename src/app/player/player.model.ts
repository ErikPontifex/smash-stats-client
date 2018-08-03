export class Player {
    playerID: Number;
    gamerTag: String;
    name: String;
    twitterHandle: String;
    twitchStream: String;
    country: String;
    state: String;
    region: String;


    constructor(obj?: any){
        this.playerID       = obj && obj.playerID       || 0;
        this.gamerTag       = obj && obj.gamerTag       || '';
    }

}