import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TestserviceService } from "../shared/testservice.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  name: any;
  dataSource: any;

  columns = [
    { columnDef: 'name', header: 'Material Code', cell: (element: any) => `${element.itemcode}` },
    { columnDef: 'timestamp', header: 'Material Name', cell: (element: any) => `${element.itemname}` },
    { columnDef: 'Action', header: 'Action', cell: (element: any) => `` }
  ];

  constructor(public tservice: TestserviceService) { }

  ngOnInit() {
    this.getDepts();
  }

  saveDepts() {
    let obj = { name: this.name, timestamp: new Date() }
    this.tservice.postDepartment(obj).subscribe(res => {
      this.getDepts();
    })
  }

  getDepts() {
    this.tservice.departmentlist().subscribe(res => {
      this.dataSource = res;
    });
  }

}
