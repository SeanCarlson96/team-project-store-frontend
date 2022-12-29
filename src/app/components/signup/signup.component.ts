import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private ui: UiService;
  public suEmail: string = ''
  public suPassword: string = ''
  public userType: string = ''

  constructor(ui: UiService){
    this.ui = ui
  }

  ngOnInit(): void {
  }
  onSignUp(suEmail: string, suPassword: string, userType: string) {
    this.suEmail = suEmail
    this.suPassword = suPassword
    this.userType = userType
    this.ui.addAppUser(this.suEmail, this.suPassword, this.userType)
  }
}
