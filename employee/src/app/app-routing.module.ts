import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EmployeesModule } from './employees/employees.module';

const routes: Routes = [
  // { path: 'employees', loadChildren: () => import('../app/employees/employees.module').then(lists => lists.EmployeesModule) },

  {path: 'employee',component: EmployeesModule}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
