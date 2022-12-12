import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  data:any = []
  results:any = []
  states:any = []
  currentAccess:any = []
  currentAccessId:any
  platforms:any

  constructor(private apiService:ApiService){}

  ngOnInit(){
   this.getStates()
   this.getClientsFull()
   this.getPlatforms()
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
  getPlatforms(){
    this.apiService.getAll("platforms").subscribe(data=>this.platforms=data.rows)
  }

  find(route:any,params:any){
    if(params.cnpj=="") delete params.cnpj
    if(params.name=="") delete params.name
    if(params.city=="") delete params.city
    if(params.state=="") delete params.state
    if(params.can_renovate==false) delete params.can_renovate
    if(params.remaining_to_renovate=="") delete params.remaining_to_renovate
    
    this.apiService.find(route,params).subscribe(
      (res:any)=>this.results=res.rows,
      err=>console.log('HTTP Error', err),
      ()=>console.log('HTTP request completed.')
      )
  }

  oldShow(target:any){

    if(target.classList.contains('showing')){
      target.classList.remove('showing')
      target.classList.add('hidden')
    }else{
      target.classList.remove('hidden')
      target.classList.add('showing')
    }
  }
  show(target:any){
    target.classList.remove('hidden')
    target.classList.add('showing')
  }
  hide(target:any){
    target.classList.remove('showing')
    target.classList.add('hidden')
  }
  findAccess(id:any){
    this.currentAccessId = id
    this.apiService.find('platforms-access/find',id).subscribe(
      (res:any)=>this.currentAccess=res.rows
    )
  }
  addAccess(data:any){
    this.platforms.find((obj:any)=>{
      if (obj.name == data.platform) data.platform_id=obj.id
    })
    delete data.platform
    data.created_at = (new Date()).toISOString().split('T')[0]
    this.apiService.post('platforms-access',data).subscribe(
      (res:any)=>alert(res.res),
    )
  }
}
