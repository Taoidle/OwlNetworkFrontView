import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'update', loadChildren: () => import('./update/update.module').then(m => m.UpdateModule)},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
