import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // Dummy data
  categories: string[] = ['Home','Furniture', 'Electronics', 'Kitchen & Dining']
  
  constructor() { }

  ngOnInit(): void {
  }

}
