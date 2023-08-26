import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { OfflineComponent } from "./offline.component";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { AsyncPipe, NgForOf } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";



const routes: Routes = [
  {
    path: '',
    component: OfflineComponent
  }
];

@NgModule({
  declarations: [OfflineComponent],
  imports: [RouterModule.forChild(routes), MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatAutocompleteModule, AsyncPipe, MatSelectModule, NgForOf,],
  exports: [RouterModule]
})
export class OfflineModule { }
