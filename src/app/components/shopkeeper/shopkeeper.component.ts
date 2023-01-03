import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopkeeper',
  templateUrl: './shopkeeper.component.html',
  styleUrls: ['./shopkeeper.component.css']
})
export class ShopkeeperComponent implements OnInit {
  public tab: number

  constructor() {
    localStorage.getItem("shopkeeperTab") !== null ? 
      this.tab = Number(localStorage.getItem("shopkeeperTab")) : 
      this.tab = 1;
  }

  ngOnInit(): void {
  }

  public changeTab(newTab: number) {
    localStorage.setItem('shopkeeperTab', newTab.toString());
    this.tab = newTab
  }

}
