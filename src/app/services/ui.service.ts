import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from 'src/data/User';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private http: HttpClient
  public currentUser = {} as AppUser;

  constructor(http: HttpClient, private _snackBar: MatSnackBar) {
    this.http = http
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
