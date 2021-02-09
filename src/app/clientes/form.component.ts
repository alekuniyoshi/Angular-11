import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public title: string = 'Add Client';
  public cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.clienteService.create(this.cliente).subscribe(cliente =>{
      this.router.navigate(['/clientes'])
      Swal.fire('New Client','Client '+ this.cliente.name,'success')
    });
  }

}
