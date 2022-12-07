import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  sales:any
  clients:any
  people:any
  contacts:any
  services:any
  states:any
  line_types:any
  cities:any
  renovation_types:any
  showLineTypes = false
  items:Array<any> =[]
  plans: Array<any> = []
  totalPrices: Array<any> = []


  constructor(private apiService:ApiService, public route:ActivatedRoute){}

  
  ngOnInit(){
    (this.route.snapshot.params['client_cnpj']=="todas")? this.find("sales/find",{}) : this.find("sales/find",this.route.snapshot.params)
    this.getData()
    // this.makeDateRangePicker()
  }

  getData(){
    this.apiService.getAll("clients/full")     .subscribe(data=>this.clients=data.rows)
    this.apiService.getAll("people")           .subscribe(data=>this.people=data.rows)
    this.apiService.getAll("contacts")         .subscribe(data=>this.contacts=data.rows)
    this.apiService.getAll("states")           .subscribe(data=>this.states=data.rows)
    this.apiService.getAll("cities")           .subscribe(data=>this.cities=data.rows)
    this.apiService.getAll("plans")            .subscribe(data=>this.plans=data.rows)
    this.apiService.getAll("renovation-types") .subscribe(data=>this.renovation_types=data.rows)
    this.apiService.getAll("services")         .subscribe(data=>this.services=data.rows)
    this.apiService.getAll("line-types")       .subscribe(data=>this.line_types=data.rows)
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

  find(route:any,params:any):any{
    if(params.client_cnpj=="") delete params.client_cnpj
    if(params.client_name=="") delete params.client_name
    if(params.person_name=="") delete params.person_name
    if(params.name=="") delete params.client_name

    this.apiService.find(route,params).subscribe((res:any)=>this.sales=res.rows)
  }

  show(target:any){
    target.classList.remove('hidden')
    target.classList.add('showing')
  }
  hide(target:any){
    target.classList.remove('showing')
    target.classList.add('hidden')
  }

  toShowLineTypes(key:any){
    console.log(key.value)
  }

  addItem(){
    this.items.push('item')
  }
  removeItem(){
    this.items.pop()
  }

  updatePrice(price:any,quantity:any,target:any){
    let totalSubprice = parseFloat(price)*parseInt(quantity)
    let subprices: Array<any> = []
    
    if(!isNaN(totalSubprice)){
      target.innerHTML = totalSubprice
    }
    Array.from(document.getElementsByClassName("totalSubprice")).forEach((element:any) => {
      subprices.push(parseFloat(element.innerHTML))
    });
    let sum = subprices.reduce((partialSum, a) => partialSum + a, 0);
    let total:any = document.getElementById("current-total")
    total.innerHTML=(Math.round((sum + Number.EPSILON) * 100) / 100)
  }

  getPlanPrice(plan:any,target:any,which:any){
    let price 
    this.plans.find((obj:any)=>{
      if (obj.offer == plan) price = obj.value
    })
    target.value = price
    // this.updatePrice(which)
  }

  autoFillData(key:any,cnpjTarget:any, ufTarget:any, personTarget:any, cpfTarget:any, cityTarget:any, renovationTypeTarget:any, contactFixedTarget:any, contactMobileTarget:any, contactEmailTarget:any){
    let client:any
    this.clients.find((obj:any)=>{
      if (obj.name == key) {
        client           = obj
        cnpjTarget.value = client.cnpj
        ufTarget.value   = client.state
        
        this.renovation_types.find((obj:any)=>{
          if (obj.acronym == client.renovation_type) renovationTypeTarget.value = obj.acronym
        })
        this.cities.find((obj:any)=>{
          if (obj.name    == client.city) cityTarget.value = obj.name
        })
        this.people.find((obj:any)=>{
          if (obj.client_id == client.id && obj.job == 1) {
            personTarget.value = obj.name; cpfTarget.value = obj.cpf
            this.contacts.find((cont:any)=>{
              if (cont.person_id == obj.id && cont.contact_type_id == 3) contactFixedTarget.value  = cont.contact
              if (cont.person_id == obj.id && cont.contact_type_id == 2) contactMobileTarget.value = cont.contact
              if (cont.person_id == obj.id && cont.contact_type_id == 1) contactEmailTarget.value  = cont.contact
            })
          }
        })
      }
    })
  }

  singSale(isNewClient:boolean, isNewPerson:boolean,clientData:any,toFindClient:any){
    console.log(isNewClient, isNewPerson)

    // if(isNewClient){
    if (true){

      let ufId
      let cityId
      let renovationTypeId
      let params = {client:{}, sale:{}, contact:{}}
      let newClient  : any
      let newSale    : any
      let newContact : any

      this.states.find((obj:any)=>{
        if (obj.acronym == toFindClient.uf)              ufId             = obj.id
      })
      this.cities.find((obj:any)=>{
        if (obj.name    == toFindClient.city)            cityId           = obj.id
      })
      this.renovation_types.find((obj:any)=>{
        if (obj.acronym == toFindClient.renovation_type) renovationTypeId = obj.id
      })
      this.clients.find((obj:any)=>{
        if (obj.id == toFindClient.id) newClient.id = obj.id
      })

      newClient = {
        cnpj               : clientData.cnpj,
        name               : clientData.name,
        state_id           : ufId,
        city_id            : cityId,
        renovation_type_id : renovationTypeId,
        created_at         : (new Date()).toISOString().split('T')[0]
      }

      params.client = newClient
      
      console.log(params)
      // this.apiService.create("clients",{}).subscribe(
        //   (res:any)=>{
          //     console.log(res)
      //   }
      // )
    }else{

    }
  }
}
