import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { constants } from "../constants";
import { environment } from "src/environments/environment.prod";
import {
  sign_Up_In_Response,
  updateProfileResponse,
  getUserDataResponse,
} from "../modal";
import { DataStorageService } from "../data-storage.service";

@Injectable({
  providedIn: "root",
})
export class authenticationService {
  userSubscription: Subject<string> = new Subject<string>();
  errorMsg: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataStorage: DataStorageService
  ) {}

  signUp(name: string, email: string, password: string) {
    const url =
      constants.signUpWithEmailPassword + environment.firebaseConfig.apiKey;
    this.http
      .post<sign_Up_In_Response>(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .subscribe(
        (data) => {
          this.updateProfile(data.idToken, name);
          localStorage.setItem("idToken", data.idToken);
          this.router.navigate(["home"]);
          localStorage.setItem("idToken", data.idToken);
        },
        (error) => {
          this.errorMsg.next(JSON.stringify(error.error.error.message));
        }
      );
  }

  signIn(email: string, password: string) {
    const url =
      constants.signInWithEmailPassword + environment.firebaseConfig.apiKey;
    this.http
      .post<sign_Up_In_Response>(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .subscribe(
        (data) => {
          localStorage.setItem("idToken", data.idToken);
          this.router.navigate(["home"]);
          this.userSubscription.next(data.displayName);
          this.dataStorage.addUserData(
            data.displayName,
            data.email,
            "",
            data.idToken,
            data.refreshToken,
            data.expiresIn
          );
          this.dataStorage.loggedIn = true;
        },
        (error) => {
          this.errorMsg.next(JSON.stringify(error.error.error.message));
        }
      );
  }

  getUserData(idToken: string) {
    const url = constants.getUserData + environment.firebaseConfig.apiKey;
    this.http.post<getUserDataResponse>(url, { idToken: idToken }).subscribe(
      (data) => {
        this.userSubscription.next(data.users[0].displayName);
        this.dataStorage.addUserData(
          data.users[0].displayName,
          data.users[0].email,
          data.users[0].photoUrl,
          idToken,
          data.users[0].localId,
          data.users[0].validSince
        );
        this.dataStorage.loggedIn = true;
        if (this.dataStorage.manageData == false) {
          this.router.navigate(["home"]);
        }
      },
      (error) => {
        console.log(
          "getUserData error -> JSON.stringify(error.statusText) - " +
            JSON.stringify(error.statusText)
        );
        if (JSON.stringify(error.statusText) == '"Unknown Error"') {
          console.log("getUserData-error-If");
          this.errorMsg.next(JSON.stringify(error.statusText));
        } else {
          console.log("getUserData-error-else");
          console.log(
            "JSON.stringify(error.error.error.message) - " +
              JSON.stringify(error.error.error.message)
          );
          this.errorMsg.next(JSON.stringify(error.error.error.message));
        }
      }
    );
  }

  updateProfile(
    idToken: string,
    displayName?: string,
    photoUrl?: string,
    deleteAttribute?: string
  ) {
    const url = constants.updateProfile + environment.firebaseConfig.apiKey;
    this.http
      .post<updateProfileResponse>(url, {
        idToken: idToken,
        displayName: displayName,
        photoUrl: photoUrl,
        deleteAttribute: deleteAttribute,
        returnSecureToken: true,
      })
      .subscribe(
        (data) => {
          this.dataStorage.addUserData(
            data.displayName,
            data.email,
            data.photoUrl,
            data.idToken,
            data.refreshToken,
            data.expiresIn
          );
          this.userSubscription.next(data.displayName);
          this.dataStorage.loggedIn = true;
        },
        (error) => {
          this.errorMsg.next(
            JSON.stringify(error.error.error.errors[0].message)
          );
        }
      );
  }

  signOut() {
    this.dataStorage.userDetails = {
      name: null,
      email: null,
      photoUrl: null,
      idToken: null,
      refreshToken: null,
      expiresIn: null,
    };
    localStorage.removeItem("idToken");
    this.dataStorage.loggedIn = false;
  }

  deleteAccount() {
    const url = constants.deleteAccount + environment.firebaseConfig.apiKey;
    const idToken = localStorage.getItem("idToken");
    this.http
      .post(url, {
        idToken: idToken,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.signOut();
        },
        (error) => {
          this.errorMsg.next(
            JSON.stringify(error.error.error.errors[0].message)
          );
        }
      );
  }
}
