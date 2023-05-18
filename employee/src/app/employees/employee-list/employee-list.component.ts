import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from "@angular/forms";
import { Validation } from 'src/app/shared/validate/validation';
import { ApisService } from 'src/app/shared/api/apis.service';





@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  filterBy: string = '';
  employeeData !: any;
  employeeModelObj: any;
  forms: any;
  filterString: string = '';

  constructor(private apis: ApisService, private formBuilder: FormBuilder) {

    this.forms = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        email: ['', Validators.required],
        department: ['', Validators.required],
        address: ['', Validators.required],
        phnumber: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
        confpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
        status: ['', Validators.required],

      },
      {
        Validators: [Validation.match('password', 'confpassword')]
      }
    )
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this.apis.getEmployee()
      .subscribe((res: any) => {
        this.employeeData = res;
      })
  }


  deleteEmployees(info: any) {
    this.apis.deleteEmployee(info.id)
      .subscribe(res => {
        this.getEmployees();
      })
  }

  editEmployees(info: any) {
    // this.showAdd = false;
    // this.showUpdate = true;
    this.forms.controls['firstName'].setValue(info.firstName)
    this.forms.controls['lastName'].setValue(info.lastName)
    this.forms.controls['email'].setValue(info.email)
    this.forms.controls['department'].setValue(info.department)
    this.forms.controls['address'].setValue(info.address)
    this.forms.controls['phnumber'].setValue(info.phnumber)
    this.forms.controls['description'].setValue(info.description)
    this.forms.controls['status'].setValue(info.status)
  }

}
