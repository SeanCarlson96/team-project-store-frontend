import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public ui: UiService) { }

  public customerEditForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl(),
  });

  public onSubmit(): void {
    console.log(this.customerEditForm.value)
    this.ui.editCustomer(
      this.customerEditForm.value.email,
      this.customerEditForm.value.password)
  }

  ngOnInit(): void {
  }

}
