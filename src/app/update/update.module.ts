import { NgModule } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { UpdateComponent } from "./update.component";
import { DndDirective } from "./dnd.directive";
import { MatProgressBarModule } from "@angular/material/progress-bar";

const routes: Routes = [
  {
    path: '',
    component: UpdateComponent
  }
];

@NgModule({
  declarations: [DndDirective, UpdateComponent],
  imports: [RouterModule.forChild(routes), MatProgressBarModule, NgForOf],
  exports: [RouterModule]
})
export class UpdateModule { }
