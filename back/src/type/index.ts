export interface IBase {
  id: string | number
  ctime?: number
  mtime?: number
}

export interface IUser extends IBase {
  id: string | number
  username: string
  password: string
  email?: string
  phone?: string
  role: string | number
}

export interface IRole extends IBase {
  id: string | number
  name: string
  description: string
}

export interface ILoginUser {
  username: string
  password: string
}

export interface IFace extends IBase {
  name: string
  image: string
  remake: string
}