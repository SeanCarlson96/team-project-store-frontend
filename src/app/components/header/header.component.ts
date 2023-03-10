import { Component, OnInit } from '@angular/core';
import { PageName } from 'src/app/enums/PageEnum';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public ui: UiService
  public PageName = PageName

  constructor(ui: UiService){
    this.ui = ui
  }

  ngOnInit(): void {
  }


}
