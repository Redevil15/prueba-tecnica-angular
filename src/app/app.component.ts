import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvitadoAddEditComponent } from './invitado-add-edit/invitado-add-edit.component';
import { InvitadoService } from './services/invitado.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // Declaracion de variables
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'birthdate',
    'gender',
    'action',
  ];
  dataSource!: MatTableDataSource<any>; // Variable para almacenar la lista de invitados, a la cual se asigna el valor mas tarde
  
  // Decoradores para obtener refrencias a los componentes hijos paginator y sort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    // Constructor para inyectar servicios y componentes
  constructor(
    private _dialog: MatDialog,
    private _invitadoService: InvitadoService,
  ) { }

  // Se ejecuta al iniciar el componente, en este caso estoy haciendo una peticion para obtener la lista de invitados
  ngOnInit() {
    this.getInvitados();
  }

  // Método para abrir el diálogo para agregar un invitado
  openAddEditInvitado() {
    const dialogRef = this._dialog.open(InvitadoAddEditComponent); // Abro el dialogo
    // Me suscribo al cierre del dialogo para actualizar la lista de invitados
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) {
          this._invitadoService.openSnackBar('Invitado agregado exitosamente!', 'Cerrar')
          this.getInvitados();
        }
      }
    })
  }

  // Si doy en el icono de editar, abro el dialogo con los datos del invitado
  openEditInvitado(data: any) {
    const dialogRef = this._dialog.open(InvitadoAddEditComponent, {
      data, // abro el dialogo con los datos del invitado
    });
    // Me suscribo al cierre del dialogo para actualizar la lista de invitados
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) {
          this._invitadoService.openSnackBar('Invitado actualizado exitosamente!', 'Cerrar')
          this.getInvitados();
        }
      }
    })    
  }

  // Function to get all invitados
  // Se ejecuta cuando se carga el componente
  getInvitados() {
    this._invitadoService.getInvitadoList().subscribe(
      (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
          
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Function to filter the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Obtengo el valor del filtro
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Aplico el filtro
    
    // Si hay paginacion, voy a la primera pagina
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

    }
  }

  // Método para eliminar un invitado
  deleteInvitado(id: number) {
    this._invitadoService.deleteInvitado(id).subscribe(
      (res) => {
        this._invitadoService.openSnackBar('Invitado borrado exitosamente!', 'Cerrar')
        this.getInvitados();
      },
      (error) => {
        this._invitadoService.openSnackBar('Error al borrar invitado', 'Cerrar')
        console.log(error);
      }
    )
  }
}
