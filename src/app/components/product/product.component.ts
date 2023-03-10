import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Product } from 'src/data/Product';
import { PageName } from 'src/app/enums/PageEnum';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product | undefined
  public PageName = PageName


  constructor(public ui: UiService) { }

  ngOnInit(): void {
    
  }

}
