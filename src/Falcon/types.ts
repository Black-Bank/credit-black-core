export interface IUser {
  email: string;
  name: string;
  lastname: string;
  password: string;
  amount: string;
}

export interface IAuthError {
  status: number;
  message: string;
}

export interface IResponse extends IAuthError {}
