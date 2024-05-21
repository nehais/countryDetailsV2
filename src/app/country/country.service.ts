import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  /*Fetch List of Countries*/
  getAllCountries(): Observable<Country[]>{
    this.apiUrl = environment.apiUrl + "/all";
    return this.http.get<Country[]>(this.apiUrl);
  }

  /*Fetch Country Details w.r.t. Code*/
  getCountryDetailsWithCode(countryCode: string): Observable<Country[]>{
    this.apiUrl = environment.apiUrl + "/alpha/" + countryCode;
    return this.http.get<Country[]>(this.apiUrl);
  }

  print ($event : any){
    console.log($event.value);
  }
}
