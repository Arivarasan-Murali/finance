import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  public loggedIn: boolean = false;
  public manageData: boolean = false;

  userDetails: {
    name: string;
    email: string;
    photoUrl: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
  } = {
    name: "",
    email: "",
    photoUrl: "",
    idToken: "",
    refreshToken: "",
    expiresIn: "",
  };

  constructor() {}

  addUserData(
    name: string,
    email: string,
    photoUrl: string,
    idToken: string,
    refreshToken: string,
    expiresIn: string
  ) {
    this.userDetails = {
      name: name,
      email: email,
      photoUrl: photoUrl,
      idToken: idToken,
      refreshToken: refreshToken,
      expiresIn: expiresIn,
    };
    this.loggedIn = true;
  }
}
