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
  lines: Array<any> = []

  constructor(private apiService:ApiService, private changeDetection: ChangeDetectorRef){}

  ngOnInit(){
    this.getPlans()
  }

  getPlans(){
    console.log()
    this.apiService.getAll("plans").subscribe((data:any)=>{
      this.plans=data.rows
    })
  }

  addLine(){
    this.lines.push('line')
  }
  removeLine(){
    this.lines.pop()
  }
  print(){
    window.print()
  }
  updatePrice(which:string){
    let elements = Array.from(document.getElementsByClassName(`${which}-price`))
    let values:Array<any> = []
    elements.forEach((element:any) => {
      values.push(parseInt(element.value))
    });
    
    let sum = values.reduce((partialSum, a) => partialSum + a, 0);
    
    let target:any = document.getElementById(`${which}-total`)
    target.innerHTML = 'R$ '+sum
  }
  getPlanPrice(plan:any,target:any,which:any){
    let price 
    this.plans.find((obj:any)=>{
      if (obj.offer == plan) price = obj.value
    })
    target.value = price
    this.updatePrice(which)
  }
}
