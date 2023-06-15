import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'bus-route';
  options: string[] = ['Airport', 'Uttara', 'Banani'];
  dataSource: any;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getSelectedItem($event: string) {
    console.log($event);
  }

  openAddEditForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDelete(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._snackBarService.openSnackBar(`Employee with id ${id} deleted`);
        this.getEmployeeList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
}
