export namespace UserModel {
  export interface CreateUser {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  }

  export interface LoginUser {
    email: string;
    password: string;
  }
}