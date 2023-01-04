import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { pipe, Subscription, tap } from 'rxjs';
// import { PageName } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';
import { AppUser } from 'src/data/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['delete','id','role', 'email', 'password', 'save'];
  users: AppUser[] = [];
  appUsers$ = this.ui.getAppUsers$
  dataSource: any;
  adminSub: Subscription;
  
  //input fields
  email: string = '';
  password: string = '';
  newUserType: string = '';
  customer: string = '';
  shopkeeper: string = '';
  admin: string='';


  // constructor(public ui: UiService) {
  //   this.adminSub = this.appUsers$.subscribe(user => {
  //     this.users = user
  //     this.dataSource = new MatTableDataSource(this.users)
  //   })
  // }
  constructor(public ui: UiService) {
    this.adminSub = ui.whenAppUsersUpdates().subscribe((user) => {
      console.log('user: ', user)
      this.users = user
      this.dataSource = new MatTableDataSource(user)
    })
    ui.loadUsers();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 
  onEdit(): void{
    console.log('edit icon clicked')
  }

  
  
  ngOnDestroy(): void {
    this.adminSub.unsubscribe();
   }

}
