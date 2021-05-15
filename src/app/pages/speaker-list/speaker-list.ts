import { Component } from "@angular/core";
import { ConferenceData } from "../../providers/conference-data";
import {architecturalStyles} from '../discover/discover.columns'
@Component({
  selector: "page-speaker-list",
  templateUrl: "speaker-list.html",
  styleUrls: ["./speaker-list.scss"],
})
export class SpeakerListPage {
  speakers: any[] = [];
  
  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
    // this.confData.getSpeakers().subscribe((speakers: any[]) => {
    //   this.speakers = this.buildings;
    // });
    this.speakers = architecturalStyles;
  }
}
