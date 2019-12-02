import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home-tab/home.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  {
    path: 'home', component: HomePage,
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}