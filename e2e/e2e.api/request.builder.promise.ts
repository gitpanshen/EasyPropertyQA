import * as request from 'request';

class RequestBuilder {
  private options: any = {};

  constructor(url: string) {
    this.options.url = url;
    this.options.json = true;
    this.options.simple = true;
    this.options.resolveWithFullResponse = false;
  }

  public header(header: string, value: string): RequestBuilder {
    let headers = null;
    if (!this.options.headers) {
      headers = {};
      this.options.headers = headers;
    } else {
      headers = this.options.headers;
    }
    headers[header] = value;

    return this;
  }

  public resolveWithFullResponse(): RequestBuilder {
    this.options.simple = false;
    this.options.resolveWithFullResponse = true;
    return this;
  }

  public authenticationToken(token: string): RequestBuilder {
    this.header('Authorization', 'Bearer ' + token);
    return this;
  }

  public contentType(contentType: string): RequestBuilder {
    return this.header('Content-Type', contentType);
  }

  public binary(): RequestBuilder {
    this.options.encoding = null;
    delete this.options.json;
    return this;
  }

  public json(json: boolean): RequestBuilder {
    this.options.json = json;
    return this;
  }

  public body(body: any): RequestBuilder {
    this.options.body = body;
    return this;
  }

  public jsonBody(body: any): RequestBuilder {
    this.options.body = body;
    this.options.json = true;
    return this;
  }

  public get(): Promise<request.Response | any> {
    return new Promise((resolve, reject) => {
      request.get(this.options, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        if (this.options.resolveWithFullResponse) {
          return resolve(response);
        } else {
          if (response.statusCode !== 200) {
            return reject(new Error(`Got status code ${response.statusCode} [(${JSON.stringify(body)}]`));
          }
          return resolve(body);
        }
      });
    });
  }

  public post(): Promise<request.Response | any> {
    return new Promise((resolve, reject) => {
      request.post(this.options, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        if (this.options.resolveWithFullResponse) {
          return resolve(response);
        } else {
          if (response.statusCode !== 200) {
            return reject(new Error(`Got status code ${response.statusCode} [${JSON.stringify(body)}]`));
          }
          return resolve(body);
        }
      });
    });
  }

  public put(): Promise<request.Response | any> {
    return new Promise((resolve, reject) => {
      request.put(this.options, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        if (this.options.resolveWithFullResponse) {
          return resolve(response);
        } else {
          if (response.statusCode !== 200) {
            return reject(new Error(`Got status code ${response.statusCode} [${JSON.stringify(body)}]`));
          }
          return resolve(body);
        }
      });
    });
  }

  public patch(): Promise<request.Response | any> {
    return new Promise((resolve, reject) => {
      request.patch(this.options, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        if (this.options.resolveWithFullResponse) {
          return resolve(response);
        } else {
          if (response.statusCode !== 200) {
            return reject(new Error(`Got status code ${response.statusCode} [${JSON.stringify(body)}]`));
          }
          return resolve(body);
        }
      });
    });
  }

  public delete(): Promise<request.Response | any> {
    return new Promise((resolve, reject) => {
      request.delete(this.options, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        if (this.options.resolveWithFullResponse) {
          return resolve(response);
        } else {
          if (response.statusCode !== 200) {
            return reject(new Error(`Got status code ${response.statusCode} [${JSON.stringify(body)}]`));
          }
          return resolve(body);
        }
      });
    });
  }
}

const requestBuilder = (url: string): RequestBuilder => {
  const requestBuilder: RequestBuilder = new RequestBuilder(url);
  return requestBuilder;
};

export const HTTP_STATUS_OK = 200;

export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_FORBIDDEN = 403;
export const HTTP_STATUS_NOT_FOUND = 404;

export const HTTP_INTERNAL_SERVER_ERROR = 500;

export { requestBuilder };
