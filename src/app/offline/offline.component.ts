import { Component } from '@angular/core';
import { async, firstValueFrom, map, Observable, retry, startWith } from "rxjs";
import { FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogConnect } from "../index/index.component";
import { API } from "../app.conf";

interface OfflineType {
  id: number;
  name: string;
}

interface OfflineRun {
  run: boolean;
  view: string;
}

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent {
  options: string[] = [];

  offline_list: OfflineType[] = []

  offline_selected: number = 1;

  offline_run: boolean = false;
  offline_run_btn: boolean = false;

  is_run: OfflineRun[] = [
    {run: false, view: "否"},
    {run: true, view: "是"}
  ]

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.getConf().then();
    this.getList().then();
  }

  async offlineUpdate() {
    const data = {
      id: this.offline_selected,
      run: this.offline_run,
    };
    firstValueFrom(this.http.post(API + "/api/offline/update", data).pipe()).then(res => {
      console.log("update res: ", res);
    }, e => {
      console.error(e)
    });
  }

  async offlineRun() {
    this.offline_run_btn = true;
    const data = {
      id: this.offline_selected,
    };
    firstValueFrom(this.http.post(API + "/api/offline/run", data).pipe()).then(res => {
      console.log("run res: ", res);
      // @ts-ignore
      if (res["statusCode"] === "200") {
        this.offline_run_btn = false;
      }
    }, e => {
      console.error(e)
    });
  }

  async offlineKill() {
    firstValueFrom(this.http.get(API + "/api/offline/kill").pipe()).then(res => {
      console.log("run res: ", res);
      // @ts-ignore
      if (res["statusCode"] === "200") {
      }
    }, e => {
      console.error(e)
    });
  }

  async getList() {
    firstValueFrom(this.http.get(API + "/api/offline/list").pipe(retry(3))).then(res => {
      console.log("res type:", typeof res);
      // @ts-ignore
      const data = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < data.length; i++) {
        console.log("data " + i + " : " + data[i]);
        // @ts-ignore
        const item: OfflineType = {id: data[i]["id"], name: data[i]["name"]};
        this.offline_list.push(item);
      }
    }, e => {
      console.error(e)
    });
  }

  async getConf() {
    firstValueFrom(this.http.get(API + "/api/offline/settings").pipe(retry(3))).then(res => {
      const data = JSON.parse(JSON.stringify(res));
      console.log("conf: ", data);
      this.offline_selected = data["id"];
      this.offline_run = data["run"];
    }, e => {
      console.error(e)
    });
  }
}
