import { Component } from '@angular/core';
import {firstValueFrom, map, Observable, shareReplay } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '广州市鑫广飞信息科技有限公司';
  version:any='';
  public sidenavList = [
    {path: "index", icon: "wifi", text: "网络配置"},
    {path: "update", icon: "update", text: "OTA更新"},
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private http: HttpClient,private breakpointObserver: BreakpointObserver) {

  }
  ngOnInit(){
    this.http.get("/VERSION").subscribe(res=>{
      console.log(res)
    })
    // firstValueFrom(this.http.get("/VERSION").pipe()).then((res:any) => {
    //   console.log(res.error.text)
    //   const reader = new FileReader();
    //   reader.onload = (() => {
    //     if (reader.result) {
    //       console.log(reader.result);
    //       this.version=reader.result
    //     }
    //   });
    //   reader.readAsText(res.files[0], 'utf-8');

    // }, e => {
    //   // console.error(e)
    //   console.error(e.error)
    // });
  }
}
