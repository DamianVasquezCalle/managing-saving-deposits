import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserFormElement, BasicAction } from '../users/users.interfaces';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  actions = BasicAction;
  validForm = false;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent, UserFormElement>,
    @Inject(MAT_DIALOG_DATA) public data: UserFormElement,
  ) { }

  onClick(): void {
    this.dialogRef.close(undefined);
  }

  validateForm(): void {
    this.validForm = !!this.data.name && !!this.data.lastname && !!this.data.username;
  }
}
