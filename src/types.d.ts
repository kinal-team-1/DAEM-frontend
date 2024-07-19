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

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
