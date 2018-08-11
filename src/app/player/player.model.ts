export class Player {
    playerID: Number;
    gamerTag: String;
    name: String;
    twitterHandle: String;
    twitchStream: String;
    country: String;
    state: String;
    region: String;
    images: [{ id : number,
               width : number,
               height: number,
               ratio : number,
               type : string,
               url : string,
               isOriginal : boolean
            }];


    constructor(obj?: any){
        this.playerID       = obj && obj.playerID       || 0;
        this.gamerTag       = obj && obj.gamerTag       || '';
    }

}