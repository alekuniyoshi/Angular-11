import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint + '/pages/' + page).pipe(map((response: any) => {

      (response.content as Cliente[]).map(cliente => {
        //cliente.name = cliente.name.toUpperCase();
        let datePipe = new DatePipe('es');
        //cliente.createAd = datePipe.transform(cliente.createAd, 'fullDate'); //formatDate(cliente.createAd, 'dd-MM-yyyy', 'en-US');
        return cliente;
      });
      return response;
    }));
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {

          if (e.status == 400) {
            return throwError(e);
          }

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

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(this.urlEndPoint + '/' + cliente.id, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {

          if (e.status == 400) {
            return throwError(e);
          }

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
