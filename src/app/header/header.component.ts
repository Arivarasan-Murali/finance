import { Component, OnInit } from "@angular/core";

import { authenticationService } from "../authentication/authentation.service";
import { DataStorageService } from "../data-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userName: string = "Login";
  photoUrl: string =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  showUserMenu: boolean = false;

  constructor(
    private authService: authenticationService,
    private dataStorage: DataStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("ngOnInit");
    this.authService.userSubscription.subscribe((name) => {
      this.userName = name;
      this.showUserMenu = false;
    });
  }

  login() {
    if (this.dataStorage.loggedIn) {
      this.showUserMenu = !this.showUserMenu;
    } else {
      this.router.navigate(["auth"]);
    }
  }

  manageData() {
    this.dataStorage.manageData = true;
    this.showUserMenu = false;
  }

  logout() {
    this.authService.signOut();
    this.userName = "Login";
    this.showUserMenu = false;
    this.router.navigate(["home"]);
  }
}
