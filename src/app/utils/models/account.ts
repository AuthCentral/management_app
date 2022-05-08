import {UserRoles} from "./constants/user-roles";

export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string | null,
    public lastName: string | null,
    public login: string | null,
    public imageUrl: string | null
  ) {

  }
}
