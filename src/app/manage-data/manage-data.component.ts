import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../data-storage.service";

@Component({
  selector: "app-manage-data",
  templateUrl: "./manage-data.component.html",
  styleUrls: ["./manage-data.component.css"],
})
export class ManageDataComponent implements OnInit {
  constructor(private dataStorage: DataStorageService) {}

  ngOnInit() {
    //sonar
    console.log(this.dataStorage);
  }
}
