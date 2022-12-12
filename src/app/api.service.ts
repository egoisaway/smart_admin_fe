import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  api = "http://192.168.0.132:3000"

  public getAll(route:string){
    return this.httpClient.get<any>(`${this.api}/${route}`)
  }

  public get(route:string,params:any){
    return this.httpClient.get<any>(`${this.api}/${route}/${params}`)
  }

  public post(route:string,data:any){
    return this.httpClient.post(`${this.api}/${route}`, data)
  }

  public getClientsFull(){
    return this.httpClient.get<any>(`${this.api}/clients/full`)
  }
  public find(route:string,data:any){
    let params:any = []
    params['where'] = data
    params = Object.assign({},params)
    return this.httpClient.post(`${this.api}/${route}`, params)
  }
}
