import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Category } from 'src/data/Category';
import { Product } from 'src/data/Product';
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
    this.uniqueCategoryProducts();
  }
  onClickTest(val:any): void{
    console.log('clicked', val)
  }

  public uniqueCategoryProducts(): Product[]{
    const products =[]
    for (let category of this.categories){
      if (category.products.length >= 2){
        products.push(category.products[0])
      } else {
        for (let product of category.products){
          products.push(product)
        }
      }
    }
    return products;
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }
}
