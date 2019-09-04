import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Position } from "./data/position";

@Injectable({
  providedIn: 'root'
})

export class PositionService {
  private url="https://calm-refuge-91872.herokuapp.com"; 

  constructor(private http : HttpClient) { }

  getPositions() : Observable<Position[]>{
    return this.http.get<Position[]>(`${this.url}/positions`);
  }

  savePosition(position: Position): Observable<any>{
    return this.http.put<any>(`${this.url}/position/`+ position._id,position)
  }

  getPosition(id) : Observable<Position[]>{
    return this.http.get<Position[]>(`${this.url}/position/`+ id);
  }

}
