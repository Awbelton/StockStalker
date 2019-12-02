import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { StockForm } from '../stock-form/stock.form';
import { StockTable } from '../stock-table/stock.table';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StockForm,
    StockTable,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [HomePage]
})

export class HomeModule {}