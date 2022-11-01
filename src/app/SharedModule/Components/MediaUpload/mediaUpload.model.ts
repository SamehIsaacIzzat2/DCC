import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { SnackService } from '../../Services/snack.service';

@Injectable()
export class MediaUploadModel {
  //=========================Data=======================
  @Input() mediaLink: string;
  @Input() mediaType: string; // image or video
  @Input() maxFileSize: number; // MB
  @Input() allowedExtensions: string[];

  public uploadedFile: {
    src: string | ArrayBuffer | null;
    type: string;
  } = { src: '', type: '' };
  public imageExtensions = ['jpeg', 'jpg', 'png', 'tiff'];
  public videoExtensions = [
    'webm',
    'mpg',
    'mp2',
    'mpeg',
    'mpe',
    'mpv',
    'ogg',
    'mp4',
    'm4p',
    'm4v',
    'avi',
    'wmv',
    'mov',
    'flv',
    'swf',
    'avchd',
  ];

  //=======================Events=======================
  @Output() public onUpload: EventEmitter<any> = new EventEmitter<any>();

  //======================Constructor===================
  constructor(private snackService: SnackService) {}

  //=======================Logic=======================
  // Upload file
  uploadFile(event: any) {
    if (!this.allowedExtensions || this.allowedExtensions.length === 0) {
      this.snackService.snack('Please select your media file type first');
      event.target.value = null;
      return;
    }

    if (!event.target.files || !event.target.files[0]) {
      event.target.value = null;
      return;
    }

    this.mediaLink = '';
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (file.size / 1024 / 1024 > this.maxFileSize) {
      this.snackService.snack('Please upload file with max size 2MB');
      event.target.value = null;
      return;
    }

    if (!this.allowedExtensions.includes(fileExtension)) {
      this.snackService.snack(
        `please upload file which has these extensions ${this.allowedExtensions.join(
          ', '
        )}`
      );
      event.target.value = null;
      return;
    }

    if (this.imageExtensions.includes(fileExtension)) {
      this.uploadedFile.type = 'image';
    } else if (this.videoExtensions.includes(fileExtension)) {
      this.uploadedFile.type = 'video';
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedFile.src = reader.result;
    };
    this.onUpload.emit(file);
  }
}
