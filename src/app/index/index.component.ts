import {Component, OnInit} from '@angular/core';
import {firstValueFrom, map, Observable, retry, startWith} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormControl, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  public ssid = '';
  public password = '';

  ssidFormControl = new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-Z_-]{1,}')]);
  passwdFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern('[0-9a-zA-Z_-]{1,}')]);

  constructor(private http: HttpClient,public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getList();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onConnect() {
    if (this.ssidFormControl.status === "VALID" && this.passwdFormControl.status === "VALID") {
      console.log("wifi info check success");
      const data = {
        ssid: this.ssid,
        passwd: this.password
      };
      firstValueFrom(this.http.post("/api/wifi", data).pipe()).then(res => {
      }, e => {
        console.error(e)
      });
    } else {
      this.dialog.open(AlertDialogConnect);
    }
  }

  getList() {
    let wifi_list: string[] = [];
    firstValueFrom(this.http.get("/api/list").pipe(retry(3))).then(res => {
      console.log(res);
      // @ts-ignore
      for (let i = 0; i < Object.keys(res["wifi"]).length; i++) {
        // @ts-ignore
        const item = res["wifi"][i]["ssid"];
        wifi_list.push(item);
      }
      this.options = wifi_list;
    }, e => {
      console.error(e)
    });
    this.filteredOptions = this.ssidFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  resetWiFi() {

    firstValueFrom(this.http.get("/api/reset").pipe()).then(res => {
    }, e => {
      console.error(e)
    });
    this.dialog.open(AlertDialogReset);
  }

  rescanWiFi() {
    firstValueFrom(this.http.get("/api/rescan").pipe(retry(3))).then(res => {
    }, e => {
      console.error(e)
    });
  }
}

@Component({
  selector: 'alert-dialog-connect',
  styleUrls: ['alert-dialog-rescan.scss'],
  templateUrl: 'alert-dialog-connect.html',
})
export class AlertDialogConnect {
}

@Component({
  selector: 'alert-dialog-rescan',
  styleUrls: ['alert-dialog-rescan.scss'],
  templateUrl: 'alert-dialog-rescan.html',
})
export class AlertDialogRescan {
}

@Component({
  selector: 'alert-dialog-reset',
  styleUrls: ['alert-dialog-rescan.scss'],
  templateUrl: 'alert-dialog-reset.html',
})
export class AlertDialogReset {
}
