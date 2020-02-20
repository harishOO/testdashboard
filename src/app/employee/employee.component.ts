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
  isEdit: boolean = false;
  name: any;
  dept: any;
  id: any;
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

  editform(data){
    this.isEdit = true;
    this.name = data.name;
    this.dept = data.designationId;
    this.hiredate = data.hiredate;
    this.id = data.id;
  }
  saveEmps(){
    if(!this.isEdit){
      let inObj = { name: this.empname, hiredate: this.hiredate, designationId: this.departSelected.id};
      this.tservice.postEmp(inObj).subscribe(res=>{
        this.tservice.openSnackBar("Saved ", "Successfuly");
        this.getEmployes();
        console.log(res);
      })
    }else{
      let inObj = { name: this.empname, hiredate: this.hiredate, designationId: this.departSelected.id, id:this.id};
      this.tservice.PatchEmp(inObj).subscribe(res=>{
        this.tservice.openSnackBar("Updated ", "Successfuly");
        this.getEmployes();
        console.log(res);
      })
    }

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
  deleteRow(obj) {
    this.tservice.deleteDepts(obj.id).subscribe(res => {
      this.tservice.openSnackBar("Deleted ", "Successfuly");
      this.getEmployes();
    });

  }
}
