import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // Dummy data
  categories: string[] = ['Home','Furniture', 'Electronics', 'Kitchen & Dining']
  
  constructor(public ui: UiService) { }

  ngOnInit(): void {
  }

}
