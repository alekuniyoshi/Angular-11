import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  paginator: any;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // let page: number = +  this.activatedRoute.snapshot.paramMap.get('pages');
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clienteService
        .getClientes(page).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginator = response;
        });

    });

  }

  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete :' + cliente.name + ' ' + cliente.lastName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.name} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }


}
