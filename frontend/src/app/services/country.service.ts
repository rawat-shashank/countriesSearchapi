import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { CountryObj } from "../models/countryInterface";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getData(keyword: string): Observable<CountryObj[]> {
    return keyword && keyword.length >= environment.searchLength
      ? this.http.get<CountryObj[]>(environment.httpUrl + keyword)
      : of([]);
  }
}
