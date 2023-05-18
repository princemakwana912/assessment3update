import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Validation } from 'src/app/shared/validate/validation';
import { EmployeeModel } from './add-employee.model';
import { ApisService } from 'src/app/shared/api/apis.service';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  id: string | undefined;
  forms: FormGroup;
  submitted = false;
  activatedRoute: any;
  dataId: number | undefined;
  toUpdate: any;



  constructor(private formBuilder: FormBuilder, private apis: ApisService,private route: ActivatedRoute) {
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
    this.route.paramMap.subscribe((params: Params) => {
      let id = params['get']('id');
      this.dataId = Number(id);
    });

    if (this.dataId) {
      this.apis.getEmployee().subscribe((data: any) => {
        this.toUpdate = data;

        this.forms.setValue(
          {
            'firstName': this.toUpdate.firstName,
            'lastName': this.toUpdate.lastName,
            'email': this.toUpdate.email,
            'department': this.toUpdate.department,
            'address': this.toUpdate.address,
            'phnumber': this.toUpdate.phnumber,
            'description': this.toUpdate.description,
            'status': this.toUpdate.status,
          });
      });
    }
  }


  onSubmit() {
    this.submitted = true;
    if (this.forms.invalid) {
      return;
    }

    console.log(this.forms.value);

    if (this.dataId) {
      this.apis.updateEmployee(this.toUpdate.id, this.forms.value).subscribe((res:any)=>{
        this.activatedRoute.navigate(["/"]);
      })
    }
    else{
      this.apis.addEmployee(this.forms.value).subscribe((res:any)=> {
        this.activatedRoute.navigate(["/"]);
      })
    }
  }

  get fm(): { [key: string]: AbstractControl } {
    return this.forms.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.forms.reset();
  }



  addEmployeeDetails() {

    // this.showUpdate = false;
    this.employeeModelObj.firstName = this.forms.value.firstName;
    this.employeeModelObj.lastName = this.forms.value.lastName;
    this.employeeModelObj.email = this.forms.value.email;
    this.employeeModelObj.department = this.forms.value.department;
    this.employeeModelObj.address = this.forms.value.address;
    this.employeeModelObj.phnumber = this.forms.value.phnumber;
    this.employeeModelObj.description = this.forms.value.description;
    this.employeeModelObj.password = this.forms.value.password;
    this.employeeModelObj.confpassword = this.forms.value.confpassword;
    this.employeeModelObj.status = this.forms.value.status;

    this.apis.addEmployee(this.employeeModelObj)
      .subscribe((res: any) => {
        console.log(res);
        this.forms.reset();
        // return res;

      })


  }

}

