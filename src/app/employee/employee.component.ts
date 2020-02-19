import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  cols:any = [];
  dept : any = [];
  cars: any = [];
  emplyoeForm:FormGroup

  constructor(private fb: FormBuilder) { }

  
  ngOnInit() {
    this.cols = [
      { field: '', header: 'Deprtment' },
      { field: '', header: 'Date & Time ' },
      { field: '', header: 'Action' },
    ];
    this.initiateForm();
  }
  initiateForm(){
    this.emplyoeForm = this.fb.group({
      name:['',Validators.required],
      hiredate:['',Validators.required]
    })
  }

}
