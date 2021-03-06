import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem("user")) {
      // logged in so return true
      console.log(JSON.parse(localStorage.getItem("user")).username);

      return true;
    }
    console.log(localStorage.getItem("user"));
    // not logged in so redirect to login page
    this.router.navigate(["/login"]);
    return false;
  }
}
