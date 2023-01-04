import { Component, OnInit } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { PageName } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public PageName = PageName
  public cartBadge: string | null = "2"

  constructor(public ui: UiService){  }

  ngOnInit(): void {
  }
  
  public updateCartBadge(): void {
    if(this.ui.currentUser.carts.length < 1) 
      this.cartBadge = null;    
  }

}
