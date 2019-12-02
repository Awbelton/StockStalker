import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockForm }  from './stock.form';
import { HomePage } from '../home-tab/home.page';
import { ApiComponent } from '../../components/api.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ApiComponent,
    HomePage,
    RouterModule.forChild([{ path: '', component: StockForm }])
  ],
  providers: [HomePage],
  declarations: [StockForm]
})

export class StockFormModule {}