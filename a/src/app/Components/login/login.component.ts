import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { AuthService } from "src/app/Servers/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.required)
  });
  constructor(private _router: Router, private authService: AuthService) {}

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      console.log("Invalid");

      return;
    }

    // console.log(JSON.stringify(this.loginForm.value));
    this.authService.login(JSON.stringify(this.loginForm.value)).subscribe(
      data => {
        console.log(data, "this is data");

        localStorage.setItem("user", JSON.stringify(this.loginForm.value));
        this._router.navigate([
          "/users/" + this.loginForm.get("username").value
        ]);
      },
      error => console.error(error)
    );
  }
}
