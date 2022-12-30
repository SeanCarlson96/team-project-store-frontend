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

  constructor(http: HttpClient, private _snackBar: MatSnackBar) {
    this.http = http
  }
  public changePage(page: number): void {
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
