import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor() { }

  getBaseUrl(baseUrl: string): string {
    return baseUrl ? baseUrl : environment.API_BASE_URL;
  }
}
