import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvitadoService } from '../services/invitado.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './invitado-add-edit.component.html',
  styleUrls: ['./invitado-add-edit.component.scss']
})
export class InvitadoAddEditComponent implements OnInit{
  invitadoForm: FormGroup; // Defino mi formulario

  constructor(
    private _fb: FormBuilder, // Inyecto el formBuilder para contruir el formulario
    private _invitadoService: InvitadoService, // Servicio de invitado
    private _dialogRef: MatDialogRef<InvitadoAddEditComponent>, // Referencia al dialogo
    @Inject(MAT_DIALOG_DATA) public data: any // Datos inyectados al dialogo
    ) { 
    // Initialize the form
    this.invitadoForm = this._fb.group({
      firstName: ['', [Validators.required]], // Nombre con valor requerido
      lastName: ['', [Validators.required]], // Apellido con valor requerido
      email: ['', [Validators.required, Validators.email]], // Email con valor requerido y validacion de email
      birthdate: ['', [Validators.required]], // Fecha de nacimiento con valor requerido
      telefono: ['', [Validators.required, Validators.pattern(/^\+?\d{10, 15}$/)]], // Telefono con valor requerido y validacion de solo numeros
      gender: ['', [Validators.required]], // Genero con valor requerido
    });
  }

  ngOnInit() {
    this.invitadoForm.patchValue(this.data); // Relleno el formulario con los datos inyectados
  }

  // Function to handle the form submission
  onFormSubmit() {
    if(this.invitadoForm.valid) { // Si el formulario es valido
      if(this.data){ // Si hay datos inyectados(es una edicion de invitado)
        this._invitadoService.updateInvitado(this.data.id, this.invitadoForm.value).subscribe(
          (res) => {
            this._dialogRef.close(true); // Cierro el dialogo y devuelvo true
          },
          (error) => {
            console.log(error);
          }
        )
      } else { // Si no hay datos inyectados(es un nuevo invitado)
        console.log(this.invitadoForm.value);
        // Call the service to add the employee and pass it the data
        this._invitadoService.addInvitado(this.invitadoForm.value).subscribe( // Llamo al servicio para agregar el invitado y le paso los datos
          (res) => {
            this._invitadoService.openSnackBar('Invitado agregado exitosamente!', 'Cerrar');
            this._dialogRef.close(true);
          },
          (error) => {
            //TODO: Add snackbar error
            this._invitadoService.openSnackBar('Error al agregar el invitado', 'Cerrar');
          }
        );
      }
    }
  }
}
