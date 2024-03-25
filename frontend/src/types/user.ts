export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
}

export enum RoleEnum {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: RoleEnum;
  city: string;
  gender: GenderEnum;
  phone: string;
  photo: string;
  state: string;
  zipcode: string;
  address: string;
  is_active: boolean;
}

export type TStatus = "success" | "failure";

export interface IUserResponse {
  access_token: string;
  refresh_token: string;
}

export interface IUserBody {
  email: string;
  password: string;
}

export interface IUserSignUpBody {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  passwordConfirm: string;
}
