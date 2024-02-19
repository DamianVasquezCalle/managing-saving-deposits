import { v4 as uuidv4 } from 'uuid';

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { BasicAction, UserRole } from './users.interfaces';
import { UserRolePipe } from "../../pipes/user-role.pipe";

import type { UserElement, UserFormElement } from './users.interfaces';

const ELEMENT_DATA: UserElement[] = [
  { id: uuidv4(), name: 'Hydrogen', lastname: 'LAstnames', username: 'Hydrogen', role: UserRole.Regular },
  { id: uuidv4(), name: 'Helium', lastname: 'LAstnames', username: 'Helium', role: UserRole.Regular },
  { id: uuidv4(), name: 'Lithium', lastname: 'LAstnames', username: 'Lithium', role: UserRole.Regular },
];

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatGridListModule, MatIconModule, MatSortModule, MatPaginatorModule, UserRolePipe]
})
export class UsersComponent implements AfterViewInit {
  dataSource: MatTableDataSource<UserElement>;
  displayedColumns: string[] = ['name', 'lastname', 'username', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([...ELEMENT_DATA])
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddUser() {
    const newUserDialog = this.dialog.open<UserFormComponent, UserFormElement, UserFormElement>(UserFormComponent, {
      data: { id: uuidv4(), action: BasicAction.Create, name: '', lastname: '', username: '', role: UserRole.Regular },
      height: 'auto',
      width: '600px'
    });
    newUserDialog.afterClosed().subscribe(result => {
      if (!result) return;
      this.dataSource.data = [...this.dataSource.data, result];
    });
  }

  onEditUser(id: string) {
    const users = this.dataSource.data;
    const targetUserIndex = users.findIndex(user => user.id === id);
    if (targetUserIndex < 0) return;

    const newUserDialog = this.dialog.open<UserFormComponent, UserFormElement, UserFormElement>(UserFormComponent, {
      data: { ...users[targetUserIndex], action: BasicAction.Update },
      height: 'auto',
      width: '600px'
    });
    newUserDialog.afterClosed().subscribe(result => {
      if (!result) return;
      users[targetUserIndex] = result;
      this.dataSource.data = [...users];
    });

  }

  onDeleteUser(id: string) {
    console.log("onDeleteUser", id)
    // removeData() {
    //   this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    //   this.dataSource.setData(this.dataToDisplay);
    // }
  }

}
