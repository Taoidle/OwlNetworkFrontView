import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { EnvViewComponent } from "./env-view.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: EnvViewComponent
  }
];

@NgModule({
  declarations: [EnvViewComponent],
  imports: [RouterModule.forChild(routes), MatTabsModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  exports: [RouterModule]
})
export class EnvViewModule { }
