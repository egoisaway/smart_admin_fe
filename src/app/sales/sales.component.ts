import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toArray } from 'rxjs';
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
  contact_types:any
  services:any
  states:any
  line_types:any
  cities:any
  renovation_types:any
  showLineTypes = false
  items:Array<any> =[]
  plans: Array<any> = []


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
    this.apiService.getAll("contact-types")    .subscribe(data=>this.contact_types=data.rows)
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

  singSale(clientData:any,toFindClient:any,contactData:any,saleData:any){
    // if(isNewClient){
    if (true){

      //declarations
      let clientId
      let ufId
      let cityId
      let renovationTypeId
      let personId
      let sellerId
      let items
      let totalPrices:Array<any> = []
      let totalItems:Array<any> = []
      let contacts:Array<any> = []
      let itemValues = {broadbands:'', mobiles:'', devices:''}
      let params = {client:{}, sale:{}, contacts:{}, people:{}}

      //data reutilization
      this.clients.find((obj:any)=>{
        if (obj.cnpj == clientData.cnpj) clientId = obj.id
      })
      this.states.find((obj:any)=>{
        if (obj.acronym == toFindClient.uf) ufId = obj.id
      })
      this.cities.find((obj:any)=>{
        if (obj.name    == toFindClient.city) cityId = obj.id
      })
      this.renovation_types.find((obj:any)=>{
        if (obj.acronym == toFindClient.renovation_type) renovationTypeId = obj.id
      })
      this.people.find((obj:any)=>{
        if (obj.name == saleData.person_name) personId = obj.id
      })
      this.people.find((obj:any)=>{
        if (obj.name == saleData.seller_name) sellerId = obj.id
      })
      if(saleData.cpf == "") delete saleData.cpf
      
      //price-getting
      items = Array.from(document.getElementsByClassName('item'))
      items.forEach((item:any) => {
        let service     = (<HTMLInputElement>item.children.item(0)?.children.item(0)).value;
        let line_type     = (<HTMLInputElement>item.children.item(item.childElementCount-4)?.children.item(0)).value;
        let plan     = (<HTMLInputElement>item.children.item(item.childElementCount-4)?.children.item(0)).value;
        let price    = (<HTMLInputElement>item.children.item(item.childElementCount-3)?.children.item(1)).value;
        let quantity = parseInt((<HTMLInputElement>item.children.item(item.childElementCount-2)?.children.item(1)).value); 
        let subTotal = (Math.round(((parseFloat(price)*quantity) + Number.EPSILON) * 100) / 100)

        //line-filtering
        totalPrices.push({service,subTotal})
        while(quantity>0){
          quantity--
          totalItems.push({service,plan,price})
        }
      });
      console.log(totalItems)
      

      //price-filtering
      let broadbands:Array<any> = []
      let mobiles:Array<any> = []
      let devices:Array<any> = []
      
      totalPrices.find((obj:any)=>{
        if (obj.type == 'Banda Larga') broadbands.push(obj.subTotal)
        if (obj.type == 'Móvel Pós-pago' || obj.type == 'Fixo Pós-pago') mobiles.push(obj.subTotal)
        if (obj.type == 'Aparelho') devices.push(obj.subTotal)
      })
      itemValues.broadbands = broadbands.reduce((accumulator, value)=>{return accumulator+value}, 0);
      itemValues.mobiles = mobiles.reduce((accumulator, value)=>{return accumulator+value}, 0);
      itemValues.devices = devices.reduce((accumulator, value)=>{return accumulator+value}, 0);

      //contact data filtering
      if(contactData.email  == ""){delete contactData.email}  else {contacts.push({person_id:personId,contact_type_id:1,contact:contactData.email,created_at:(new Date()).toISOString().split('T')[0]})};
      if(contactData.mobile == ""){delete contactData.mobile} else {contacts.push({person_id:personId,contact_type_id:2,contact:contactData.mobile,created_at:(new Date()).toISOString().split('T')[0]})};
      if(contactData.fixed  == ""){delete contactData.fixed}  else {contacts.push({person_id:personId,contact_type_id:3,contact:contactData.fixed,created_at:(new Date()).toISOString().split('T')[0]})};

      //params-to-api declarations
      params.client = {
        cnpj               : clientData.cnpj,
        name               : clientData.name,
        state_id           : ufId,
        city_id            : cityId,
        renovation_type_id : renovationTypeId,
        created_at         : (new Date()).toISOString().split('T')[0]
      }
      params.sale = {
        client_id      : clientId,
        person_id      : sellerId,
        vtc_lines      : itemValues.mobiles,
        vtc_broadbands : itemValues.broadbands,
        vtc_devices    : itemValues.devices,
        observation    : saleData.observation,
        created_at     : (new Date()).toISOString().split('T')[0]
      }
      params.people = [{
        client_id      : clientId,
        cpf            : saleData.cpf,
        name           : saleData.person_name,
        job            : 1,
        created_at     : (new Date()).toISOString().split('T')[0]
      },{
        client_id      : 461,
        name           : saleData.seller_name,
        created_at     : (new Date()).toISOString().split('T')[0]
      }]
      params.contacts = contacts

      // this.apiService.create("sales/sing",params).subscribe(
      //     (res:any)=>{
      //         console.log(res)
      //   }
      // )
    }else{

    }
  }
}
