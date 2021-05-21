import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { SessionDetailService } from "../pages/session-detail/session-detail.service";

@Injectable({
  providedIn: "root",
})
export class UserData {
  favorites: string[];
  isAdmin: boolean = false;
  HAS_LOGGED_IN = "hasLoggedIn";
  HAS_SEEN_TUTORIAL = "hasSeenTutorial";

  constructor(
    public storage: Storage,
    private httpClient: HttpClient,
    private sessionDetailService: SessionDetailService
  ) {
    let allImages = [];

    this.sessionDetailService.getAllImages().subscribe((res) => {
      this.favorites = [];
      allImages = res["result"];

      allImages.forEach((element) => {
        if (element.favorite) {
          this.addFavorite(element.id);
        }
      });
    });
  }

  hasFavorite(sessionName: string): boolean {
    return this.favorites.indexOf(sessionName) > -1;
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent("user:login"));
    });
  }

  saveToLocalStorage(username, userId) {
    console.log(username)
    console.log("in userData")

    if (username == "admin@admin.com") {
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }

    const userData = {
      username: username,
      userId: userId,
      isAdmin: this.isAdmin
    };

    console.log(this.isAdmin)
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent("user:signup"));
    });
  }

  logout(): Promise<any> {
    const userData = {
      username: "",
      userId: "",
      isAdmin: false
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    return this.storage
      .remove(this.HAS_LOGGED_IN)
      .then(() => {
        return this.storage.remove("username");
      })
      .then(() => {
        window.dispatchEvent(new CustomEvent("user:logout"));
      });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set("username", username);
  }

  getUsername(): Promise<string> {
    return this.storage.get("username").then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
