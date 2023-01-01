import { Component, OnInit } from '@angular/core';
import { PageName } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ui: UiService;  
  public liUsername: string = ''
  public liPassword: string = ''

  // needed change to product page
  public PageName = PageName;


  constructor(ui: UiService){
    this.ui = ui
  }

  ngOnInit(): void {
  }

  onSignUp() {
    throw new Error('Method not implemented.')
  }
  onLogIn(liUsername: string, liPassword: string) {
    this.liUsername = liUsername
    this.liPassword = liPassword
    this.ui.getAppUser(this.liUsername, this.liPassword)
  }
}
