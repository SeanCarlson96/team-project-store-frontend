import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/data/User';
import { catchError, Observable, of, pipe, Subject, take, tap, throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageName } from '../enums/PageEnum';
import { Product } from 'src/data/Product';
import { Category } from 'src/data/Category';
import { Sale } from 'src/data/Sale';
import { ProductDTO } from 'src/DTOs/ProductDTO';
import { Cart } from 'src/data/Cart';
import { CartDTO } from 'src/DTOs/CartDTO';

@Injectable({
  providedIn: 'root'
})
export class UiService {  
  public currentUser = {} as AppUser
  public pageName: number = PageName.HOME
  //public pageIndex: number = PageName.HOME
  private newUser = {} as AppUser
  categories: Category[] = [];
  appUsers: AppUser[] = [];
  sales: Sale[] = [];
  sales$: Subject<Sale[]> = new Subject();
  categories$: Subject<Category[]> = new Subject();
  appUsers$: Subject<AppUser[]> = new Subject();
  private productsSubject: Subject<Product[]> = new Subject()
  public selectedProduct = {} as Product
  public products: Product[] = []
  public productIdToEdit: number = 0
  public cart: Cart = {} as Cart

  private categoryUrl = 'http://localhost:8080/categories';
  private appUsersUrl = 'http://localhost:8080/appusers';  

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.getCategories();
    this.loadSales();
    this.getUsers();
    localStorage.getItem("page") !== null ? this.pageName = +!localStorage.getItem("page") : this.pageName = PageName.HOME;
    
    // storing email and password so refresh won't return to home
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if(email !== null && password !== null){
      this.getAppUser(email, password)
    }

    this.getProducts();
  }
  
  //GETTERS
  public getCategories(): Category[]{
    this.loadCategories();
    return this.categories;
  }

  public getUsers(): AppUser[]{
    this.loadUsers();
    return this.appUsers;
  }
  public getProducts(){
    this.http
      .get<Product[]>('http://localhost:8080/products')
      .pipe(take(1))
      .subscribe({
        next: products => {
                this.products = products
                this.productsSubject.next(this.products)
              },
        error: () => console.log('something went wrong in getProducts()')
    })
  }
  whenProductsUpdates(): Observable<Product[]>{
    return this.productsSubject.asObservable()
  }

  
  public getProductById(id: number | undefined): void {
    this.http.get<Product>(`http://localhost:8080/products/${id}`)
      .pipe(take(1))
      .subscribe({ 
        next: product => {
        this.selectedProduct = product
        console.log(this.selectedProduct)
      },
      error: () => this.openSnackBar('Problem getting product', 'Close')
    })
   
  }


  public getProduct(): Product {
    return this.selectedProduct;
  }

  public getCartById(id: number): void {
    this.http.get<Cart>(`http://localhost:8080/carts/${id}`)
    .pipe(take(1))
    .subscribe({
      next: cart => {
        this.cart = cart;
        console.log(this.cart)        
      },
      error: () => {this.openSnackBar('Could not retrieve data', 'Close')}
    })
  }

  public getCustomerCart(): Cart {
    return this.cart;
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

  public onError(msg: string): void {
    this._snackBar.open(msg, undefined, {
      duration: 3000
    })
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

  // GET requests
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

  public loadUsers(): void{
    this.http.get<AppUser[]>(this.appUsersUrl)
    .pipe(
      take(1),
      // tap(data => console.log(JSON.stringify(data)))
      ).subscribe({
        next: users =>{
          console.log('inside of loadUser()',users)
          this.appUsers = users;
          this.appUsers$.next(users);
        },
        error: err => {
          console.error(err)
          this.onError('Problem getting users')
        }
      })
  }

  public loadCategories(): void{
    this.http.get<Category[]>(this.categoryUrl)
    .pipe(
      take(1),
      catchError(err => {throw 'error source:' +err})
      ).subscribe({
        next: category =>{
          this.categories = category;
          this.categories$.next(category);
        },
        error: err => console.error(err)
      })
  }
  public loadSales(): void{
    this.http.get<Sale[]>('http://localhost:8080/sales')
    .pipe(take(1))
      .subscribe({
        next: sales => {
          this.sales = sales;
          this.sales$.next(sales);
        },
      error: () => this.openSnackBar('Issue retreiving Sales', 'Close'),
    })
  }

  getAppUsers$ = this.http.get<AppUser[]>(this.appUsersUrl)
    .pipe(
      take(1),
      // tap(data => console.log(JSON.stringify(data))),
      catchError((err) => of(err))
    );

 
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
        next: () => {
          this.openSnackBar('Registered Successfully', 'Close')
          this.loadUsers();
        },
        error: () => this.openSnackBar('This Email is already registered, please sign in', 'Close'),
    })
  }
  addProduct(newProduct: ProductDTO): void {
    this.http
      .post<ProductDTO>('http://localhost:8080/products', newProduct)
      .pipe(take(1))
      .subscribe({
        next: () => this.openSnackBar('Product Added', 'Close'),
        error: () => this.openSnackBar('Something went wrong when adding a new Product', 'Close'),
    })
  }

  public whenCategoryUpdates(): Observable<Category[]>{
    return this.categories$.asObservable();
  }
  public whenSalesUpdates(): Observable<Sale[]>{
    return this.sales$.asObservable();
  }

  public whenAppUsersUpdates(): Observable<AppUser[]>{
    return this.appUsers$.asObservable();
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
        this.openSnackBar('Updated Successfully', 'Close')
      },
      error: () => this.openSnackBar('Your account coudn\'t be updated, please try again later', 'Close'),
    })
  }
  public editProduct(updatedProduct: ProductDTO): void {
    this.http
      .put<ProductDTO>(`http://localhost:8080/products/${updatedProduct.id}`, updatedProduct)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.getProducts()
          this.openSnackBar('Product Updated Successfully', 'Close')
        },
        error: () => this.openSnackBar('Something went wrong during product edit', 'Close'),
      })
  }

  // DELETE requests
  public deleteAppUser(id: number): void {
    this.http.delete<AppUser>(`${this.appUsersUrl}/${id}`)
    .pipe(take(1))
    .subscribe({
      next: ()=> this.loadUsers(),
      error: () => this.onError('Something went wrong when Deleting a user!')
    })
  }
  public deleteProduct(productId: number): void {
    this.http
      .delete<Product>(`http://localhost:8080/products/${productId}`)
      .subscribe({
          next: () => {
            this.getProducts()
            this.openSnackBar('Product Deleted', 'Close')
          },
          error: () => this.openSnackBar('Product was not removed', 'Close')
      });
  }
}
