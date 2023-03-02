import { Component } from '@angular/core';
import { first, firstValueFrom, map, Observable, retry, shareReplay } from "rxjs";
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
    this.http.get("/VERSION").subscribe((data)=>{
      // @ts-ignore
      this.version = data["version"];
    })
  }
}
