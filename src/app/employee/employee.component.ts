import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestserviceService } from "../shared/testservice.service";
import { element } from 'protractor';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  cols:any = [];
  depts : any ;
  departSelected: any;
  empname: any;
  hiredate: any;
  empValues: any = [];
  constructor(private fb: FormBuilder, public tservice:TestserviceService) { }

  
  ngOnInit() {
    this.cols = [
      {field: 'emp', header: 'Employee Name'},
      { field: 'dept', header: 'Deprtment' },
      { field: 'date', header: 'Date & Time ' },
      { field: '', header: 'Action' },
    ];
    this.getDepartment();
    this.getEmployes();
  }
  getDepartment(){
    this.tservice.departmentlist().subscribe(res=>{
      this.depts = res;
      console.log(res)
    })
  }
  saveEmps(){
    let inObj = { name: this.empname, hiredate: this.hiredate, designationId: this.departSelected.id};
    console.log(inObj);
    this.tservice.postEmp(inObj).subscribe(res=>{
      console.log(res);
    })
  }
  getEmployes(){
    let obj = { dept:'',date : '', emp:''};
    this.tservice.getEmp().subscribe(res=>{
      let data : any = res;
      data.filter(ele=>{
            obj.emp = ele.name;
            obj.date = ele.hiredate;
            this.depts.filter(element=>{
              if(element.id == ele.designationId){
                obj.dept = element.name;
              }
            })
      });
      this.empValues.push(obj); 
    })
  }
}
