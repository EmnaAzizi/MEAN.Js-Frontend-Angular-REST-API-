import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(body: any) {
    return this._http.post("http://127.0.0.1:4000/users/login", body, {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

  logout() {
    return this._http.get("http://127.0.0.1:4000/users/logout", {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
