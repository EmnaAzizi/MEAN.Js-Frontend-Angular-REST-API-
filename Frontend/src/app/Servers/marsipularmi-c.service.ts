import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { Marisupilami } from "../UserClass/Marisupilami";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/do";
import { AuthService } from "./auth.service";

@Injectable()
export class MarsipularmiCService {
  private uri = "http://127.0.0.1:4000/users";

  constructor(private http: Http, private authenticationService: AuthService) {}

  addUser(user: Marisupilami) {
    return this.http
      .post("http://127.0.0.1:4000/users", user)
      .map(res => res.json())
      .do(data => console.log("User add: "));
  }

  getUser(id): Observable<any> {
    return this.http
      .get(this.uri + "/" + id)
      .map(res => <Marisupilami>res.json())
      .do(data => console.log("All: "));
  }

  getUsers(): Observable<any[]> {
    return this.http
      .get(this.uri)
      .map(res => <Marisupilami[]>res.json())
      .do(data => console.log("All: "));
  }

  updateUser(post: Marisupilami, id) {
    console.log("helllooo in update");
    return this.http
      .post(this.uri + "/update/" + id, post)
      .map(res => res.json());
  }
  //ADD  OR DELETE A MARSIPULAMI FROM FRIENDS LIST
  editfriend(post: Marisupilami, id) {
    console.log("helllooo in addfriend");
    return this.http
      .post(this.uri + "/addfriend/" + id, post)
      .map(res => res.json());
  }
}
