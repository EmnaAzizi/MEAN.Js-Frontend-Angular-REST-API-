import { Component, OnInit } from "@angular/core";

import { MarsipularmiCService } from "../../Servers/marsipularmi-c.service";
import { Marisupilami } from "../../UserClass/Marisupilami";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-addnew",
  templateUrl: "./addnew.component.html",
  styleUrls: ["./addnew.component.css"]
})
export class AddnewComponent implements OnInit {
  username: string;
  password: string;
  race: string;
  famille: string;
  nourriture: string;
  age: string;
  errors: string;
  nom: string;
  id: string;
  user: Marisupilami;
  ami: Marisupilami;
  title: string;

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private _userService: MarsipularmiCService
  ) {
    this.id = this._route.snapshot.params["id"];
  }

  addUserfriend(ami: Marisupilami) {
    let user: any;
    let friend: any;
    friend = { _id: ami._id };
    this.user.friends.push(friend);
    user = { friends: this.user.friends };
    this._userService.editfriend(user, this.id).subscribe();
  }

  addUser(username, password, race, famille, nourriture, age, nom) {
    let user: any;

    user = {
      username: username,
      nom: nom,
      password: password,
      race: race,
      famille: famille,
      nourriture: nourriture,
      age: age
    };
    this._userService.addUser(user).subscribe(result => {
      if (this.id !== "none") {
        console.log("in if add user");
        this.ami = result;
        this.addUserfriend(this.ami);
        this.router.navigate(["/Amis/" + this.id]);
      } else {
        this.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit() {
    this._userService.getUser(this.id).subscribe(userr => {
      this.user = userr;
    });

    if (this.id === "none") {
      this.title = " S'inscrire ";
    } else {
      this.title = "Ajouter un nouveau marsupilami ami ";
    }
  }
}
