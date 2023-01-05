import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UiService } from 'src/app/services/ui.service';
import { Product } from 'src/data/Product';
import { AppUser } from 'src/data/User';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public orderClicked: boolean = false;

  constructor(public ui: UiService) { }

  onClick(id: number): void {
    //console.log(this.orderClicked, this.ui.getCustomerCart());
    this.ui.getCartById(id);
    this.orderClicked = true;

  }
  
  public searchForProduct(id: number): Product {
    //this.ui.getProductById(id);
    return this.ui.getProduct();
  }
  

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
