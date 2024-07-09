import {
  ClientError,
  FetchError,
  ServerError,
} from "./errors";

export type CustomError = ClientError | ServerError | FetchError;
