import { Component, OnInit, OnDestroy } from '@angular/core';
import {Employee} from './data/employee';
import {EmployeeService } from './employee.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: []
})
export class EmployeesComponent implements OnInit {
title="Employees";
  employees  : Employee[]= [];
  filteredEmployees: Employee[]= [];
  getEmployeesSub;
loadingError : boolean=false;

  constructor(private empSrv : EmployeeService,private r: Router) { }

  ngOnInit() {
    this.getEmployeesSub=this.empSrv.getEmployees()
    .subscribe(employees=>{this.employees=employees; this.filteredEmployees = employees;},
               err=>this.loadingError=true
  );
    
  }
  
  onEmployeeSearchKeyUP(event:any) {
   
  let filter = event.target.value.toLowerCase();
   this.filteredEmployees= this.employees.filter((employees)=>{ return employees.FirstName.toLowerCase().includes(filter) || 
    employees.LastName.toLowerCase().includes(filter) || employees.Position.PositionName.toLowerCase().includes(filter)
  });
    
  }
  ngOnDestroy(): void{
    if(this.getEmployeesSub != undefined)
 {
   this.getEmployeesSub.unsubscribe();
 } 

}
routeEmployee(id:string){
  this.r.navigate(['/employee',id]);
}  

}
