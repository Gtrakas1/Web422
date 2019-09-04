import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from './data/employeeRaw';
import { EmployeeService } from './employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from './position.service';
import { Position } from './data/position';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {
private paramSubscription;
private employeeSubscription;
private getPositionsSubscription;
private saveEmployeeSubscription;
employee : EmployeeRaw;
private positions : Position[];
private successMessage : boolean = false;
private failMessage : boolean = false;

  constructor(private e : EmployeeService,
              private r : ActivatedRoute, 
              private p: PositionService,
             ) { }

  ngOnInit() {
    this.paramSubscription=this.r.params.subscribe((params)=>{
this.employeeSubscription =  this.e.getEmployee(params['id']).subscribe(employee =>
  this.employee=employee[0]);

this.getPositionsSubscription= this.p.getPositions().subscribe(positions=>this.positions=positions)
  
})  
  }

  onSubmit(f: NgForm) {
    this.saveEmployeeSubscription = this.e.saveEmployee(this.employee).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => this.successMessage = false, 2000);
    },
    () => {
      this.failMessage = true;
      setTimeout(() => this.failMessage = false, 2500);
    });
  }

ngOnDestroy(){
  if(this.paramSubscription != undefined){this.paramSubscription.unsubscribe();}
  if(this.employeeSubscription != undefined){this.employeeSubscription.unsubscribe();}
  if(this.getPositionsSubscription != undefined){this.getPositionsSubscription.unsubscribe();}
  if(this.saveEmployeeSubscription != undefined){this.saveEmployeeSubscription.unsubscribe();}
}
}
