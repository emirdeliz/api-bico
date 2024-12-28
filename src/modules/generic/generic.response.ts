export interface IResponseObject<T> {
  error?: Error;
  response?: T;
}

export class ResponseObject<T> implements IResponseObject<T> {
  error?: Error;
  response?: T;

  constructor({ error, response }: IResponseObject<T>) {
    this.error = error;
    this.response = response;
  }
}