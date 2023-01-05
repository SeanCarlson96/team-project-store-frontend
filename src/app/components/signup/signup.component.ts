import { Component, OnInit } from '@angular/core';
import { PageName } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private ui: UiService;
  public PageName = PageName;
  public suEmail: string = ''
  public suPassword: string = ''
  public userType: string = ''
  public newUserType: string = ''
  public customer: string = 'customer'
  public shopkeeper: string = 'shopkeeper'
  public admin: string = 'admin'

  constructor(ui: UiService){
    this.ui = ui
  }

  ngOnInit(): void {
  }
  onSignUp(suEmail: string, suPassword: string) {
    this.suEmail = suEmail
    this.suPassword = suPassword
    this.ui.addAppUser(this.suEmail, this.suPassword, this.newUserType)
  }

  onLogin(): void {
    this.ui.changePage(PageName.LOGIN)
  }
}
