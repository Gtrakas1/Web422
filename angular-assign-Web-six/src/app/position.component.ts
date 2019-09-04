import { Component, OnInit } from '@angular/core';
import { PositionService } from './position.service';
import { ActivatedRoute } from '@angular/router';
import { Position } from './data/position';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styles: []
})
export class PositionComponent implements OnInit {
private paramSubscription;
private positionSubscription;
private savePositionSubscription: any;
private position : Position;
private successMessage : boolean=false;
private failMessage : boolean=false;
  constructor(private p : PositionService, private r : ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription=this.r.params.subscribe((params)=>{
      this.positionSubscription=this.p.getPosition(params['id']).subscribe(position=>this.position=position[0]);
    })


  }
  onSubmit(f: NgForm) {
    this.savePositionSubscription = this.p.savePosition(this.position).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => this.successMessage = false, 2500);
    }, 
    () => {
      this.failMessage = true;
      setTimeout(() => this.failMessage = false, 2500);
    });
  }
  ngOnDestroy() {
  if(this.paramSubscription){this.paramSubscription.unsubscribe();}
  if(this.positionSubscription){this.positionSubscription.unsubscribe();}
  if(this.savePositionSubscription){this.savePositionSubscription.unsubscribe();}
}
}
