import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitadoService {
  url = 'http://localhost:3000/invitados'; // URL de la API generada con JSON-SERVER

  constructor(
    private _http: HttpClient, // Inyecto el servicio de HttpClient
    private _snackBar: MatSnackBar // Inyecto el servicio de snackbar
  ) { }

  // Function to open a snackbar with a message
  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
  
  // Function service to add a guest (post)
  addInvitado(data: any): Observable<any> {
    return this._http.post(this.url, data);
  }

  // Function service to get all Invitados (get)
  getInvitadoList(): Observable<any> {
    return this._http.get(this.url);
  }

  // Function service to update a guest (put)
  updateInvitado(id: number, data: any) {
    return this._http.put(`${this.url}/${id}`, data);
  }

  // Function service to delete an Invitado (delete)
  deleteInvitado(id: number): Observable<any> {
    return this._http.delete(`${this.url}/${id}`);
  }
}

