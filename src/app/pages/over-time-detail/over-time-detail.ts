import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { architecturalStyles } from "../discover/discover.columns";
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
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewWillEnter() {
    const speakerId = this.route.snapshot.paramMap.get("speakerId");
    for (const speaker of architecturalStyles) {
      if (speaker && speaker.id === parseInt(speakerId)) {
        this.speaker = speaker;
        break;
      }
    }
  }

  openExternalUrl() {
    this.inAppBrowser.create(this.speaker.wikipedia, "_blank");
  }
}
