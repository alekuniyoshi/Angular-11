import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public title: string = 'Add Client';
  public cliente: Cliente = new Cliente();

  constructor() {}

  ngOnInit(): void {}

  public create(): void {
    console.log(this.cliente);
  }
}
