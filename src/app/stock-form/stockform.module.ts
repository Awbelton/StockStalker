import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockForm }  from './stock.form';
import { HomePage } from '../home-tab/home.page';
import { ApiComponent } from '../../components/api.component';
import { StockTable } from '../stock-table/stock.table';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ApiComponent,
    HomePage,
    StockTable,
    RouterModule.forChild([{ path: '', component: StockForm }])
  ],
  providers: [HomePage, StockTable],
  declarations: [StockForm]
})

export class StockFormModule {}