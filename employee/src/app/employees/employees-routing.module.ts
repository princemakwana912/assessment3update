import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule } from '@angular/forms';
// import { SearchPipe } from '../filter.pipe';


const routes: Routes = [
  // { path: 'list', component: EmployeeListComponent },

];

@NgModule({
  declarations: [
    // EmployeeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    // SearchPipe
  ],
  exports: [routes]
})
export class EmployeesRoutingModule { }
