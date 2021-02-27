import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public title: string = 'Add Client';
  public cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addClients();
  }

  addClients(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe( json => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        json.mensaje,
        'Client: ' +this.cliente.name + ' ' + this.cliente.lastName,
        'success'
      );
    });
  }

  update(): void {
    this.clienteService
      .update(this.cliente)
      .subscribe((Cliente) => this.router.navigate(['/clientes']));
    Swal.fire(
      'Client Edited',
      'Client Edited: ' + this.cliente.name + ' ' + this.cliente.lastName,
      'success'
    );
  }
}
