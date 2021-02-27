import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<Cliente[]> {
    return this.http
      .post<Cliente[]>(this.urlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          Swal.fire('Error can not create the client', e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getCliente(id: String): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlEndPoint + '/' + id).pipe(
      catchError((e: HttpErrorResponse) => {
        this.router.navigate(['/clientes']);
        Swal.fire('Error can not edit the client', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(this.urlEndPoint + '/' + cliente.id, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          Swal.fire('Error can not update the client', e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(this.urlEndPoint + '/' + id, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          Swal.fire('Error can not delete the client', e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
