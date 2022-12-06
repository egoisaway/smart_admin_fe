import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  title="Relatório de Vendas"
  sales:any
  clients:any
  people:any

  constructor(private apiService:ApiService, public route:ActivatedRoute){}

  
  ngOnInit(){
    (this.route.snapshot.params['client_cnpj']=="todas")? this.find("sales/find",{}) : this.find("sales/find",this.route.snapshot.params)
    this.getClients()
    this.getPeople()
    // this.makeDateRangePicker()
  }

  getClients(){
    this.apiService.getAll("clients/full").subscribe(data=>this.clients=data.rows)
  }
  getPeople(){
    this.apiService.getAll("people").subscribe(data=>this.people=data.rows)
  }
  getSum(group:Array<any>){
    let total:number = 0
    group.forEach(member=>{
      member!=null? total=total+parseFloat(member) : null
    })
    return total
  }
  makeDate(datetime:any){
    let date                 = new Date(datetime)
    let formattedDate:string = ''
    let year                 = date.toLocaleString("default", { year: "numeric" });
    let month                = date.toLocaleString("default", { month: "2-digit" });
    let day                  = date.toLocaleString("default", { day: "2-digit" });
    formattedDate            = day+'/'+month+'/'+year

    return formattedDate
  }
  // makeDateRangePicker(){
  //   $('input[name="dates"]').daterangepicker();
  // }

  find(route:any,params:any){
    if(params.client_cnpj=="") delete params.client_cnpj
    if(params.client_name=="") delete params.client_name
    if(params.person_name=="") delete params.person_name

    this.apiService.find(route,params).subscribe((res:any)=>this.sales=res.rows)
  }
}
