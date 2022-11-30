import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent {
  title="Propostas"
  plans: Array<any> = []

  constructor(private apiService:ApiService, private changeDetection: ChangeDetectorRef){}

  ngOnInit(){
    this.getPlans()
  }

  getPlans(){
    console.log()
    this.apiService.getAll("plans").subscribe((data:any)=>{
      this.plans=data.rows
      console.log(this.plans)
    })
  }
}
