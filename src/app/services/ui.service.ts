import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showHomePage = true
  private showProductPage = false


  constructor() { }

  public showThisProduct(): void {
    this.showHomePage = false
    this.showProductPage = true
  }
}
