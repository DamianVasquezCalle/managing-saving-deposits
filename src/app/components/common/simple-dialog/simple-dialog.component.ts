import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SimpleDialogConfig } from './simple-dialog.interface';

@Component({
  selector: 'app-simple-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './simple-dialog.component.html',
  styleUrl: './simple-dialog.component.css'
})
export class SimpleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: SimpleDialogConfig
  ) { }

  onCancel(): void {
    this.dialogRef.close(undefined);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
