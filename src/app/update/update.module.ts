import { NgModule } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AlertDialogFiletype, UpdateComponent } from "./update.component";
import { DndDirective } from "./dnd.directive";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";

const routes: Routes = [
  {
    path: '',
    component: UpdateComponent
  }
];

@NgModule({
  declarations: [DndDirective, UpdateComponent, AlertDialogFiletype],
  imports: [RouterModule.forChild(routes), MatProgressBarModule, NgForOf, MatDialogModule, MatButtonModule, MatSelectModule],
  exports: [RouterModule]
})
export class UpdateModule { }
