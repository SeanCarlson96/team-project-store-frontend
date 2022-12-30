import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/data/User';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageName } from '../enums/PageEnum';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showHomePage = true
  private showProductPage = false
  private http: HttpClient
  public currentUser = {} as AppUser
  public pageName: number = PageName.HOME
  private newUser = {} as AppUser

  constructor(http: HttpClient, private _snackBar: MatSnackBar) {
    //this.pageName = localStorage.getItem("page")? +!localStorage.getItem("page") : PageName.HOME;
    this.http = http
  }
  public changePage(page: number): void {
    //localStorage.setItem("page", page.toString());
    this.pageName = page
  }
  public showThisProduct(): void {
    this.showHomePage = false
    this.showProductPage = true
  }
  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action);
  }
  getAppUser(liUsername: string, liPassword: string): void {
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
        error: () => this.openSnackBar('Invalid Credentials', 'Close'),
    })

  }
}
