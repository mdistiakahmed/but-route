import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  education: string[] = ['SSC', 'HSC', 'Diploma', 'Graduate'];
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _empService: EmployeeService,
    private _snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(async () => this.onCloseClick());
  }

  onCloseClick() {
    this.dialogRef.close();
    return true;
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._snackBarService.openSnackBar('Employee Updated');
              this.dialogRef.close(true);
              return true;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._snackBarService.openSnackBar('Employee Added');
            this.dialogRef.close(true);
            return true;
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
