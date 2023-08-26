import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { API } from "../app.conf";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  uploadSub: Subscription[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  @ViewChild("fileDropRef", {static: false}) fileDropEl: ElementRef | undefined;
  public files: any[] = [];
  public fileIndex: number = 0;




  onFileDropped(fileList: FileList) {
    this.fileIndex = this.files.length;
    if (fileList !== null) {
      this.prepareFilesList(fileList[0]);
    }
  }

  fileBrowseHandler(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.fileIndex = this.files.length;
    if (fileList !== null) {
      this.prepareFilesList(fileList[0]);
    }
  }

  prepareFilesList(file: Object) {
    if (file !== null) {
      // @ts-ignore
      const filename_list = file.name.split('.');
      if (filename_list[filename_list.length - 1] === "zip") {
        // @ts-ignore
        file.progress = 0;
        this.files.push(file);
        // @ts-ignore
        this.fileDropEl.nativeElement.value = "";
        this.uploadFilesSimulator(this.fileIndex);
      } else {
        this.dialog.open(AlertDialogFiletype);
      }
    }
  }

  uploadFilesSimulator(index: number) {
    // console.log("uploadFilesSimulator");
    this.uploadSub[index] = this.upload(this.files[index]).subscribe(
      event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.files[index].progress = Math.round(100 * (event.loaded / event.total));
        }
      },
    );
    if (this.uploadSub[index] !== undefined) {
      this.fileIndex += 1;
      // console.log("this.fileIndex:", this.fileIndex);
    }

  }

  upload(file: Object): Observable<any> {
    const formData = new FormData();
    // @ts-ignore
    formData.append("file", file, file.name);
    // console.log(file)
    let url = ""
    switch (this.upload_selected) {
      case "ota":
        url = (API + "/api/update");
        break;
      case "offline":
        url = (API + "/api/offline/upload");
        break;
      // case "python":
      //   url = (API + "/api/env/python/update");
      //   break;
    }
    // const url = this.upload_selected === "ota" ? (API + "/api/update") : (API + "/api/offline/upload");
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  cancelUpload(index: number) {
    if (this.uploadSub[index] !== undefined) {
      this.uploadSub[index].unsubscribe();
    }
    this.files.splice(index, 1);
    this.uploadSub = this.uploadSub.filter(item => item !== this.uploadSub[index]);
  }
}

@Component({
  selector: 'alert-dialog-filetype',
  styleUrls: ['alert-dialog-filetype.scss'],
  templateUrl: 'alert-dialog-filetype.html',
})
export class AlertDialogFiletype {
}
