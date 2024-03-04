import type { UserElement, UserFormElement } from '../../interfaces/users.interfaces';

import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
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
import { BasicAction, UserRole } from '../../interfaces/users.interfaces';
import { UserRolePipe } from "../../pipes/userRole/user-role.pipe";
import { SimpleDialogComponent } from '../common/simple-dialog/simple-dialog.component';
import { SimpleDialogConfig } from '../common/simple-dialog/simple-dialog.interface';
import { UsersService } from '../../services/users/users.service';
import { Sort } from '../../interfaces/sort.interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    UserRolePipe
  ]
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<UserElement>;
  displayedColumns: string[] = ['name', 'lastname', 'username', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currentPage = 1;
  pageSize = 20;
  sortOrder = Sort.ASC;

  private _destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private userService: UsersService
  ) {
    this.dataSource = new MatTableDataSource([] as Array<UserElement>);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.subscriptionsInit();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  subscriptionsInit(): void {
    this.userService.getUsers(this.pageSize, this.currentPage, this.sortOrder)
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(users => {
        this.dataSource.data = [...users];
      });
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
      data: { id: 0, action: BasicAction.Create, name: '', lastname: '', username: '', role: UserRole.Regular, password: '' },
      height: 'auto',
      width: '600px'
    });
    newUserDialog.afterClosed().subscribe(result => {
      if (!result) return;

      this.userService.postUser(result)
        .subscribe(newUser => {
          this.dataSource.data = [...this.dataSource.data, newUser];
        });
    });
  }

  onEditUser(id: number) {
    const users = this.dataSource.data;
    const targetUserIndex = users.findIndex(user => user.id === id);
    if (targetUserIndex < 0) return;

    const newUserDialog = this.dialog.open<UserFormComponent, UserFormElement, UserFormElement>(UserFormComponent, {
      data: { ...users[targetUserIndex], action: BasicAction.Update, password: '' },
      height: 'auto',
      width: '600px'
    });
    newUserDialog.afterClosed().subscribe(result => {
      if (!result) return;

      this.userService.putUser(result)
        .subscribe(updatedUser => {
          users[targetUserIndex] = updatedUser;
          this.dataSource.data = [...users];
        });
    });
  }

  onDeleteUser(id: number) {
    const users = [...this.dataSource.data];
    const targetUser = users.find(user => user.id === id);
    if (!targetUser) return;

    const newUserDialog = this.dialog.open<SimpleDialogComponent, SimpleDialogConfig, boolean>(SimpleDialogComponent, {
      data: {
        title: 'Confirm User Deletion',
        content: `Are you sure of delete user '${targetUser.name} ${targetUser.lastname}'?`
      },
      height: 'auto',
      width: '350px'
    });
    newUserDialog.afterClosed().subscribe(result => {
      if (!result) return;

      this.userService.deleteUser(id)
        .subscribe(() => {
          this.dataSource.data = [...users.filter(x => x.id !== id)];
        });
    });
  }
}
