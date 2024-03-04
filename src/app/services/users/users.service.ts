import { Injectable } from '@angular/core';
import { NSwagService, User } from '../generated-services';
import { Sort } from '../../interfaces/sort.interfaces';
import { Observable, map } from 'rxjs';
import { UserElement, UserFormElement } from '../../interfaces/users.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private service: NSwagService) { }

  getUsers(size = 20, page = 1, sort = Sort.ASC): Observable<UserElement[]> {
    return this.service.apiUsersSizePageSort(size, page, sort)
      .pipe(
        map(x => x.map(this.userToUserElement))
      );
  }

  getUserById(id: number): Observable<UserElement> {
    return this.service.apiUsersGet(id)
      .pipe(
        map(this.userToUserElement)
      );
  }

  postUser(user: UserFormElement): Observable<UserElement> {
    return this.service.apiUsersPost(this.userElementToUser(user))
      .pipe(
        map(this.userToUserElement)
      );
  }

  putUser(user: UserFormElement): Observable<UserElement> {
    return this.service.apiUsersPut(user.id, this.userElementToUser(user))
      .pipe(
        map(this.userToUserElement)
      );
  }

  deleteUser(id: number): Observable<void> {
    return this.service.apiUsersDelete(id);
  }

  private userToUserElement(user: User): UserElement {
    return {
      id: user.id,
      name: user.name!,
      lastname: user.lastname!,
      username: user.email!,
      role: user.role
    };
  }

  private userElementToUser(user: UserFormElement): User {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.username,
      role: user.role,
      password: user.password
    };
  }
}
