import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TestserviceService } from "../shared/testservice.service";
import { depts } from "./depts";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  name: any;
  dataSource: MatTableDataSource<depts>;;
  data: any;
  columns = [
    { columnDef: 'name', header: 'Department', cell: (element: any) => `${element.name}` },
    { columnDef: 'timestamp', header: 'Create Date', cell: (element: any) => `${element.timestamp}` },
    { columnDef: 'Action', header: 'Action', cell: (element: any) => `` }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);

    });
  }

}
