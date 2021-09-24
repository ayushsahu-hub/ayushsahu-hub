import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface flightData {
  source:string,
  destination: string,
  departure: string,
  returndate:string,
}

interface Value {
  source:string,
  destination: string,
  departure: string,
  returndate:string,
  passenger:number
}

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  rootUrl:string = 'http://localhost:3000/flights';

  constructor(private http:HttpClient) { }

  getData(value:Value) {
    const { departure,returndate,source,destination } = value;
    let Source = source.toUpperCase(),
        Destination = destination.toUpperCase();

    return this.http.get<flightData>(`${this.rootUrl}?departuredate=${departure}&returndate=${returndate}&source=${Source}&destination=${Destination}`);
  }
}
