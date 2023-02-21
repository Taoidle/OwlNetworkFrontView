import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// HttpClient 是 Angular 通过 HTTP 与远程服务器通讯的机制。
// 要让 HttpClient 在应用中随处可用，需要两个步骤。首先，用导入语句把它添加到根模块 AppModule 中：
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTreeModule } from "@angular/material/tree";
import { IndexComponent, AlertDialogRescan, AlertDialogReset, AlertDialogConnect } from './index/index.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { UpdateComponent } from './update/update.component';
import { DndDirective } from './update/dnd.directive';
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AlertDialogConnect,
    AlertDialogRescan,
    AlertDialogReset,
    UpdateComponent,
    DndDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    // 把 HttpClientModule 添加到 imports 数组中：
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    //forRoot() 配置方法接收一个 InMemoryDataService 类来初始化内存数据库。
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false}
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
