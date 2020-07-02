import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestserviceService } from "../shared/testservice.service";
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('500ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
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
      {field: 'first_name', header: 'First Name'},
      { field: 'last_name', header: 'Last Name' },
      { field: 'address', header: 'Address' },
      { field: 'city', header: 'City' },
      { field: 'state', header: 'State' },
      { field: 'order_total', header: 'Order Total' },
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

  editRow(data){
    this.isEdit = true;
    this.name = data.name;
    this.dept = data.designation;
    this.hiredate = new Date(data.hiredate);
    this.id = data.id;
  }

  clear(){
    this.isEdit = false;
    this.name = "";
    this.dept = "";
    this.hiredate = "";
    this.id = "";

  }

  saveEmps(){
    if(!this.isEdit){
      let inObj = { name: this.name, hiredate: this.hiredate, designationId: this.dept.id};
      this.tservice.postEmp(inObj).subscribe(res=>{
        this.tservice.openSnackBar("Saved ", "Successfuly");
        this.clear();
        this.getEmployes();
        console.log(res);
      })
    }else{
      let inObj = { name: this.name, hiredate: this.hiredate, designationId: this.dept.id, id:this.id};
      this.tservice.PatchEmp(inObj).subscribe(res=>{
        this.tservice.openSnackBar("Updated ", "Successfuly");
        this.clear();
        this.getEmployes();
        console.log(res);
      })
    }

  }
  getEmployes(){
    this.tservice.getEmp().subscribe(res=>{
      let data : any = res;
      this.empValues = data;
    })
  }
  deleteRow(obj) {
    this.tservice.deleteEmp(obj.id).subscribe(res => {
      this.tservice.openSnackBar("Deleted ", "Successfuly");
      this.getEmployes();
    });

  }
}
