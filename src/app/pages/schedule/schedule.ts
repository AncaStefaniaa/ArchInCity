import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  IonList,
  // IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  Config,
} from "@ionic/angular";

import { ScheduleFilterPage } from "../schedule-filter/schedule-filter";
import { ConferenceData } from "../../providers/conference-data";
import { UserData } from "../../providers/user-data";
import { architecturalStyles } from "../discover/discover.columns";
import { myBuildings } from "./gallery.columns";
import { GalleryService } from "./gallery.service";
import { levenshtein } from "fast-levenshtein";
import { Observable } from "rxjs";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html",
  styleUrls: ["./schedule.scss"],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild("scheduleList", { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = "";
  segment = "all";
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  userData: any;
  image: any;
  architecturalStyles: any;
  flag: number = 0;
  backupData: any;
  distance$: Observable<number>;
  showSkeleton: boolean = true;

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    // public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    private galleryService: GalleryService
  ) {}

  ngOnInit() {
    this.showSkeleton = true;
    this.updateSchedule(false);
    this.architecturalStyles = architecturalStyles;
    this.ios = this.config.get("mode") === "ios";
    console.log(this.levenshtein("book", "bllk"));
  }

  ionViewWillEnter() {
    this.galleryService.getAllImages().subscribe((res) => {
      this.userData = res["result"];

      this.userData = this.buildJson(this.userData);

      this.flag = 1;
      this.userData.forEach((element) => {
        element["longName"] = this.architecturalStyles[
          parseInt(element.name)
        ].name;
        element["favorite"] = false;
        element.buildings.forEach((build) => {
          let splitAddress = build.address.split(",");
          build["country"] = splitAddress[splitAddress.length - 1];
          this.architecturalStyles[parseInt(build.style)].name;
        });
      });

      this.userData[2].favorite = true;

      this.backupData = this.userData;
      this.showSkeleton = false;
    });

    this.shownSessions = 3;
    this.groups = myBuildings;
  }

  updateSchedule(isFavoritesTab: boolean) {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }
    console.log(isFavoritesTab);
    if (this.flag) {
      if (!isFavoritesTab || this.segment == "all") {
        this.userData = this.backupData.filter((element) => {
          if (element.longName) {
            let longNameLow = element.longName.toLowerCase();
            let queryTextLow = this.queryText.toLowerCase();

            return longNameLow.includes(queryTextLow);
          }
        });
      } else if (isFavoritesTab) {
        this.userData = this.backupData.filter((element) => {
          if (element.favorite == true) {
            return 1;
          }
        });
      }
    }
  }

  buildJson(data) {
    let builtJson = [];
    let grouped = this.groupByStyle(data);

    for (let key in grouped) {
      let value = grouped[key];

      let obj = {
        name: key,
        buildings: value,
      };

      builtJson.push(obj);
    }

    console.log(builtJson);
    return builtJson;
  }

  groupByStyle(data) {
    let map = new Map<string, Array<any>>();
    data.forEach((element) => {
      if (element.style in map) {
        map[element.style].push(element);
      } else {
        map[element.style] = [element];
      }
    });

    return map;
  }

  async presentFilter() {
    // const modal = await this.modalCtrl.create({
    //   component: ScheduleFilterPage,
    //   swipeToClose: true,
    //   presentingElement: this.routerOutlet.nativeEl,
    //   componentProps: { excludedTracks: this.excludeTracks },
    // });
    // await modal.present();
    // const { data } = await modal.onWillDismiss();
    // if (data) {
    //   this.excludeTracks = data;
    //   this.updateSchedule();
    // }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, sessionData, "Favorite already added");
    } else {
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [
          {
            text: "Close",
            role: "cancel",
          },
        ],
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }
  }

  async removeFavorite(
    slidingItem: HTMLIonItemSlidingElement,
    sessionData: any,
    title: string
  ) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: "Would you like to remove this session from your favorites?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          },
        },
        {
          text: "Remove",
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule(true);

            // close the sliding item and hide the option buttons
            slidingItem.close();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: Math.random() * 1000 + 500,
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

  levenshtein = (a: string, b: string): number => {
    const matrix = Array.from({ length: a.length }).map(() =>
      Array.from({ length: b.length }).map(() => 0)
    );

    for (let i = 0; i < a.length; i++) matrix[i][0] = i;

    for (let i = 0; i < b.length; i++) matrix[0][i] = i;

    for (let j = 0; j < b.length; j++)
      for (let i = 0; i < a.length; i++)
        matrix[i][j] = Math.min(
          (i == 0 ? 0 : matrix[i - 1][j]) + 1,
          (j == 0 ? 0 : matrix[i][j - 1]) + 1,
          (i == 0 || j == 0 ? 0 : matrix[i - 1][j - 1]) + (a[i] == b[j] ? 0 : 1)
        );

    return matrix[a.length - 1][b.length - 1];
  };
}
