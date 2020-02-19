import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes, navigatableComponents } from "./app-routing.module";
import { RouterModule } from '@angular/router';
import { MatModule } from './mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { MatSidenavModule } from '@angular/material';
import { TableModule } from 'primeng/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartmentComponent,
    
  ],
  imports: [
    MatModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    TableModule,
    CdkTableModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
