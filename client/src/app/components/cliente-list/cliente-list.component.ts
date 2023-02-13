import { Component, HostBinding, OnInit } from '@angular/core';

import { ClientesService } from '../../services/clientes.service'

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit{

  @HostBinding('class') classes = 'row';
  clientes: any = [];

  constructor(private clientesService: ClientesService){}

  ngOnInit(){
    this.getClientes();
  }

  getClientes(){
    this.clientesService.getClientes().subscribe(
      res => {
        this.clientes = res;
      },
      err => console.error(err)
    )
  }

  deleteCliente(id:string){
    this.clientesService.deleteCliente(id).subscribe(
      res => {
        console.log(res);
        this.getClientes();
      },
      err => console.error(err)
    )
  }
}
