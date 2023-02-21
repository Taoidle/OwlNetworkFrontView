import { Component } from '@angular/core';
import { map, Observable, shareReplay } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '广州市鑫广飞信息科技有限公司';
  public sidenavList = [
    {path: "index", icon: "wifi", text: "网络配置"},
    {path: "update", icon: "update", text: "OTA更新"},
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {

  }
}
