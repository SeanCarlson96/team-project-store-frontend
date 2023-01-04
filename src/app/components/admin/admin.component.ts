import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {  map, Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/User';
import { MatDialog } from '@angular/material/dialog';
import { AdminEditUserComponent } from '../admin-edit-user/admin-edit-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['delete','id','role', 'email', 'password', 'edit'];
  users: AppUser[] = [];
  appUsers$ = this.ui.getAppUsers$
  dataSource: any;
  adminSub: Subscription;
  adminEmail: string = '';
  adminPassword: string = '';
  panelOpenState = false;
  uEmail: string = '';
  uPassword: string = '';
  
  //input fields create user
  email: string = '';
  password: string = '';
  newUserType: string = '';
  customer: string = '';
  shopkeeper: string = '';
  admin: string='';

  constructor(public ui: UiService, public dialog: MatDialog) {
    this.adminSub = ui.whenAppUsersUpdates()
    .pipe(map((users) => users.filter((user) => user.userType !== 'admin')))
    .subscribe((user) => {
      this.users = user
      this.dataSource = new MatTableDataSource(user)
    })
    ui.loadUsers();
  }

  ngOnInit(): void {
  }

  openDialog(user: AppUser): void {
    //component for it's dinamyic data
    const dialogRef = this.dialog.open(AdminEditUserComponent);

    // values from dialog: email, password, role
    dialogRef.afterClosed().subscribe(result => {
      //clicked away or cancel button
      if (result === undefined) return;
      if (result.email === '' || result.password === '') {
        this.ui.openSnackBar('Can\'t have empty fields', 'Close');
        return;
      }
      if (result.role === '') {
        this.ui.openSnackBar('Please assign new role', 'Close');
        return;
      }
      const newUpdatedUser: AppUser = {
        ...user,
        id: user.id,
        email: result.email,
        password: result.password,
        userType: result.userType
      }
      this.ui.updateUser(user.id, newUpdatedUser);
    });
    
  }
  onAdminClick(email:string, password:string): void{
    if (this.adminEmail === '' || this.adminPassword === '') {
      this.ui.openSnackBar('Can\'t have empty fields', 'Close');
      return;
    }
    console.log('admin email and password: ', this.adminEmail, this.adminPassword)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.adminSub.unsubscribe();
   }

}
