import { injectable } from "@joist/di";

@injectable()
export class HttpService {
  fetch(input: RequestInfo | URL, init?: RequestInit) {
    return fetch(input, init);
  }
}
