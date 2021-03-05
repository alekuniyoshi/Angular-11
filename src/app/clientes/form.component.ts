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
  public errors: String[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

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
    this.clienteService.create(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'New Client',
        'Client: ' + cliente.name + ' ' + cliente.lastName,
        'success'
      );
    },
      err => {
        this.errors = err.error.errors as String[];
        console.log("Code of error from backend:" + err.status);
        console.log(err.error.errors);
      }

    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe((json) => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        json.mensaje,
        'Client Edited: ' + this.cliente.name + ' ' + this.cliente.lastName,
        'success'
      );
    },
      err => {
        this.errors = err.error.errors as String[];
        console.log("Code of error from backend:" + err.status);
        console.log(err.error.errors);
      }
    );
  }
}
