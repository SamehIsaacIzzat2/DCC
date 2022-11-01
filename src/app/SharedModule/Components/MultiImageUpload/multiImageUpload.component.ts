import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SnackService } from '../../Services/snack.service';

@Component({
  selector: 'multi-image-upload',
  templateUrl: './multiImageUpload.component.html',
  styleUrls: ['./multiImageUpload.component.scss'],
})
export class MultiImageUploadComponent {
  @Input() imageUrl: string | ArrayBuffer | null;
  @Input() fileExtensions: string[] = ['image/png'];
  @Output() public onUploadImage: EventEmitter<any> = new EventEmitter<any>();
  @Input() hoverText: string = 'Choose File';
  @Input() title: string = 'Upload Image';
  @ViewChild('fileInput') el: ElementRef;

  imagesUrl: any = [];
  selectedFiles?: FileList;
  fixedFilesToSelect: number = 3;
  constructor(private snackService: SnackService) {}
  uploadFile(event: any) {
    this.selectedFiles = event.target.files;
    let size=this.imagesUrl.length + this.selectedFiles?.length
    if (size > this.fixedFilesToSelect) {
      this.snackService.snack(
        `Maximum number of images to upload is ${ this.fixedFilesToSelect }`
      );
      return
    };
    if (this.selectedFiles && this.selectedFiles[0]) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        if (!this.fileExtensions.includes(this.selectedFiles[i].type)) {
          this.snackService.snack(
            `Please upload file with these extensions ${this.fileExtensions.join(
              ','
            )}`
          );
          return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesUrl.find((item: any)=>item===e.target.result) &&
          this.snackService.snack(
            'This image is already uploaded'
          );
          this.imagesUrl.push(e.target.result);
          //remove duplicates from images array
          this.imagesUrl=[...new Set(this.imagesUrl)]
          this.onUploadImage.emit(this.imagesUrl);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  removeImg(img: string) {
    this.imagesUrl = this.imagesUrl.filter((item: string) => item !== img);
    this.onUploadImage.emit(this.imagesUrl);
  }
  resetInputValue(event:any){
    return event.target.value=null
  }
}
