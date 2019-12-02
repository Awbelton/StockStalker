import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-table',
  templateUrl: 'stock.table.html',
  styleUrls: ['stock.table.scss']
})

export class StockTable implements OnInit {
    constructor() {}

    public stocks: {
        name: string;
        price: number;
      }[];

    ngOnInit(): void {

    }
}