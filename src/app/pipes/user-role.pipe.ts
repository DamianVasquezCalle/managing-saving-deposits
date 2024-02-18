import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../components/users/users.interfaces';

@Pipe({
  name: 'userRole',
  standalone: true
})
export class UserRolePipe implements PipeTransform {

  transform(value: UserRole): string {
    return value === UserRole.Admin ? 'Admin' : value === UserRole.Manager ? 'Manager' : 'Regular';
  }

}
