import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/data/User';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageName } from '../enums/PageEnum';
import { Product } from 'src/data/Product';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private http: HttpClient
  public currentUser = {} as AppUser
  public pageName: number = PageName.HOME

  // Dummy data for product cards
  public product1: Product = {
    id: 1, productName: "dog", price: 100.00, sale: null, categories: [], description: '', discontinued: false,
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
     availableDate: null,  quantity: 1, minAdPrice: 75.00
  }
  public product2: Product = {
    id: 1, productName: "cat", price: 150.00, sale: null, categories: [], description: '', discontinued: false,
    image: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg',
     availableDate: null,  quantity: 1, minAdPrice: 75.00
  }
  // Dummy array of product cards
  public products: Product[] = [this.product1, this.product2]

  constructor(http: HttpClient, private _snackBar: MatSnackBar) {
    this.http = http
  }
  public changePage(page: number): void {
    this.pageName = page
  }
  
  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action);
  }
  getAppUser(liUsername: string, liPassword: string): void {
    console.log(liPassword + " " + liUsername)
    this.http
      .get<AppUser>(`http://localhost:8080/appusers?username=${liUsername}&password=${liPassword}`)
      .pipe(take(1))
      .subscribe({
        next: appUser => {
        this.currentUser = appUser
      },
      error: () => this.openSnackBar('Invalid Credentials', 'Close'),
    })
  }
  addAppUser(suEmail: string, suPassword: string, userType: string) {
    throw new Error('Method not implemented.');
  }
}
