import { Injectable } from '@angular/core';
import { Employee } from './data/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url="https://calm-refuge-91872.herokuapp.com"; 

  constructor( private http: HttpClient ) {  }

  getEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }
}
