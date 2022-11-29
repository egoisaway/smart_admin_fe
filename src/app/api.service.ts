import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  api = "http://localhost:3000"

  public getAll(route:string){
    return this.httpClient.get<any>(`${this.api}/${route}`)
  }

  public get(route:string,params:any){
    return this.httpClient.get<any>(`${this.api}/${route}/${params}`)
  }

  public create(route:string,data:[]){
    return this.httpClient.post(`${this.api}/${route}`, data).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    )
  }
}
