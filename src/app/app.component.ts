import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";

import { MenuController, Platform, ToastController } from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Storage } from "@ionic/storage";

import { UserData } from "./providers/user-data";

import "@ionic/pwa-elements";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: "Discover",
      url: "/app/tabs/discover",
      icon: "globe",
      visible: false,
    },
    {
      title: "My Buildings",
      url: "/app/tabs/my-buildings",
      icon: "business",
      visible: false,
    },
    {
      title: "Top Buildings",
      url: "/top",
      icon: "flame",
      visible: false,
    },
    {
      title: "Architecture over time",
      url: "/app/tabs/over-time",
      icon: "hourglass",
      visible: true,
    },
    {
      title: "Map",
      url: "/app/tabs/map",
      icon: "map",
      visible: false,
    },
    {
      title: "About",
      url: "/app/tabs/about",
      icon: "information-circle",
      visible: true,
    },
  ];

  loggedIn = false;
  dark = false;
  img = "../assets/img/arch.png";
  user: string;
  isAdmin: boolean = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("userData")).username;
    this.isAdmin = JSON.parse(localStorage.getItem("userData")).isAdmin;
    // if (this.user == "admin@admin.com") {
    //   this.isAdmin = true;
    // }
    console.log(this.isAdmin);
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async (res) => {
      const toast = await this.toastCtrl.create({
        message: "Update available!",
        position: "bottom",
        buttons: [
          {
            role: "cancel",
            text: "Reload",
          },
        ],
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then((loggedIn) => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
      this.isAdmin = JSON.parse(localStorage.getItem("userData")).isAdmin;
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
      return this.router.navigateByUrl("/app/tabs/over-time");
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set("ion_did_tutorial", false);
    this.router.navigateByUrl("/tutorial");
  }
}
