import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/data/User';
import { catchError, Observable, pipe, Subject, take, throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageName } from '../enums/PageEnum';
import { Product } from 'src/data/Product';
import { Category } from 'src/data/Category';

@Injectable({
  providedIn: 'root'
})
export class UiService {  
  public currentUser = {} as AppUser
  public pageName: number = PageName.HOME
  //public pageIndex: number = PageName.HOME
  private newUser = {} as AppUser
  categories: Category[] = [];
  categories$: Subject<Category[]> = new Subject();
  public selectedProduct = {} as Product

  private categoryUrl = 'http://localhost:8080/categories';

   // Dummy data for product cards
  public product1: Product = {
    id: 1, productName: "dog", price: 100.00, sale: null, categories: [{id: 10, categoryName:'animals',products: []}], description: '', discontinued: false,
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
     availableDate: null,  quantity: 10, minAdPrice: 75.00
  }
  public product2: Product = {
    id: 2, productName: "cat", price: 150.00, sale: null, categories: [{id: 11, categoryName:'animals',products: []}], description: 'This is a cat', discontinued: true,
    image: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg',
     availableDate: null,  quantity: 1, minAdPrice: 75.00
  }
  public product3: Product = {
    id: 3, productName: "shirt", price: 110.00, sale: null, categories: [{id: 12, categoryName:'clothing',products: []}], description: '', discontinued: false,
    image: 'data:image/jpeg;base64,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',
     availableDate: null,  quantity: 1, minAdPrice: 75.00
  }
  public product4: Product = {
    id: 4, productName: "Iphone", price: 799.99, sale: null, categories: [{id: 13, categoryName:'electronics',products: []}], description: '', discontinued: false,
    image: 'data:image/jpeg;base64,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',
     availableDate: null,  quantity: 1, minAdPrice: 75.00
  }
  // Dummy array of product cards
  public products: Product[] = [this.product1, this.product2, this.product3, this.product4]

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.getCategories();
    localStorage.getItem("page") !== null ? this.pageName = +!localStorage.getItem("page") : this.pageName = PageName.HOME;
    
    // storing email and password so refresh won't return to home
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if(email !== null && password !== null){
      this.getAppUser(email, password)
    }
  }
  
  //GETTERS
  public getCategories(): Category[]{
    this.loadCategories();
    return this.categories;
  }
  
  public getProductById(id: number | undefined): void {
    // this.http.get<Product>(`http://localhost:8080/products?id=${id}`)
    //   .pipe(take(1))
    //   .subscribe({ 
    //     next: product => {
    //     this.selectedProduct = product
    //     console.log(this.selectedProduct)
    //   },
    //   error: () => this.openSnackBar('Problem getting product', 'Close')
    // })
    for(let product of this.products) {
      if( id === product.id ) {
        this.selectedProduct = product
      }
    }
  }

  public getUserType(userType: string): void {    
    switch(userType) {
      case 'customer':
        this.pageName = 0;
        break;        
      case 'shopkeeper':
        this.pageName = 6;
        break;        
      case 'admin':
        this.pageName = 7;
        break;
      default:
        this.pageName = 0;
    }
  }

  public changePage(page: number): void {
    localStorage.setItem("page", page.toString());
    this.pageName = page
  }
  
  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action);
  }

  // added to save user info in local storage
  public validLogin(appUser: AppUser): void {
    localStorage.setItem('email', appUser.email);
    localStorage.setItem('password', appUser.password);
  }

  public loggedIn(): boolean {
    return true;
  }

  // to clear user from local storage
  public logout(): void {
    localStorage.clear();
    this.currentUser = {} as AppUser;
  }

  getAppUser(liEmail: string, liPassword: string): void {
    this.http
      .get<AppUser>(`http://localhost:8080/appusers?email=${liEmail}&password=${liPassword}`)
      .pipe(take(1))
      .subscribe({
        next: appUser => {
        this.currentUser = appUser
        this.validLogin(appUser);
        this.getUserType(appUser.userType)        
      },
      error: () => this.openSnackBar('Invalid Credentials', 'Close'),
    })
  }

  public loadCategories(): void{
    this.http.get<Category[]>(this.categoryUrl)
    .pipe(
      take(1),
      catchError(err => {throw 'error source:' +err})
      ).subscribe({
        next: category =>{
          console.log(category)
          this.categories = category;
          this.categories$.next(category);
        },
        error: err => console.error(err)
      })
    
  }
 
  // POST requests
  addAppUser(suEmail: string, suPassword: string, userType: string): void {
    this.newUser = {
      id: 0,
      email: suEmail,
      password: suPassword,
      userType: userType,
      carts: [],
      coupons: []
    }
    this.http
      .post<AppUser>('http://localhost:8080/appusers', this.newUser)
      .pipe(take(1))
      .subscribe({
        next: () => this.openSnackBar('Registered Successfully', 'Close'),
        error: () => this.openSnackBar('This Email is already registered, please sign in', 'Close'),
    })

  }

  public whenCategoryUpdates(): Observable<Category[]>{
    return this.categories$.asObservable();
  }

  // PUT requests

  public editCustomer(currentUser: AppUser, newEmail: string, newPassword: string): void {
    
    this.http.put<AppUser>(`http://localhost:8080/appusers/${currentUser.id}`, {
      ...currentUser,
      email: newEmail,
      password: newPassword
    })
    .pipe(take(1))
    .subscribe({
      next: () => {
        // localStorage.setItem('email', _email);
        // localStorage.setItem('password', _password);
        this.openSnackBar('Updated Successfully', 'Close')
      },
      error: () => this.openSnackBar('Your account coudn\'t be updated, please try again later', 'Close'),
    })
  }
}
