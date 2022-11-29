import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  title="Relatório de Vendas"
  sales:any

  constructor(private apiService:ApiService){}

  getSales(){
    this.apiService.getAll("sales").subscribe(data=>this.sales=data.rows)
  }

  ngOnInit(){
    this.getSales()
  }
}
