import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Player } from "./player.model";
import { Observable } from "../../../node_modules/rxjs";
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class PlayerService {
    constructor(private http: HttpClient) {}

    getPlayer(playerID: Number) :Observable<Player>  {
        return this.http.get<Player>(`${API_URL}/api/player/${playerID}`, {});
    }

    getAllPlayers() {
        return this.http.get(`${API_URL}/api/getAllPlayers`, {});
    }

    searchPlayers(term) {
        return this.http.get(`${API_URL}/api/searchPlayers/${term}`, {});
    }
}