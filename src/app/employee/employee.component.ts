import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TestserviceService } from "../shared/testservice.service";
import { trigger, transition, animate, style } from "@angular/animations";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateY(-100%)" }),
        animate("500ms ease-in", style({ transform: "translateY(0%)" })),
      ]),
      transition(":leave", [
        animate("500ms ease-in", style({ transform: "translateY(-100%)" })),
      ]),
    ]),
  ],
})
export class EmployeeComponent implements OnInit {
  cols: any = [];
  applicationNo: any;

  appValues: any = [];

  constructor(private fb: FormBuilder, public tservice: TestserviceService) {}

  ngOnInit() {
    this.cols = [
      { field: "appnumber", header: "Application No" },

      { field: "manager", header: "Application Name" },
      { field: "appname", header: "Dev Manager" }
    ];
    this.getApps();
  }

  searchApp() {
    this.tservice.searchApp(this.applicationNo).subscribe((res) => {
      this.appValues = res;
    });
  }

  getApps(){
    this.tservice.getAppList().subscribe((res) => {
      this.appValues = res;
    });
  }

  refresh(){
    this.applicationNo = ""
;    this.getApps();
  }
}
