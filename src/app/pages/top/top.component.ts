import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserData } from "../../providers/user-data";
import { TopService } from "./service/top.service";
@Component({
  selector: "app-top",
  templateUrl: "top.component.html",
  styleUrls: ["./top.component.scss"],
})
export class TopPage {
  data: any;
  dataArray: any = [];

  constructor(private topService: TopService) {}
  ngOnInit() {}
}
