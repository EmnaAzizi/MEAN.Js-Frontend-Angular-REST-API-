import { Component, OnInit } from "@angular/core";

import { MarsipularmiCService } from "../../Servers/marsipularmi-c.service";
import { Marisupilami } from "../../UserClass/Marisupilami";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  id: number;
  errors = [];
  race: string;
  famille: string;
  age: string;
  nourriture: string;
  username: string;
  nom: string;
  user: Marisupilami;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _userService: MarsipularmiCService
  ) {
    this.id = this.route.snapshot.params["id"];
    this.username = this.route.snapshot.params["username"];
  }

  editUser(race, age, nourriture, famille, nom) {
    let user: any;
    console.log("this is id", this.id);
    user = {
      famille: famille,
      age: age,
      nourriture: nourriture,
      race: race,
      nom: nom
    };
    this._userService.updateUser(user, this.id).subscribe(result => {
      this.router.navigate(["/users/" + this.username]);
    });
  }

  ngOnInit() {
    this._userService.getUser(this.id).subscribe(userr => {
      this.user = userr;
    });
  }
}
