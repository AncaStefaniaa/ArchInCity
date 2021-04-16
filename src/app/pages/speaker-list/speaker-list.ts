import { Component } from "@angular/core";
import { ConferenceData } from "../../providers/conference-data";

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
      image: "../../../assets/img/architecture/achaemenid.jpg",
      title:
        "Elements of Assyrian, Egyptian, Median and Asiatic Greek all incorporated",
      wikipedia: "https://en.wikipedia.org/wiki/Baroque_architecture",
    },
    {
      about:
        "American Craftsman is an American domestic architectural style, inspired by the Arts and Crafts movement, which included interior design, landscape design, applied arts, and decorative arts, beginning in the last years of the 19th century. Its immediate ancestors in American architecture are the Shingle style, which began the move away from Victorian ornamentation toward simpler forms; and the Prairie style of Frank Lloyd Wright. The name 'Craftsman' was appropriated from furniture-maker Gustav Stickley, whose magazine The Craftsman was first published in 1901. The architectural style was most widely-used in small-to-medium-sized Southern California single-family homes from about 1905, so that the smaller-scale Craftsman style became known alternatively as 'California bungalow'. The style remained popular into the 1930s, and has continued with revival and restoration projects through present times.",
      id: "2",
      location: "United States in Boston in the 1890s.",
      name: "American Craftsman",
      image: "../../../assets/img/architecture/american-craftsman.jpg",
      title: "United States in Boston in the 1890s.",
      wikipedia: "https://en.wikipedia.org/wiki/Baroque_architecture",
    },
    {
      about:
        "Art Deco, sometimes referred to as Deco, is a style of visual arts, architecture and design that first appeared in France just before World War I.[1] Art Deco influenced the design of buildings, furniture, jewelry, fashion, cars, movie theatres, trains, ocean liners, and everyday objects such as radios and vacuum cleaners.[2] It took its name, short for Arts Décoratifs, from the Exposition internationale des arts décoratifs et industriels modernes (International Exhibition of Modern Decorative and Industrial Arts) held in Paris in 1925.[3] It combined modern styles with fine craftsmanship and rich materials. During its heyday, Art Deco represented luxury, glamour, exuberance, and faith in social and technological progress. From its outset, Art Deco was influenced by the bold geometric forms of Cubism and the Vienna Secession; the bright colors of Fauvism and of the Ballets Russes; the updated craftsmanship of the furniture of the eras of Louis Philippe I and Louis XVI; and the exotic styles of China and Japan, India, Persia, ancient Egypt and Maya art. It featured rare and expensive materials, such as ebony and ivory, and exquisite craftsmanship. The Chrysler Building and other skyscrapers of New York City built during the 1920s and 1930s are monuments of the Art Deco style. In the 1930s, during the Great Depression, Art Deco became more subdued. New materials arrived, including chrome plating, stainless steel, and plastic. A sleeker form of the style, called Streamline Moderne, appeared in the 1930s; it featured curving forms and smooth, polished surfaces.[4] Art Deco is one of the first truly international styles, but its dominance ended with the beginning of World War II and the rise of the strictly functional and unadorned styles of modern architecture and the International Style of architecture that followed.[5]",
      id: "3",
      location: "France just before World War I",
      name: "Art Deco",
      image: "../../../assets/img/architecture/art-deco.jpg",
      title: "France just before World War I",
      wikipedia: "https://en.wikipedia.org/wiki/Art_Deco",
    },
    {
      about:
        "Art Nouveau, ornamental style of art that flourished between about 1890 and 1910 throughout Europe and the United States. Art Nouveau is characterized by its use of a long, sinuous, organic line and was employed most often in architecture, interior design, jewelry and glass design, posters, and illustration. It was a deliberate attempt to create a new style, free of the imitative historicism that dominated much of 19th-century art and design. About this time the term Art Nouveau was coined, in Belgium by the periodical L’Art Moderne to describe the work of the artist group Les Vingt and in Paris by S. Bing, who named his gallery L’Art Nouveau. The style was called Jugendstil in Germany, Sezessionstil in Austria, Stile Floreale (or Stile Liberty) in Italy, and Modernismo (or Modernista) in Spain.",
      id: "4",
      location: "Germany, Austria, Spain and Italy",
      name: "Art Nouveau",
      image: "../../../assets/img/architecture/art-nouveau.jpg",
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
      image: "../../../assets/img/architecture/baroque.jpg",
      title:
        "developed in the Counter-Reformation period, when the Catholic Church needed to reassert its waning influence across Europe in the face of the Protestant Reformation",
      style:
        "Baroque architecture is characterised by dynamic designs and complex architectural plan forms; intended to heighten feelings of motion and sensuality, and frequently based on the oval. There is often a mixture of the repetition, break-up and distortion of Renaissance classical motifs.",
      wikipedia: "https://en.wikipedia.org/wiki/Baroque_architecture",
    },
    {
      name: "Bauhaus",
      id: 7,
      about:
        "The Bauhaus was founded by architect Walter Gropius in Weimar. It was grounded in the idea of creating a Gesamtkunstwerk ('comprehensive artwork') in which all the arts would eventually be brought together. The Bauhaus style later became one of the most influential currents in modern design, modernist architecture and art, design, and architectural education.[2] The Bauhaus movement had a profound influence upon subsequent developments in art, architecture, graphic design, interior design, industrial design, and typography. Staff at the Bauhaus included prominent artists such as Paul Klee, Wassily Kandinsky, and László Moholy-Nagy at various points.",
      origins: ["from 1919 to 1933", "Germany"],
      characteristics: [
        "combined crafts and the fine arts",
        "comprehensive artwork",
      ],
      wikipedia: "https://en.wikipedia.org/wiki/Bauhaus",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/6265_Dessau.JPG/375px-6265_Dessau.JPG",
    },
    {
      name: "Beaux-Arts",
      id: 8,
      about:
        "Beaux-Arts architecture was the academic architectural style taught at the École des Beaux-Arts in Paris, particularly from the 1830s to the end of the 19th century. It drew upon the principles of French neoclassicism, but also incorporated Gothic and Renaissance elements, and used modern materials, such as iron and glass. It was an important style in France until the end of the 19th century. It also had a strong influence on architecture in the United States because of the many prominent American architects who studied at the École des Beaux-Arts, including Henry Hobson Richardson, John Galen Howard, Daniel Burnham, and Louis Sullivan.",
      origins: ["from the 1830s to the end of the 19th century.", "Paris"],
      characteristics: ["Modern materials", "Classical details", "Flat roof"],
      wikipedia: "https://en.wikipedia.org/wiki/Beaux-Arts_architecture",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Paris_6_-_ENSBA_01.jpg/450px-Paris_6_-_ENSBA_01.jpg",
    },
    {
      name: "Byzantine",
      id: 9,
      about:
        "The Byzantine era is usually dated from 330 AD, when Constantine the Great moved the Roman capital to Byzantium, which became Constantinople, until the fall of the Byzantine Empire in 1453. However, there was initially no hard line between the Byzantine and Roman empires, and early Byzantine architecture is stylistically and structurally indistinguishable from earlier Roman architecture. This terminology was introduced by modern historians to designate the medieval Roman Empire as it evolved as a distinct artistic and cultural entity centered on the new capital of Constantinople (modern-day Istanbul) rather than the city of Rome and its environs.",
      origins: ["330 AD", "Constantinople"],
      characteristics: ["Exotic domes", "Ever-richer mosaics", "Flat roof"],
      wikipedia: "https://en.wikipedia.org/wiki/Byzantine_architecture",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Fethiye_Museum_9625.jpg/420px-Fethiye_Museum_9625.jpg",
    },
    {
      name: "Chicago school",
      id: 10,
      about:
        "Chicago's architecture is famous throughout the world and one style is referred to as the Chicago School. Much of its early work is also known as Commercial style.[1] In the history of architecture, the first Chicago School was a school of architects active in Chicago at the turn of the 20th century. They were among the first to promote the new technologies of steel-frame construction in commercial buildings, and developed a spatial aesthetic which co-evolved with, and then came to influence, parallel developments in European Modernism. A 'Second Chicago School' with a modernist aesthetic emerged in the 1940s through 1970s, which pioneered new building technologies and structural systems, such as the tube-frame structure.",
      origins: ["20th century", "Chicago"],
      characteristics: [
        "bundled tube structural",
        "the world's tallest buildings",
      ],
      wikipedia: "https://en.wikipedia.org/wiki/Chicago_school_(architecture)",
      image:
        "https://cdn.skyrisecities.com/sites/default/files/images/articles/2016/05/20957/20957-71905.jpg",
    },

    {
      name: "Colonial",
      id: 11,
      about:
        "Colonial architecture is an architectural style from a mother country that has been incorporated into the buildings of settlements or colonies in distant locations. Colonists frequently built settlements that synthesized the architecture of their countries of origin with the design characteristics of their new lands, creating hybrid designs.",
      origins: ["Dutch Colonial", "French Colonial", "American colonial"],
      characteristics: [
        "Dutch Colonial",
        "French Colonial",
        "American colonial",
      ],
      wikipedia:
        "https://en.wikipedia.org/wiki/Colonial_architecture#:~:text=Colonial%20architecture%20is%20an%20architectural,or%20colonies%20in%20distant%20locations.",
      image:
        "https://www.nomadepicureans.com/wp-content/uploads/2018/11/colonial-architecture.jpg",
    },
    {
      name: "Deconstructivism",
      id: 12,
      about:
        "Deconstructivism is, in fact, not a new architecture style, nor is it an avant-garde movement against architecture or society. It does not follow “rules” or acquire specific aesthetics, nor is it a rebellion against a social dilemma. It is the unleashing of infinite possibilities of playing around with forms and volumes.",
      origins: ["1980s", "New York"],
      characteristics: [
        "absence of obvious harmony",
        "Contemporary art",
        "Smooth exterior surfaces",
      ],
      wikipedia: "https://en.wikipedia.org/wiki/Deconstructivism",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Image-Disney_Concert_Hall_by_Carol_Highsmith_edit-2.jpg/1151px-Image-Disney_Concert_Hall_by_Carol_Highsmith_edit-2.jpg",
    },
  ];
  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = this.buildings;
    });
  }
}
