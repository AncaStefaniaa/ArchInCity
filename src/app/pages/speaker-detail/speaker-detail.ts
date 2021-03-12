import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConferenceData } from "../../providers/conference-data";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "page-speaker-detail",
  templateUrl: "speaker-detail.html",
  styleUrls: ["./speaker-detail.scss"],
})
export class SpeakerDetailPage {
  speaker: any;
  buildings: any[] = [
    {
      about:
        "Achaemenid architecture, that is the buildings created for the Persian king and his court between c. 550 and 330 BC, has a distinctive character. Halls with multiple rows of columns together with arcades on one or three sides are typical. This marks a radical departure from the more than two thousand year oldtraditional architecture of the major ancient Near Easternpowers which consisted of rooms arranged around a series of courtyards. The concept of these columned halls seems to have been adopted from the Medes, the Persians’ predecessors in western Iran.",
      id: "1",
      location: "Near Eastern Archaeology",
      name: "Achaemenid architecture",
      profilePic: "../../../assets/img/architecture/achaemenid.jpg",
      title:
        "with elements of Assyrian, Egyptian, Median and Asiatic Greek all incorporated",
    },
    {
      about:
        "American Craftsman is an American domestic architectural style, inspired by the Arts and Crafts movement, which included interior design, landscape design, applied arts, and decorative arts, beginning in the last years of the 19th century. Its immediate ancestors in American architecture are the Shingle style, which began the move away from Victorian ornamentation toward simpler forms; and the Prairie style of Frank Lloyd Wright. The name 'Craftsman' was appropriated from furniture-maker Gustav Stickley, whose magazine The Craftsman was first published in 1901. The architectural style was most widely-used in small-to-medium-sized Southern California single-family homes from about 1905, so that the smaller-scale Craftsman style became known alternatively as 'California bungalow'. The style remained popular into the 1930s, and has continued with revival and restoration projects through present times.",
      id: "2",
      location: "United States in Boston in the 1890s.",
      name: "American Craftsman",
      profilePic: "../../../assets/img/architecture/american-craftsman.jpg",
      title: "United States in Boston in the 1890s.",
    },
    {
      about:
        "Burt is a Bear. Burt's interests include poetry, dashing space heroes, and lions.",
      id: "1",
      location: "Everywhere",
      name: "Burt Bear",
      profilePic: "/assets/img/speakers/bear.jpg",
      title: "Software Engineer",
    },
    {
      about:
        "Burt is a Bear. Burt's interests include poetry, dashing space heroes, and lions.",
      id: "1",
      location: "Everywhere",
      name: "Burt Bear",
      profilePic: "/assets/img/speakers/bear.jpg",
      title: "Software Engineer",
    },
  ];
  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const speakerId = this.route.snapshot.paramMap.get("speakerId");
      console.log(this.buildings);
      for (const speaker of this.buildings) {
        console.log(speaker);
        console.log(speaker.id);
        console.log(speakerId);
        console.log(speaker.id === speakerId);
        if (speaker && speaker.id === speakerId) {
          this.speaker = speaker;
          console.log(this.speaker);
          break;
        }
      }
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
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
