import { Component, HostBinding, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente'
import { Router, ActivatedRoute } from '@angular/router'

import { ClientesService } from '../../services/clientes.service'

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  cliente: Cliente = {
    id: 0,
    nombre: "",
    tipoCuenta: "",
    monto: 0
  };

  edit:boolean = false;

  constructor(private clienteService: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']){
      this.clienteService.getCliente(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.cliente = res;
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveNewClient() {
    delete this.cliente.id;
    this.clienteService.saveCliente(this.cliente)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/clientes']);
        },
        err => console.error(err)
      )
  }

  updateCliente(){
    delete this.cliente.tipoCuenta;
    const params = this.activatedRoute.snapshot.params;
    this.clienteService.updateCliente(params['id'], this.cliente)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/clientes']);
        },
        err => console.log(err)
      )
  }
}
