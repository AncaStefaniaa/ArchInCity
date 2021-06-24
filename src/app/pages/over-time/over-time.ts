import { Component } from "@angular/core";
import { ConferenceData } from "../../providers/conference-data";
import {architecturalStyles} from '../discover/discover.columns'
@Component({
  selector: "page-over-time",
  templateUrl: "over-time.html",
  styleUrls: ["./over-time.scss"],
})
export class SpeakerListPage {
  speakers: any[] = [];
  
  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
    this.speakers = architecturalStyles;
  }
}
