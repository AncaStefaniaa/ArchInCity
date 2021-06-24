import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConferenceData } from "../../providers/conference-data";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import {architecturalStyles} from '../discover/discover.columns';
@Component({
  selector: "page-over-time-detail",
  templateUrl: "over-time-detail.html",
  styleUrls: ["./over-time-detail.scss"],
})
export class overTimeDetailPage {
  speaker: any;
  buildings: any[] = [];
  show: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewWillEnter() {
   
      const speakerId = this.route.snapshot.paramMap.get("speakerId");
      for (const speaker of architecturalStyles) {
        if (speaker && speaker.id === parseInt(speakerId)) {
          this.speaker = speaker;
          console.log(this.speaker);
          break;
        }
      }

  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(this.speaker.wikipedia, "_blank");
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Share " + speaker.name,
      buttons: [
        {
          text: "Copy Link",
          handler: () => {
            console.log(
              "Copy link clicked on https://twitter.com/" + speaker.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                "https://twitter.com/" + speaker.twitter
              );
            }
          },
        },
        {
          text: "Share via ...",
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = "ios"; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Contact " + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== "ios" ? "mail" : null,
          handler: () => {
            window.open("mailto:" + speaker.email);
          },
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== "ios" ? "call" : null,
          handler: () => {
            window.open("tel:" + speaker.phone);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });

    await actionSheet.present();
  }
}