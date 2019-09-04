import { Component, OnInit, OnDestroy } from '@angular/core';
import {Employee} from './data/employee';
import {EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: []
})
export class EmployeesComponent implements OnInit {
title="Employees";
  employees  : Employee[]= [];
getEmployeesSub;
loadingError : boolean=false;

  constructor(private empSrv : EmployeeService) { }

  ngOnInit() {
    this.getEmployeesSub=this.empSrv.getEmployees()
    .subscribe(employees=>this.employees=employees,
               err=>this.loadingError=true
  );
    
  }
  
  ngOnDestroy(): void{
    if(this.getEmployeesSub != undefined)
 {
   this.getEmployeesSub.unsubscribe();
 } 
}
  

}
