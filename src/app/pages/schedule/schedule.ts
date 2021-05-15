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
import _ from "lodash";

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
  backupData: any = [];
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
  }

  ionViewWillEnter() {
    this.galleryService.getAllImages().subscribe((res) => {
      this.userData = res["result"];

      this.userData = this.buildJson(this.userData);

      this.flag = 1;
      this.userData.forEach((element) => {
        element["longName"] =
          this.architecturalStyles[parseInt(element.name)].name;

        element.buildings.forEach((build) => {
          let splitAddress = build.address.split(",");
          build["country"] = splitAddress[splitAddress.length - 1];
          this.architecturalStyles[parseInt(build.style)].name;
        });
      });

      this.backupData = this.userData;
      this.showSkeleton = false;

      this.updateSchedule(false);
    });

    this.shownSessions = 3;
    this.groups = myBuildings;
  }

  filterBySearch(data: any, queryText: string) {
    return data.filter((element) => {
      if (element.longName) {
        let longNameLow = element.longName.toLowerCase();
        let queryTextLow = queryText.toLowerCase();

        if (longNameLow.includes(queryTextLow)) {
          return true;
        }

        return this.levenshtein(longNameLow, queryTextLow) <= 2;
      }
    });
  }

  updateSchedule(isSearching: boolean) {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    if (this.segment === "all") {
      if (isSearching || this.queryText.length > 0) {
        this.userData = this.filterBySearch(this.backupData, this.queryText);
      } else {
        this.userData = this.backupData;
      }
    } else if (this.segment === "favorites") {
      let data = _.cloneDeep(this.backupData);

      console.log(data);

      let tmpData = data.filter((element) => {
        element.buildings = element.buildings.filter((el) => {
          return el.favorite;
        });

        if (element.buildings.length === 0) {
          return false;
        }

        return true;
      });

      if (isSearching || this.queryText.length > 0) {
        this.userData = this.filterBySearch(tmpData, this.queryText);
      } else {
        this.userData = tmpData;
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

  // async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
  //   if (this.user.hasFavorite(sessionData.name)) {
  //     // Prompt to remove favorite
  //     this.removeFavorite(slidingItem, sessionData, "Favorite already added");
  //   } else {
  //     // Add as a favorite
  //     this.user.addFavorite(sessionData.name);

  //     // Close the open item
  //     slidingItem.close();

  //     // Create a toast
  //     const toast = await this.toastCtrl.create({
  //       header: `${sessionData.name} was successfully added as a favorite.`,
  //       duration: 3000,
  //       buttons: [
  //         {
  //           text: "Close",
  //           role: "cancel",
  //         },
  //       ],
  //     });

  //     // Present the toast at the bottom of the page
  //     await toast.present();
  //   }
  // }

  // async removeFavorite(
  //   slidingItem: HTMLIonItemSlidingElement,
  //   sessionData: any,
  //   title: string
  // ) {
  //   const alert = await this.alertCtrl.create({
  //     header: title,
  //     message: "Would you like to remove this building from your favorites?",
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         handler: () => {
  //           // they clicked the cancel button, do not remove the session
  //           // close the sliding item and hide the option buttons
  //           slidingItem.close();
  //         },
  //       },
  //       {
  //         text: "Remove",
  //         handler: () => {
  //           // they want to remove this session from their favorites
  //           this.user.removeFavorite(sessionData.name);
  //           this.updateSchedule(false);

  //           // close the sliding item and hide the option buttons
  //           slidingItem.close();
  //         },
  //       },
  //     ],
  //   });
  //   // now present the alert on top of all other content
  //   await alert.present();
  // }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: Math.random() * 1000 + 500,
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

  levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1
            )
          ); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  }
}
