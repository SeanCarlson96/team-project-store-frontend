import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/User';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  

  constructor(public ui: UiService) { }

  onClick(id: number): void {
    console.log(`contents ${id} clicked`);
    this.orderClicked = true;
  }
  
  private orderClicked: boolean = false;

  public customerEditForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl(),
  });

  public onSubmit(): void {
    console.log(this.customerEditForm.value)
    this.ui.editCustomer(
      this.ui.currentUser,
      this.customerEditForm.value.email,
      this.customerEditForm.value.password)
  }

  ngOnInit(): void {
  }

}
