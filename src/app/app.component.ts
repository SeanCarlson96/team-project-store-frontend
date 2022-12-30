import { Component } from '@angular/core';
import { PageName } from './enums/PageEnum';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fafoShop-fe';
  public ui: UiService
  public PageName = PageName

  constructor(ui: UiService){
    this.ui = ui
  }
}
