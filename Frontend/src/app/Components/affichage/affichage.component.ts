import { Component, OnInit } from "@angular/core";
import { Marisupilami } from "../../UserClass/Marisupilami";
import { MarsipularmiCService } from "../../Servers/marsipularmi-c.service";
import { AuthService } from "src/app/Servers/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-affichage",
  templateUrl: "./affichage.component.html",
  styleUrls: ["./affichage.component.css"]
})
export class AffichageComponent implements OnInit {
  constructor(
    private _user: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: MarsipularmiCService
  ) {
    this.username = this._route.snapshot.params["username"];
  }

  users: Array<Marisupilami> = [];
  errorMessage: string;
  username: string;
  getUsers() {
    this._userService.getUsers().subscribe(posts => (this.users = posts));
  }

  logout() {
    this._user.logout().subscribe(
      data => {
        console.log(data);
        localStorage.clear();
        this._router.navigate(["/login"]);
      },
      error => console.error(error)
    );
  }
  ngOnInit() {
    this.getUsers();
  }
}
