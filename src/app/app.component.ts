import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  ngOnInit(): void {}

  getSelectedItem($event: string) {
    console.log($event);
  }
}
