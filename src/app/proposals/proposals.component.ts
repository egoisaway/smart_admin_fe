import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  client:any

  constructor(private apiService:ApiService, private route:ActivatedRoute){}

  ngOnInit(){
    this.getPlans()
    this.find('clients/find', this.route.snapshot.params)
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
      values.push(parseFloat(element.value))
    });
    
    let sum = Math.round(((values.reduce((partialSum, a) => partialSum + a, 0)) + Number.EPSILON) * 100) / 100
    
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

  find(route:any,params:any){
    this.apiService.find(route,params).subscribe((res:any)=>{this.client=res.rows[0]})
  }
}
