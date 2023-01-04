import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {
  userType: string = '';
  email: string = '';
  password: string = '';

  constructor(private matDialogRef: MatDialogRef<AdminEditUserComponent>){}

  ngOnInit(): void {
  }

  public dialogValues(): void{
    const newData = {
      userType: this.userType,
      email: this.email,
      password: this.password
    }
    this.matDialogRef.close(newData)
  }

  onCancelClick(): void {
    this.matDialogRef.close();
  }

}
