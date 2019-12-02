import { Component } from '@angular/core';
import { StockForm } from '../stock-form/stock.form';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  private priceList = [];
  private symbolList = [];

  constructor(private stockForm: StockForm) {
  }

  searchStock(form) {
    //this.stockForm.getStockInfo(form.value.symbol, form.value.frequency);
  }

  addStock() {
    this.priceList.push(this.stockForm.price);
    this.symbolList.push(this.stockForm.symbol);
  }
}