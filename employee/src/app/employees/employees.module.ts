import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { FilterPipe } from '../shared/pipe/filter.pipe';
import { SharedModule } from '../shared/shared.module';








const routes: Routes = [

  { path: '', redirectTo: 'list' , pathMatch: 'full'},
  { path: 'list', component: EmployeeListComponent },
  { path: 'addemployee', component: AddEmployeeComponent}


];

@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeComponent,
    

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    RouterModule.forRoot(routes),
    SharedModule
    
  ]
})
export class EmployeesModule { }
