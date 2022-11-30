import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  title = "Consultar Carteira"
  data:any
  states:any

  constructor(private apiService:ApiService){}

  ngOnInit(){
   this.getStates() 
  }

  getStates(){
    this.apiService.getAll("states").subscribe(data=>this.states=data.rows)
  }

  getClientsFull(){
    this.apiService.getClientsFull()
    .subscribe(
      data=>{
        this.data=data.rows
        console.log(this.data)
      })
  }

  find(params:any){
    if(params.where.cnpj=="") delete params.where.cnpj
    if(params.where.name=="") delete params.where.name
    if(params.where.city=="") delete params.where.city
    if(params.where.state=="") delete params.where.state
    if(params.where.can_renovate==false) delete params.where.can_renovate
    console.log(params)

    this.apiService.find("clients/find",params)
    .subscribe(
      res=>this.data=res,
      err=>console.log('HTTP Error', err),
      ()=>console.log('HTTP request completed.')
      )
  }
}
