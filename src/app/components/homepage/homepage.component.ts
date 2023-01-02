import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Category } from 'src/data/Category';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  categorySubscription: Subscription;
  categories: Category[] = [];
  selectedCategory: string = '';

  constructor(public ui: UiService) {
    this.categorySubscription = ui.whenCategoryUpdates()
      .subscribe(category => this.categories = category);
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }
}
