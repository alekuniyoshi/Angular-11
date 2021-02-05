import { Injectable } from '@angular/core';
import { Cliente } from './cliente';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients';


  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);

    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
}
