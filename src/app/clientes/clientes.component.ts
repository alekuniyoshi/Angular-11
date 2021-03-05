import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService
      .getClientes().pipe(tap(clientes => {
        console.log('clientes.component');
        clientes.forEach(cliente => {
          console.log(cliente.name);
        })
      })).subscribe(clientes => this.clientes = clientes);
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete :' + cliente.name + ' ' + cliente.lastName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe((response) => {
          this.clienteService
            .getClientes()
            .subscribe((clientes) => (this.clientes = clientes));
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
