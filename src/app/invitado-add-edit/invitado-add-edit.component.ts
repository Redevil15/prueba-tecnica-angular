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
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+/)]], // Telefono con valor requerido y validacion de solo numeros
      gender: ['', [Validators.required]], // Genero con valor requerido
    });
  }

  ngOnInit() {
    this.invitadoForm.patchValue({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      email: this.data.email,
      birthdate: this.data.birthdate,
      telefono: this.formatTelefono(this.data.telefono), // Formateo el número de teléfono
      gender: this.data.gender
    });

    //this.invitadoForm.patchValue(this.data); // Relleno el formulario con los datos inyectados
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
            //this._invitadoService.openSnackBar('Invitado agregado exitosamente!', 'Cerrar');
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

  // Funcion para dar formato al valor en el input telefono
  formatTelefono(telefono: string){
    telefono = telefono.replace(/\D/g, ''); // Remuevo todos los caracteres que no sean numeros
    const formattedTelefono = telefono.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4'); // Formateo el número de teléfono
    return formattedTelefono; // Devuelvo el número de teléfono formateado
  }

  // Funcion para validar que solo se ingresen numeros en el input telefono
  onKeyPress(event: KeyboardEvent): boolean { 
    const charCode = event.key.charCodeAt(0); // Obtengo el codigo ascii del caracter ingresado

    // Si el codigo ascii del caracter ingresado no es un numero, prevengo la accion por defecto y devuelvo falso
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    // Si el codigo ascii del caracter ingresado es un numero, devuelvo verdadero
    return true;
  }

  // Se llama cuando cambia el valor en el campo del telefono
  onTelefoneChange(): void {
    const telefonoControl = this.invitadoForm.get('telefono'); // Obtengo el control del telefono
    // Si el control del telefono existe
    if (telefonoControl) {
      // Obtengo el valor del telefono
      let telefono = telefonoControl.value; // = 7226810775
      // Le doy formato al telefono
      telefono = this.formatTelefono(telefono); // = 722-681-07-75
      // Actualizo el valor del telefono en el formulario sin emitir el evento
      this.invitadoForm.patchValue({telefono}, { emitEvent: false});
    }
  }
}
