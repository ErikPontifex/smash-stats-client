export class Set {
    setID: Number;
    groupID: Number;
    player1ID: number;
    player1Tag: String;
    player2ID: number;
    player2Tag: String;
    player1Score: number;
    player2Score: number;
    winnerID: number;
    loserID: number;
    fullRoundText: String;
    bestOf: number;
    games: [Object];
    eventID: number;
    tournamentID: number;
    tournamentName: String;
    time: number;
    phaseName: String;
    opponentID: number;
    opponentTag: String;
    opponentScore: number;
    playerScore: number;

    constructor(obj?: any){
        this.setID          = obj && obj.setID          || 0;
        this.groupID        = obj && obj.groupID        || 0;
        this.player1ID      = obj && obj.player1ID      || 0;
        this.player1Tag     = obj && obj.player1Tag     || '';
        this.player2ID      = obj && obj.player2ID      || 0;
        this.player2Tag     = obj && obj.player2Tag     || '';
        this.player2Score   = obj && obj.player1Score   || 0;
        this.player1Score   = obj && obj.player2Score   || 0;
        this.fullRoundText  = obj && obj.fullRoundText  || '';
        this.bestOf         = obj && obj.bestOf         || 0;
        this.games          = obj && obj.games          || null;
        this.eventID        = obj && obj.eventID        || 0;
        this.tournamentID   = obj && obj.tournamentID   || 0;
    }
}