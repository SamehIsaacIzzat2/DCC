import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SnackService } from '../../Services/snack.service';
import {FileData} from './interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./fileUpload.component.scss'],
})
export class FileUploadComponent {
  @Input() fileExtensions: string[];
  @Input() maxFileSize: number;
  @Input() description: string = 'Choose File';
  @Input() extensions: string = 'Upload Image';
  @Input() document: string = '';
  @Input() uniqueId: number = Math.random()*100;

  @Output() public onUploadImage: EventEmitter<any> = new EventEmitter<any>();
  @Output() filesToSend: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fileInput') el: ElementRef;
  files: any[] = [];
  converting: any[] = [];
  constructor(private snackService: SnackService,private translate:TranslateService) {}

  // Upload File
  uploadFile(event: any) {
    const file = event.target.files[0];
    // check for extension
    if(!this.extensions.replace(/ /g,'').toLowerCase().split(';').includes(file.name.split('.')[1])){
      this.snackService.snack(
        this.translate.instant('memberShipsModule.documents.extensionsError')
      );
      return;
    }
    // check for size
    if (this.maxFileSize) {
      if (file.size / 1024 / 1024 > this.maxFileSize) {
        this.snackService.snack(
          `${this.translate.instant('memberShipsModule.documents.maxSizeError')} ${this.maxFileSize}MB`
        );
        event.target.value = null;
        return;
      }
    }
    this.files.push(file);
    this.covertToByte(this.files);
  }

  async addFile(file: any) {
    this.files.push(file);
    await this.covertToByte(this.files);
  }

  async removeFile(file: any) {
    this.files.splice(this.files.indexOf(file), 1);
    await this.covertToByte(this.files);
  }

  //convert file to byte
  async covertToByte(files: any) {
    let uploadedFiles : FileData[] = [];
    for(let i=0;i<files.length;i++){
      // const buffer = await files[i].arrayBuffer();
      // let byteArray = new Int8Array(buffer);

      const toBase64 = (file:any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      uploadedFiles.push({
        fileName : files[i].name,
        content : await toBase64(files[i]),
        documentName: this.document
      })
    }
    this.filesToSend.emit(uploadedFiles);
  }


}
