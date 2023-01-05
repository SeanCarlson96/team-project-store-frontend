import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';



import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductComponent } from './components/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import { CustomerComponent } from './components/customer/customer.component';
import {MatBadgeModule} from '@angular/material/badge';
import { AdminComponent } from './components/admin/admin.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopkeeperComponent } from './components/shopkeeper/shopkeeper.component';
import { ShopkeeperProductsComponent } from './components/shopkeeper-products/shopkeeper-products.component';
import { ShopkeeperCategoriesComponent } from './components/shopkeeper-categories/shopkeeper-categories.component';
import { ShopkeeperCouponsComponent } from './components/shopkeeper-coupons/shopkeeper-coupons.component';
import { ShopkeeperSalesComponent } from './components/shopkeeper-sales/shopkeeper-sales.component';
import {MatTableModule} from '@angular/material/table';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AdminEditUserComponent } from './components/admin-edit-user/admin-edit-user.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    CustomerComponent,
    AdminComponent,
    ProductPageComponent,
    CartComponent,
    ShopkeeperComponent,
    ShopkeeperProductsComponent,
    ShopkeeperCategoriesComponent,
    ShopkeeperCouponsComponent,
    ShopkeeperSalesComponent,
    AddNewProductComponent,
    ShopkeeperSalesComponent,
    EditProductComponent,
    AdminEditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRadioModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
