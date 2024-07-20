import { ClientError, FetchError, ServerError } from "./errors";

export type CustomError = ClientError | ServerError | FetchError;

export type Location = {
   city: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
}

export type PublicCase = {
  title: string;
  description: string;
  filepaths: string[];
  submitter: string;
} & Location;

export type User = {
  email: string;
  password: string;
  name: string;
  lastname: string;
  DPI: string;
  phone_number: string;
  _id?: string;
}

export type Credentials = {
  email: string;
  password: string;
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
