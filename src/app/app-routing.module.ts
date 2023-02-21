import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { UpdateComponent } from "./update/update.component";

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'update', component: UpdateComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
