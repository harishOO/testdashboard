import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component'


export const routes: Routes = [
  { path: "", redirectTo: "/employee", pathMatch: "full" },
  { path:"department", component:DepartmentComponent},
  { path:"employee", component:EmployeeComponent}
];

export const navigatableComponents =[
  DepartmentComponent,
  EmployeeComponent
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
