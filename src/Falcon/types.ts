export interface IUser {
  identifier: string;
  email: string;
  name: string;
  cellphone: string;
  password?: string;
  amount: string;
  createdAt: string;
  investedValue: number;
  loanValue: number;
}

export interface IAuthError {
  status: number;
  message: string;
}
export interface IAuthResponse {
  status: number;
  token: string;
}

export interface IError {
  code: number;
  message: string;
}
export interface IResponse extends IAuthError {}
