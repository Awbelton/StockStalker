import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-stock-table',
  templateUrl: 'stock.table.html',
  styleUrls: ['stock.table.scss']
})

export class StockTable implements OnInit {
    constructor() {}

    // public stocks = new Observable((stock) => {
    //   const { next, error } = stock;
    //   let watchId;
    // });
    stocks: Observable<Stock[]>;

    private searchedStock = new Subject<string>();

    search(sym: string): void {
      this.searchedStock.next(sym);
    }

    ngOnInit(): void {
      // grab values from db and populate table
    }

    async addStockData(symbol: string, price: number) {
      console.log('adding...');
      console.log(symbol + ' ' + price);

      this.stocks = this.searchedStock.pipe(

      );

      console.log('stock list: ');
      console.log(this.stocks);
    }
}