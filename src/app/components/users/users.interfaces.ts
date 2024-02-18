export interface UserElement {
  id: string;
  name: string;
  lastname: string;
  username: string;
  role: Role;
}

export interface UserFormElement extends UserElement {
  action: BasicAction | undefined;
}

export enum BasicAction {
  Create,
  Update,
  Delete
}

export enum Role {
  Regular,
  Manager,
  Admin
}
