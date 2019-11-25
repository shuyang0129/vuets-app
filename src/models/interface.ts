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
  _id?: string;
}

export interface IUserManage {
  avatar: string;
  date: string;
  des: string;
  key: string;
  pwd: string;
  role: string;
  username: string;
  __v?: number;
  _id: string;
}

export interface IAddAccount {
  key: string;
  role: string;
  username: string;
  des: string;
}

export interface IRoleAccount {
  key: string;
  role: string;
  des: string;
}
