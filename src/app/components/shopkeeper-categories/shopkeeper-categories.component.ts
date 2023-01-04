import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Category } from 'src/data/Category';
import { CategoryDTO } from 'src/DTOs/CategoryDTO';
import { ProductDTO } from 'src/DTOs/ProductDTO';

@Component({
  selector: 'app-shopkeeper-categories',
  templateUrl: './shopkeeper-categories.component.html',
  styleUrls: ['./shopkeeper-categories.component.css']
})
export class ShopkeeperCategoriesComponent implements OnInit, OnDestroy {
  ui: UiService
  public newCategory: boolean = false
  //public editCategory: number = -1
  public editCategoryId: number = -1
  public displayedColumns: string[] = ['Delete', 'Edit', 'categoryName'];
  public dataSource: Category[] = []
  private categoriesSubscription: Subscription
  public edit: boolean = false
  public newCategoryCategoryName: string = ''
  public newCategoryDTO = {} as CategoryDTO
  public updatedCategory = {} as CategoryDTO
  public categorysProducts = {} as ProductDTO

  constructor(ui:UiService){
    this.ui = ui
    ui.getCategories()
    this.categoriesSubscription = ui.whenCategoryUpdates().subscribe(categories => {
      this.dataSource = categories
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe()
  }

  addNewCategory() {
    this.newCategoryDTO = {
      id: null,
      categoryName: this.newCategoryCategoryName,
      products: []
    }
    this.ui.addCategory(this.newCategoryDTO)
    this.newCategory = false
  }
  openEditCategory(id: number) {
    this.ui.categoryIdToEdit = id
    this.editCategoryId = id
    this.edit = true;
    for(let cat of this.dataSource){
      if(cat.id === id){
        this.newCategoryCategoryName = cat.categoryName
      }
    }
  }
  updateCategory(): void {
    this.updatedCategory = {
      id: this.editCategoryId,
      categoryName: this.newCategoryCategoryName,
      products: [], //editing will reset the product array for that category
    }
    this.ui.editCategory(this.updatedCategory)
    this.edit=false
    this.editCategoryId=-1
    this.newCategoryCategoryName = ''
  }
}
