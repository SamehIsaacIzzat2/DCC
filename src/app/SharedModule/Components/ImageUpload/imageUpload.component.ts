import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SnackService } from '../../Services/snack.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './imageUpload.component.html',
  styleUrls: ['./imageUpload.component.scss'],
})
export class ImageUploadComponent {
  @Input() imageUrl: string | ArrayBuffer | null;
  @Input() uploadedImage: string | ArrayBuffer | null;
  @Input() fileExtensions: string[];
  @Input() maxFileSize: number;
  @Input() hoverText: string = 'Choose File';
  @Input() title: string = 'Upload Image';
  @Input() uniqueId: number;

  @Output() public onUploadImage: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fileInput') el: ElementRef;

  constructor(private snackService: SnackService) {}

  // Upload File
  uploadFile(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    // check for extension
    if (!this.fileExtensions.includes(fileExtension)) {
      this.snackService.snack(
        `please upload image which has these extensions ${this.fileExtensions.join(
          ', '
        )}`
      );
      event.target.value = null;
      return;
    }

    // check for size
    if (this.maxFileSize) {
      if (file.size / 1024 / 1024 > this.maxFileSize) {
        this.snackService.snack(
          `Please upload image with max size ${this.maxFileSize}MB`
        );
        event.target.value = null;
        return;
      }
    }

    // convert to base64
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadedImage = reader.result;
        this.onUploadImage.emit(reader.result);
      };
    }
  }
}
