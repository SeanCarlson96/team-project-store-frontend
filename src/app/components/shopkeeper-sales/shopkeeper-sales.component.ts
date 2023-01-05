import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Sale } from 'src/data/Sale';
import { ProductDTO } from 'src/DTOs/ProductDTO';
import { SaleDTO } from 'src/DTOs/SaleDTO';

@Component({
  selector: 'app-shopkeeper-sales',
  templateUrl: './shopkeeper-sales.component.html',
  styleUrls: ['./shopkeeper-sales.component.css']
})
export class ShopkeeperSalesComponent implements OnInit, OnDestroy {
  ui: UiService
  public newSale: boolean = false
  //public editSale: number = -1
  public editSaleId: number = -1
  public displayedColumns: string[] = ['Delete', 'Edit', 'saleName', 'startDate', 'stopDate', 'products', 'discountPercentage'];
  public dataSource: Sale[] = []
  private salesSubscription: Subscription
  public edit: boolean = false
  public newSaleSaleName: string = ''
  public newSaleStartDate: Date = new Date
  public newSaleStopDate: Date = new Date
  public newSaleProducts: ProductDTO[] = []
  public newSaleDiscountPercentage: number = 0
  public newSaleDTO = {} as SaleDTO
  public updatedSale = {} as SaleDTO
  public salesProducts = {} as ProductDTO

  constructor(ui:UiService){
    this.ui = ui
    ui.loadSales()
    this.salesSubscription = ui.whenSalesUpdates().subscribe(sales => {
      this.dataSource = sales
    })
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.salesSubscription.unsubscribe()
  }
  addNewSale() {
    this.newSaleDTO = {
      id: null,
      saleName: this.newSaleSaleName,
      startDate: this.newSaleStartDate,
      stopDate: this.newSaleStopDate,
      products: this.newSaleProducts, //of type ProductDTO
      discountPercentage: this.newSaleDiscountPercentage
    }
    this.ui.addSale(this.newSaleDTO)
    this.newSale = false
  }
  openEditSale(id: number) {
    this.ui.saleIdToEdit = id
    this.editSaleId = id
    this.edit = true;
    for(let sale of this.dataSource){
      if(sale.id === id){
        this.newSaleSaleName = sale.saleName
      }
    }
  }
  updateSale(): void {
    this.updatedSale = {
      id: this.editSaleId,
      saleName: this.newSaleSaleName,
      startDate: this.newSaleStartDate,
      stopDate: this.newSaleStopDate,
      products: this.newSaleProducts, //of type ProductDTO
      discountPercentage: this.newSaleDiscountPercentage
    }
    this.ui.editSale(this.updatedSale)
    this.edit=false
    this.editSaleId=-1
    this.newSaleSaleName = ''
  }
}
