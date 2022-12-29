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


  // checking to see if buttons work
  public getLogin() {
    console.log('got login');
  }

  public getSignup() {
    console.log('got signup');
  }

}
