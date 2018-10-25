import { Component, OnInit } from "@angular/core";

import { MarsipularmiCService } from "../../Servers/marsipularmi-c.service";
import { Marisupilami } from "../../UserClass/Marisupilami";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-amis",
  templateUrl: "./amis.component.html",
  styleUrls: ["./amis.component.css"]
})
export class AmisComponent implements OnInit {
  id: string;
  user: Marisupilami;
  errorMessage: string;
  users: any;
  Friend: Array<Marisupilami> = [];
  listFilter: string = "";
  notFriend: Array<Marisupilami> = [];
  constructor(
    private _route: ActivatedRoute,
    private _userService: MarsipularmiCService
  ) {
    this.id = this._route.snapshot.params["id"];
  }

  comparer(otherArray, id) {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return (
            other._id === current._id && current._id !== id && other._id !== id
          );
        }).length == 0
      );
    };
  }

  friends(): Array<Marisupilami> {
    let Myfriends: Array<Marisupilami> = [];
    let user: Marisupilami;
    for (let k of this.users) {
      if (k._id === this.id) {
        user = k;
      }
    }

    for (let i of user.friends) {
      for (let k of this.users) {
        if (k._id === i._id) {
          Myfriends.push(k);
        }
      }
    }

    return Myfriends;
  }
  //not friends of MARSIPULAMI
  notfriends(): Array<Marisupilami> {
    for (let a of this.users) {
      if (a._id === this.id) {
        this.user = a;
      }
    }
    let onlyInA = this.users.filter(
      this.comparer(this.user.friends, this.user._id)
    );
    let onlyInB = this.user.friends.filter(
      this.comparer(this.users, this.user._id)
    );
    let result = onlyInA.concat(onlyInB);
    const index = result.indexOf(this.user);
    result.splice(index, 1);
    return result;
  }

  addUserfriend(ami: Marisupilami) {
    let user: any;
    let friend: any;
    friend = { _id: ami._id };
    this.user.friends.push(friend);
    user = { friends: this.user.friends };
    this._userService.editfriend(user, this.id).subscribe(result => {
      this._userService.getUser(this.id).subscribe(userr => {
        this.user = userr;
        this._userService.getUsers().subscribe(userss => {
          this.users = userss;
          this.notFriend = this.notfriends();
          this.Friend = this.friends();
        });
      });
    });
  }

  deleteUserfriend(ami: Marisupilami) {
    console.log("first thing in delete user friend", this.user.friends);
    let user: any;
    let friend: any;
    let pos: any;
    friend = { _id: ami._id };
    pos = this.user.friends
      .map(function(x) {
        return x._id;
      })
      .indexOf(ami._id);
    console.log("user friends before delete ", this.user.friends);
    console.log("this is pos", pos);
    console.log("friend to delete is ", ami);
    console.log("index of user to delete", pos);
    this.user.friends.splice(pos, 1);
    user = { friends: this.user.friends };
    this._userService.editfriend(user, this.id).subscribe(result => {
      this._userService.getUser(this.id).subscribe(userr => {
        this.user = userr;
        this._userService.getUsers().subscribe(userss => {
          this.users = userss;
          this.notFriend = this.notfriends();
          this.Friend = this.friends();
        });
      });
    });
  }

  ngOnInit() {
    this._userService.getUser(this.id).subscribe(userr => {
      this.user = userr;

      this._userService.getUsers().subscribe(userss => {
        this.users = userss;
        this.notFriend = this.notfriends();
        this.Friend = this.friends();
      });
    });
  }
}
