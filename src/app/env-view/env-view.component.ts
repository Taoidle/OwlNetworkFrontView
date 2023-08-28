import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, retry } from "rxjs";
import { API } from "../app.conf";
import { FormControl } from "@angular/forms";


export interface PeriodicElement {
  package: string;
  version: string;
}

let PY_ELEMENT_DATA: PeriodicElement[] = [];
let CPP_ELEMENT_DATA: PeriodicElement[] = [];
let PKG_ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-env-view',
  templateUrl: './env-view.component.html',
  styleUrls: ['./env-view.component.scss'],
})
export class EnvViewComponent {

  loading: boolean = true;
  selected = new FormControl(0);
  pageIndex: number = 0;
  pageSize: number = 10;

  displayedColumns: string[] = ['package', 'version'];
  // dataSource = ELEMENT_DATA;
  pythonDataSource= new MatTableDataSource<PeriodicElement>();
  cppDataSource= new MatTableDataSource<PeriodicElement>();
  pkgDataSource= new MatTableDataSource<PeriodicElement>();

  @ViewChild('paginatorPython') paginatorPython: MatPaginator | undefined;
  @ViewChild('paginatorCpp') paginatorCpp: MatPaginator | undefined;
  @ViewChild('paginatorSystem') paginatorSystem: MatPaginator | undefined;

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.pythonDataSource = new MatTableDataSource<PeriodicElement>(PY_ELEMENT_DATA);
    this.pythonDataSource._updateChangeSubscription();
    // @ts-ignore
    this.pythonDataSource.paginator = this.paginatorPython;
    this.cppDataSource = new MatTableDataSource<PeriodicElement>(CPP_ELEMENT_DATA);
    this.cppDataSource._updateChangeSubscription();
    // @ts-ignore
    this.cppDataSource.paginator = this.paginatorCpp;
    this.pkgDataSource = new MatTableDataSource<PeriodicElement>(PKG_ELEMENT_DATA);
    this.pkgDataSource._updateChangeSubscription();
    // @ts-ignore
    this.pkgDataSource.paginator = this.paginatorSystem;
  }

  ngOnInit() {
    this.getData(0, 10).then();
  }

  async getData(offset: number, limit: number){
    switch (this.selected.value) {
      case 0:
        await this.getPythonData(offset, limit);
        break;
      case 1:
        await this.getCppData(offset, limit);
        break;
      case 2:
        await this.getSystemData(offset, limit);
        break;
    }
  }

  private async getPythonData(offset: number, limit: number) {
    const data = {
      offset,
      limit,
    };
    console.log("API URL: ", API + "/api/env/list/python")
    firstValueFrom(this.http.post(API + "/api/env/list/python", data).pipe(retry(3))).then(res => {
      // @ts-ignore
      const data = JSON.parse(JSON.stringify(res["data"]));
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        const item: PeriodicElement = {package: data[i]["package"], version: data[i]["version"]};
        PY_ELEMENT_DATA.push(item);
      }
      // @ts-ignore
      PY_ELEMENT_DATA.length = res["total"];
      this.loading = false;
      this.pythonDataSource = new MatTableDataSource<PeriodicElement>(PY_ELEMENT_DATA);
      // @ts-ignore
      this.pythonDataSource.paginator = this.paginatorPython;
    }, e => {
      console.error(e)
    });
  }

  private async getNextPythonData(offset: number, limit: number) {
    const data = {
      offset,
      limit,
    };
    firstValueFrom(this.http.post(API + "/api/env/list/python", data).pipe(retry(3))).then(res => {
      // @ts-ignore
      const data = JSON.parse(JSON.stringify(res["data"]));
      PY_ELEMENT_DATA.length = offset * limit;
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        const item: PeriodicElement = {package: data[i]["package"], version: data[i]["version"]};
        PY_ELEMENT_DATA.push(item);
      }
      this.loading = false;
      // @ts-ignore
      PY_ELEMENT_DATA.length = res["total"];
      this.pythonDataSource = new MatTableDataSource<PeriodicElement>(PY_ELEMENT_DATA);
      this.pythonDataSource._updateChangeSubscription();
      // @ts-ignore
      this.pythonDataSource.paginator = this.paginatorPython;
    }, e => {
      console.error(e)
    });
  }

  private async getCppData(offset: number, limit: number) {
    const data = {
      offset,
      limit,
    };
    firstValueFrom(this.http.post(API + "/api/env/list/cpp", data).pipe(retry(3))).then(res => {
      // @ts-ignore
      const data = JSON.parse(JSON.stringify(res["data"]));
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        const item: PeriodicElement = {package: data[i]["package"], version: data[i]["version"]};
        CPP_ELEMENT_DATA.push(item);
      }
      // @ts-ignore
      CPP_ELEMENT_DATA.length = res["total"];
      this.loading = false;
      this.cppDataSource = new MatTableDataSource<PeriodicElement>(CPP_ELEMENT_DATA);
      // @ts-ignore
      this.cppDataSource.paginator = this.paginatorCpp;
    }, e => {
      console.error(e)
    });
  }

  private async getNextCppData(offset: number, limit: number) {
    const data = {
      offset,
      limit,
    };
    firstValueFrom(this.http.post(API + "/api/env/list/cpp", data).pipe(retry(3))).then(res => {
      // @ts-ignore
      const data = JSON.parse(JSON.stringify(res["data"]));
      CPP_ELEMENT_DATA.length = offset * limit;
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        const item: PeriodicElement = {package: data[i]["package"], version: data[i]["version"]};
        CPP_ELEMENT_DATA.push(item);
      }
      this.loading = false;
      // @ts-ignore
      CPP_ELEMENT_DATA.length = res["total"];
      this.cppDataSource = new MatTableDataSource<PeriodicElement>(CPP_ELEMENT_DATA);
      this.cppDataSource._updateChangeSubscription();
      // @ts-ignore
      this.cppDataSource.paginator = this.paginatorCpp;
    }, e => {
      console.error(e)
    });
  }

  private async getSystemData(offset: number, limit: number) {
    const data = {
      offset,
      limit,
    };
    firstValueFrom(this.http.post(API + "/api/env/list/ospkg", data).pipe(retry(3))).then(res => {
      // @ts-ignore
      const data = JSON.parse(JSON.stringify(res["data"]));
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        const item: PeriodicElement = {package: data[i]["package"], version: data[i]["version"]};
        PKG_ELEMENT_DATA.push(item);
      }
      // @ts-ignore
      PKG_ELEMENT_DATA.length = res["total"];
      this.loading = false;
      this.pkgDataSource = new MatTableDataSource<PeriodicElement>(PKG_ELEMENT_DATA);
      // @ts-ignore
      this.pkgDataSource.paginator = this.paginatorSystem;
    }, e => {
      console.error(e)
    });
  }

  private async getNextSystemData(offset: number, limit: number) {
    const data = {
      offset,
      limit,
    };
    firstValueFrom(this.http.post(API + "/api/env/list/ospkg", data).pipe(retry(3))).then(res => {
      // @ts-ignore
      const data = JSON.parse(JSON.stringify(res["data"]));
      PKG_ELEMENT_DATA.length = offset * limit;
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        const item: PeriodicElement = {package: data[i]["package"], version: data[i]["version"]};
        PKG_ELEMENT_DATA.push(item);
      }
      this.loading = false;
      // @ts-ignore
      PKG_ELEMENT_DATA.length = res["total"];
      this.pkgDataSource = new MatTableDataSource<PeriodicElement>(PKG_ELEMENT_DATA);
      this.pkgDataSource._updateChangeSubscription();
      // @ts-ignore
      this.pkgDataSource.paginator = this.paginatorSystem;
    }, e => {
      console.error(e)
    });
  }

  async getNextData(offset: number, limit: number){
    switch (this.selected.value) {
      case 0:
        await this.getNextPythonData(offset, limit);
        break;
      case 1:
        await this.getNextCppData(offset, limit);
        break;
      case 2:
        await this.getNextSystemData(offset, limit);
        break;
    }
  }

  async pageChange(event: any) {
    this.loading = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    await this.getNextData(pageIndex, pageSize);
  }

  async refresh() {
    switch (this.selected.value) {
      case 0:
        PY_ELEMENT_DATA = [];
        break;
      case 1:
        CPP_ELEMENT_DATA = [];
        break;
      case 2:
        PKG_ELEMENT_DATA = []
        break;
    }
    this.pythonDataSource._updateChangeSubscription();
    this.cppDataSource._updateChangeSubscription();
    this.pkgDataSource._updateChangeSubscription();
    await this.getNextData(this.pageIndex, this.pageSize);
  }

  async reload() {
    let url;
    switch (this.selected.value) {
      case 0:
        url = "/api/env/reload/python"
        break;
      case 1:
        url = "/api/env/reload/cpp"
        break;
      case 2:
        url = "/api/env/reload/ospkg"
        break;
    }
    firstValueFrom(this.http.get(API + url).pipe(retry(3))).then(res => {
      console.log(res);
    }, e => {
      console.error(e)
    });
  }

  async tabChange(event: any) {
    this.selected.setValue(event)
    switch (this.selected.value) {
      case 0:
        if (PY_ELEMENT_DATA.length === 0) {
          await this.getData(0, 10);
        } else {
          await this.getNextData(this.pageIndex, this.pageSize);
        }
        break;
      case 1:
        if (CPP_ELEMENT_DATA.length === 0) {
          await this.getData(0, 10);
        } else {
          await this.getNextData(this.pageIndex, this.pageSize);
        }
        break;
      case 2:
        if (PKG_ELEMENT_DATA.length === 0) {
          await this.getData(0, 10);
        } else {
          await this.getNextData(this.pageIndex, this.pageSize);
        }
        break;
    }
  }
}
