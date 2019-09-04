import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from './data/position';
import { PositionService } from './position.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styles: []
})

export class PositionsComponent implements OnInit {
  title="Positions";
  positions : Position[]=[];
getPositionsub;
loadingError : boolean=false;
  constructor( private posSrv : PositionService,
               private ro: Router) { }

  ngOnInit() {
    this.getPositionsub=  this.posSrv.getPositions()
    .subscribe(positions=>this.positions=positions,
              err=>this.loadingError=true);
  
  }
  
  routePosition(id:string){
    this.ro.navigate(['/position',id]);
  }
  

onDestroy(): void{
  if(this.getPositionsub != undefined)
  {
    this.getPositionsub.unsubscribe();
  }
    
}
}

