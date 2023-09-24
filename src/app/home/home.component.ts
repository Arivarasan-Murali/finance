import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataStorageService } from "../data-storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit() {
    const localIdToken: string = localStorage.getItem("idToken");
    if (localIdToken != null && !this.dataStorage.loggedIn) {
      this.router.navigate(["auth"]);
    }
  }
}
