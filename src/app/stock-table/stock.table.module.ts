import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockTable }  from './stock.table';
import { StockForm }  from '../stock-form/stock.form';
import { HomePage } from '../home-tab/home.page';
import { ApiComponent } from '../../components/api.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ApiComponent,
    StockForm,
    HomePage,
    RouterModule.forChild([{ path: '', component: StockTable }])
  ],
  providers: [HomePage, StockForm],
  declarations: [StockTable]
})

export class StockTableModule {}