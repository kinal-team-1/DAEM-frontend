// eslint-disable-next-line max-classes-per-file
export class ClientError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "ClientError";
  }
}

export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.errors = [];
    this.name = "ServerError";
  }
}

export class FetchError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 0;
    this.errors = [];
    this.name = "FetchError";
  }
}
