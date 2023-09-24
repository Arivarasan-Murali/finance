import { Component, DoCheck, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { authenticationService } from "./authentation.service";
import { DataStorageService } from "../data-storage.service";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"],
})
export class AuthenticationComponent implements OnInit, DoCheck {
  public signInButton: boolean = true;
  showBackdrop: boolean = false;
  errorMessage: string = "";
  loggedIn: boolean = false;
  showDeleteConfirmation: boolean = false;

  userName: string;
  email: string;
  photoUrl: string;

  constructor(
    private authService: authenticationService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    const localIdToken: string = localStorage.getItem("idToken");

    if (!!localIdToken && !this.loggedIn) {
      this.authService.getUserData(localIdToken);
      this.loggedIn = true;
    }
    this.authService.errorMsg.subscribe((error) => {
      switch (error) {
        case '"EMAIL_EXISTS"':
          this.errorMessage =
            "The email address is already in use by another account";
          break;
        case '"OPERATION_NOT_ALLOWED"':
          this.errorMessage = "Password sign-in is disabled";
          break;
        case '"TOO_MANY_ATTEMPTS_TRY_LATER"':
          this.errorMessage =
            "We have blocked all requests from this device due to unusual activity. Try again later.";
          break;
        case '"EMAIL_NOT_FOUND"':
          this.errorMessage =
            "There is no user record corresponding to this identifier. The user may have been deleted.";
          break;
        case '"INVALID_PASSWORD"':
          this.errorMessage = "The password is invalid";
          break;
        case '"USER_DISABLED"':
          this.errorMessage =
            "The user account has been disabled by an administrator.";
          break;
        case '"INVALID_EMAIL"':
          this.errorMessage = "The email address is badly formatted.";
          break;
        case '"EXPIRED_OOB_CODE"':
          this.errorMessage = "The action code has expired.";
          break;
        case '"INVALID_OOB_CODE"':
          this.errorMessage = "The action code is invalid.";
          break;
        case '"WEAK_PASSWORD"':
          this.errorMessage = "The password must be 6 characters long or more.";
          break;
        case '"INVALID_ID_TOKEN"':
          {
            this.errorMessage =
              "The user's credential is no longer valid. The user must sign in again.";
            this.authService.signOut();
            localStorage.removeItem("idToken");
            this.loggedIn = false;
          }
          break;
        default:
          this.errorMessage =
            "Something went wrong, try checking the connection or try again later";
          break;
      }
      this.showBackdrop = true;
    });
  }

  ngDoCheck(): void {
    console.log("authentication: ngDoCheck");
    console.log(
      "this.dataStorage.userDetails.name - " + this.dataStorage.userDetails.name
    );
    console.log(
      "this.dataStorage.userDetails.email - " +
        this.dataStorage.userDetails.email
    );
    console.log(
      "this.dataStorage.userDetails.photoUrl - " +
        this.dataStorage.userDetails.photoUrl
    );
    this.userName = this.dataStorage.userDetails.name;
    this.email = this.dataStorage.userDetails.email;
    this.photoUrl = this.dataStorage.userDetails.photoUrl;
  }

  auth(f: NgForm) {
    const formData = f.value;
    if (this.signInButton) {
      this.authService.signIn(formData.email, formData.password);
    } else {
      this.authService.signUp(formData.name, formData.email, formData.password);
    }
  }

  updateProfile() {
    this.authService.updateProfile(
      this.dataStorage.userDetails.idToken,
      this.dataStorage.userDetails.name,
      this.dataStorage.userDetails.photoUrl,
      "delete"
    );
  }

  deleteProfile() {
    this.authService.deleteAccount();
    this.showDeleteConfirmation = false;
  }

  backdropResponse() {
    this.showBackdrop = false;
  }
}
