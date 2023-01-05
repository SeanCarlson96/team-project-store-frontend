import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { ProductInCart } from 'src/data/ProductsInCart';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public displayedColumns: string[] = ['Product Name', 'Quantity','Product Price','Total'];
  public dataSource: ProductInCart[] = []
  public orderClicked: boolean = false;
  

  constructor(public ui: UiService) { }

  onClick(id: number): void {   
    this.ui.getCartById(id);    
    this.orderClicked = true;
    this.dataSource = this.ui.getProductsInCustomerCart();
  }
  
  getCartCost() {
    return this.dataSource.map(p => ((p.product.price)*(p.quantity))).reduce((acc, value) => acc + value, 0);
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
