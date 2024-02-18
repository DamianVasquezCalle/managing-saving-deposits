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
import { BasicAction, Role } from './users.interfaces';

import type { UserElement, UserFormElement } from './users.interfaces';

const ELEMENT_DATA: UserElement[] = [
  { id: uuidv4(), name: 'Hydrogen', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Helium', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Lithium', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Beryllium', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Boron', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Carbon', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Nitrogen', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Oxygen', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Fluorine', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Neon', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Beryllium', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Boron', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Carbon', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Nitrogen', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Oxygen', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Fluorine', lastname: 'LAstnames', username: '', role: Role.Regular },
  { id: uuidv4(), name: 'Neon', lastname: 'LAstnames', username: '', role: Role.Regular },
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatGridListModule, MatIconModule, MatSortModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements AfterViewInit {
  dataSource: MatTableDataSource<UserElement>;
  displayedColumns: string[] = ['name', 'lastname', 'username', 'role'];

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

  addData() {
    const newUserDialog = this.dialog.open<UserFormComponent, UserFormElement, UserFormElement>(UserFormComponent, {
      data: { id: uuidv4(), action: BasicAction.Create, name: '', lastname: '', username: '', role: Role.Regular },
      height: 'auto',
      width: '600px'
    });
    newUserDialog.afterClosed().subscribe(result => {
      if (!result) return;
      this.dataSource.data = [...this.dataSource.data, result];
    });
  }

  // removeData() {
  //   this.dataToDisplay = this.dataToDisplay.slice(0, -1);
  //   this.dataSource.setData(this.dataToDisplay);
  // }
}
