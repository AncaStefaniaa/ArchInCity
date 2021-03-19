import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import { UserOptions, UserLogin } from "../../interfaces/user-options";

import { LogInService } from "./login.service";
@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"],
})
export class LoginPage {
  login: UserLogin = { email: "", password: "" };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private logInService: LogInService
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;
    this.logInService.logInUser(this.login);
    if (form.valid) {
      this.userData.login(this.login.email);
      this.router.navigateByUrl("/app/tabs/schedule");
    }
  }

  onSignup() {
    this.router.navigateByUrl("/signup");
  }
}
