import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // test flags
  private loggedIn: boolean = false;
  private signUp: boolean = false;
  private homepage: boolean = true;

  // checking to see if buttons work
  public getLoggedIn (): boolean {
    return this.loggedIn;
  }

  public getSignedUp(): boolean {
    return this.signUp;
  }

  public getHomepage(): boolean {
    return this.homepage;
  }

  public setLoggedIn() {
    this.loggedIn = true;
    this.signUp = false;
    this.homepage = false;
    console.log('logged in');
  }

  public setSignup() {
    console.log('got signup');
    this.signUp = true;
    this.loggedIn = false;
    this.homepage = false;
  }

  public setHomepage() {
    this.loggedIn = false;
    this.signUp = false;
    this.homepage = true;
    console.log('we home')
  }

}
