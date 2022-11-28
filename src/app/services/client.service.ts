import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../classes/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  API_SERVER = "http://localhost:3000";

  public getClients(){
    return this.httpClient.get<Client[]>(`${this.API_SERVER}/clients`);
  }

  public getClient(data:any){
    return this.httpClient.get<Client[]>(`${this.API_SERVER}/clients`,data);
  }

  public createClient(Clients: Client){
    return this.httpClient.post<Client>(`${this.API_SERVER}/clients/create`, Clients);
  }

  public deleteClients(id: number){
    return this.httpClient.delete(`${this.API_SERVER}/clients/${id}/delete`);
  }
}
