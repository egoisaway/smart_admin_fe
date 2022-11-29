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
  getData(){
    this.apiService.getAll("clients").subscribe(
      data=>{
        this.data=data.rows
        console.log(this.data)
        // this.getCity(this.data.city_id)
      })
  }

  // getCity(id:any){
  //   this.apiService.get("cities","id:"+id).subscribe(data=>{console.log(data)})
  // }

  log(data:any){
    console.log(data)
  }
}
