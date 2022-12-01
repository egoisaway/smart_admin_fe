import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  title = "Consultar Carteira"
  data:any = []
  results:any = []
  states:any = []
  currentAccess:any = []

  constructor(private apiService:ApiService){}

  ngOnInit(){
   this.getStates()
   this.getClientsFull()
  }

  getStates(){
    this.apiService.getAll("states").subscribe(data=>this.states=data.rows)
  }

  getClientsFull(){
    this.apiService.getClientsFull().subscribe(
      data=>{
        this.data=data.rows
        this.results=this.data
      })
    }

  find(route:any,params:any){
    if(params.cnpj=="") delete params.cnpj
    if(params.name=="") delete params.name
    if(params.city=="") delete params.city
    if(params.state=="") delete params.state
    if(params.can_renovate==false) delete params.can_renovate
    
    this.apiService.find(route,params).subscribe(
      (res:any)=>this.results=res.rows,
      err=>console.log('HTTP Error', err),
      ()=>console.log('HTTP request completed.')
      )
  }

  show(target:any){

    if(target.classList.contains('showing')){
      target.classList.remove('showing')
      target.classList.add('hidden')
    }else{
      target.classList.remove('hidden')
      target.classList.add('showing')
    }
  }
  findAccess(id:any){
    console.log(id)
    this.apiService.find('platforms-access/find',id).subscribe(
      (res:any)=>this.currentAccess=res.rows,
      err=>console.log('HTTP Error', err),
      ()=>console.log('HTTP request completed.')
      )
  }
}
