import { Component, Directive, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { finalize, firstValueFrom, Observable, retry, Subscription } from "rxjs";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  uploadProgress: number | undefined;
  uploadSub: Subscription | undefined;

  constructor(private http: HttpClient) {
  }

  @ViewChild("fileDropRef", {static: false}) fileDropEl: ElementRef | undefined;
  public files: any[] = [];


  onFileDropped(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList !== null) {
      this.files.push(fileList[0]);
      // @ts-ignore
      this.fileDropEl.nativeElement.value = "";
      this.uploadFilesSimulator(0);
    }
  }

  fileBrowseHandler(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList !== null) {
      // this.prepareFilesList(fileList);
      this.files.push(fileList[0]);
      // @ts-ignore
      this.fileDropEl.nativeElement.value = "";
      this.uploadFilesSimulator(0);
    }
  }

  uploadFilesSimulator(index: number) {
    this.uploadSub = this.upload(this.files[index]).subscribe(
      event => {
        if (event.type == HttpEventType.UploadProgress) {
          // @ts-ignore
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          console.log(this.uploadProgress);
        }
      },
    );
  }

  upload(file: Object): Observable<any> {

    const formData = new FormData();
    // @ts-ignore
    formData.append("file", file, file.name);

    return this.http.post("/api/update", formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      finalize(() => this.reset())
    );
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
    if (this.uploadSub !== undefined) {
      this.uploadSub.unsubscribe();
    }
    this.files.splice(index, 1);
    this.reset();
  }

  reset() {
    this.uploadProgress = undefined;
    this.uploadSub = undefined;
  }
}
