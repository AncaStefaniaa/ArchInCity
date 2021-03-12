import { Component } from "@angular/core";
import { ConferenceData } from "../../providers/conference-data";
import { bla } from "../../../assets/img/architecture/achaemenid.jpg";
@Component({
  selector: "page-speaker-list",
  templateUrl: "speaker-list.html",
  styleUrls: ["./speaker-list.scss"],
})
export class SpeakerListPage {
  speakers: any[] = [];
  buildings: any[] = [
    {
      about:
        "Achaemenid architecture, that is the buildings created for the Persian king and his court between c. 550 and 330 BC, has a distinctive character. Halls with multiple rows of columns together with arcades on one or three sides are typical. This marks a radical departure from the more than two thousand year oldtraditional architecture of the major ancient Near Easternpowers which consisted of rooms arranged around a series of courtyards. The concept of these columned halls seems to have been adopted from the Medes, the Persians’ predecessors in western Iran.",
      id: "1",
      location: "Near Eastern Archaeology",
      name: "Achaemenid architecture",
      profilePic: "../../../assets/img/architecture/achaemenid.jpg",
      title:
        "Elements of Assyrian, Egyptian, Median and Asiatic Greek all incorporated",
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
  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = this.buildings;
    });
  }
}
