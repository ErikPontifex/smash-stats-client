import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";
import { Set } from "./set.model";
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;
@Injectable()
export class SetService {
    constructor(private http: HttpClient) {}

    getAllSetsForPlayer(playerID: Number): Observable<Set[]> {
        return this.http.get<Set[]>(`${API_URL}/api/player/${playerID}/getAllSets`, {});
    }

    getSets(playerID: Number, sort: string, order: string, page: number): Observable<Set[]> {
        console.log('requesting sets for player ' + playerID);
        return this.http.get<Set[]>(`${API_URL}/api/player/${playerID}/getSets/${sort}/${order}/${page}`, {});
    }
}