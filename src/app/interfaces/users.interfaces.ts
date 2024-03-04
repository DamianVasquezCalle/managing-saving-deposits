export interface UserElement {
  id: number;
  name: string;
  lastname: string;
  username: string;
  role: UserRole;
}

export interface UserFormElement extends UserElement {
  action: BasicAction | undefined;
  password: string;
}

export enum BasicAction {
  Create,
  Update,
  Delete
}

export enum UserRole {
  Regular,
  Manager,
  Admin
}
