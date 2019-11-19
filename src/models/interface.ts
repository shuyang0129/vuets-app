export interface ILogin {
  username: string;
  pwd: string;
  autoLogin: boolean;
}

export interface IPassword {
  username: string;
  email: string;
}

export interface IChangePassword {
  username: string;
  pwd: string;
}

export interface IUSER {
  id: string;
  username: string;
  avatar: string;
  key: string;
  iat: number;
  exp: number;
}

export interface IDialogData {
  count: string;
  date: string;
  level: string;
  title: string;
  type: string;
}
