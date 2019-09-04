import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from './data/position';
import { PositionService } from './position.service';

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
  constructor( private posSrv : PositionService) { }

  ngOnInit() {
    this.getPositionsub=  this.posSrv.getPositions()
    .subscribe(positions=>this.positions=positions,
              err=>this.loadingError=true);
  
  }
    
  

onDestroy(): void{
  if(this.getPositionsub != undefined)
  {
    this.getPositionsub.unsubscribe();
  }
    
}
}

