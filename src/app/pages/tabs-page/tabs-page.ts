import { Component } from "@angular/core";
import { UserData } from "../../providers/user-data";
@Component({
  templateUrl: "tabs-page.html",
})
export class TabsPage {
  loggedIn: boolean = false;
  constructor(public userData: UserData) {}

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }
  checkLoginStatus() {
    return this.userData.isLoggedIn().then((loggedIn) => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener("user:login", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:signup", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:logout", () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      console.log("loggedOut");
    });
  }
}
