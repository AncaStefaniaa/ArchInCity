import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConferenceData } from "../../providers/conference-data";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { architecturalStyles } from "../discover/discover.columns";

@Component({
  selector: "discover-detail",
  templateUrl: "./discover-details.html",
  styleUrls: ["./discover-details.scss"],
})
export class DiscoverDetailsPage {
  speaker: any;
  buildings: any[] = [
    {
      about:
        "Achaemenid architecture, that is the buildings created for the Persian king and his court between c. 550 and 330 BC, has a distinctive character. Halls with multiple rows of columns together with arcades on one or three sides are typical. This marks a radical departure from the more than two thousand year oldtraditional architecture of the major ancient Near Easternpowers which consisted of rooms arranged around a series of courtyards. The concept of these columned halls seems to have been adopted from the Medes, the Persians’ predecessors in western Iran.",
      id: "21",
      location: "Near Eastern Archaeology",
      name: "Achaemenid architecture",
      profilePic: "../../../assets/img/architecture/achaemenid.jpg",
      title:
        "with elements of Assyrian, Egyptian, Median and Asiatic Greek all incorporated",
      wikipedia: "https://en.wikipedia.org/wiki/Baroque_architecture",
    },
    {
      about:
        "American Craftsman is an American domestic architectural style, inspired by the Arts and Crafts movement, which included interior design, landscape design, applied arts, and decorative arts, beginning in the last years of the 19th century. Its immediate ancestors in American architecture are the Shingle style, which began the move away from Victorian ornamentation toward simpler forms; and the Prairie style of Frank Lloyd Wright. The name 'Craftsman' was appropriated from furniture-maker Gustav Stickley, whose magazine The Craftsman was first published in 1901. The architectural style was most widely-used in small-to-medium-sized Southern California single-family homes from about 1905, so that the smaller-scale Craftsman style became known alternatively as 'California bungalow'. The style remained popular into the 1930s, and has continued with revival and restoration projects through present times.",
      id: "2",
      location: "United States in Boston in the 1890s.",
      name: "American Craftsman",
      profilePic: "../../../assets/img/architecture/american-craftsman.jpg",
      title: "United States in Boston in the 1890s.",
      wikipedia: "https://en.wikipedia.org/wiki/Art_Deco",
    },
    {
      about:
        "Art Deco, sometimes referred to as Deco, is a style of visual arts, architecture and design that first appeared in France just before World War I.[1] Art Deco influenced the design of buildings, furniture, jewelry, fashion, cars, movie theatres, trains, ocean liners, and everyday objects such as radios and vacuum cleaners.[2] It took its name, short for Arts Décoratifs, from the Exposition internationale des arts décoratifs et industriels modernes (International Exhibition of Modern Decorative and Industrial Arts) held in Paris in 1925.[3] It combined modern styles with fine craftsmanship and rich materials. During its heyday, Art Deco represented luxury, glamour, exuberance, and faith in social and technological progress. From its outset, Art Deco was influenced by the bold geometric forms of Cubism and the Vienna Secession; the bright colors of Fauvism and of the Ballets Russes; the updated craftsmanship of the furniture of the eras of Louis Philippe I and Louis XVI; and the exotic styles of China and Japan, India, Persia, ancient Egypt and Maya art. It featured rare and expensive materials, such as ebony and ivory, and exquisite craftsmanship. The Chrysler Building and other skyscrapers of New York City built during the 1920s and 1930s are monuments of the Art Deco style. In the 1930s, during the Great Depression, Art Deco became more subdued. New materials arrived, including chrome plating, stainless steel, and plastic. A sleeker form of the style, called Streamline Moderne, appeared in the 1930s; it featured curving forms and smooth, polished surfaces.[4] Art Deco is one of the first truly international styles, but its dominance ended with the beginning of World War II and the rise of the strictly functional and unadorned styles of modern architecture and the International Style of architecture that followed.[5]",
      id: "3",
      location: "France just before World War I",
      name: "Art Deco",
      profilePic: "../../../assets/img/architecture/art-deco.jpg",
      title: "France just before World War I",
      wikipedia: "https://en.wikipedia.org/wiki/Baroque_architecture",
    },
    {
      about:
        "Art Nouveau, ornamental style of art that flourished between about 1890 and 1910 throughout Europe and the United States. Art Nouveau is characterized by its use of a long, sinuous, organic line and was employed most often in architecture, interior design, jewelry and glass design, posters, and illustration. It was a deliberate attempt to create a new style, free of the imitative historicism that dominated much of 19th-century art and design. About this time the term Art Nouveau was coined, in Belgium by the periodical L’Art Moderne to describe the work of the artist group Les Vingt and in Paris by S. Bing, who named his gallery L’Art Nouveau. The style was called Jugendstil in Germany, Sezessionstil in Austria, Stile Floreale (or Stile Liberty) in Italy, and Modernismo (or Modernista) in Spain.",
      id: "4",
      location: "Germany, Austria, Spain and Italy",
      name: "Art Nouveau",
      profilePic: "../../../assets/img/architecture/art-nouveau.jpg",
      title: "Germany, Austria, Spain and Italy",
      wikipedia: "https://en.wikipedia.org/wiki/Art_Nouveau",
    },
    {
      about:
        "Baroque architecture is a style that emerged in Italy in the late-16th century. It was a more theatrical version of Renaissance architecture, with dramatic lighting and colour, illusory effects such as trompe l’oeil, and designs that played games with architectural features, sometimes leaving them incomplete. Its buildings typically include central towers, domes, portico or other central projections in the main façade. As Baroque architecture coincided with European colonialism, it can be seen throughout much of the world; and in some regions, notably Germany and colonial South America, it lasted until the 18th century.",
      id: "5",
      location:
        "developed in the Counter-Reformation period, when the Catholic Church needed to reassert its waning influence across Europe in the face of the Protestant Reformation",
      name: "Baroque",
      profilePic: "../../../assets/img/architecture/baroque.jpg",
      title:
        "developed in the Counter-Reformation period, when the Catholic Church needed to reassert its waning influence across Europe in the face of the Protestant Reformation",
      style:
        "Baroque architecture is characterised by dynamic designs and complex architectural plan forms; intended to heighten feelings of motion and sensuality, and frequently based on the oval. There is often a mixture of the repetition, break-up and distortion of Renaissance classical motifs.",
      wikipedia: "https://en.wikipedia.org/wiki/Baroque_architecture",
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
    console.log(architecturalStyles);
    this.dataProvider.load().subscribe((data: any) => {
      const speakerId = this.route.snapshot.paramMap.get("discoverId");
      for (const speaker of architecturalStyles) {
        if (speaker && speaker.id === parseInt(speakerId)) {
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
