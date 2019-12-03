import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-table',
  templateUrl: 'stock.table.html',
  styleUrls: ['stock.table.scss']
})

export class StockTable implements OnInit {
    constructor() {}

    public stocks: {
        symbol: string;
        price: number;
      }[] = [];

    ngOnInit(): void {
      // grab values from db and populate table
    }

    async addStockData(symbol: string, price: number) {
      console.log('adding...');
      console.log(symbol + ' ' + price);
      this.stocks.push({symbol: symbol, price: price});
    }
}