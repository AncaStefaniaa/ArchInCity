import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import { UserOptions } from "../../interfaces/user-options";

import { SignUpService } from "./signup.service";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  styleUrls: ["./signup.scss"],
})
export class SignupPage {
  signup: UserOptions = { username: "", password: "", email: "" };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    private signUpService: SignUpService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    this.signUpService.signUpUser(this.signup);
    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.router.navigateByUrl("/app/tabs/schedule");
    }
  }
}
