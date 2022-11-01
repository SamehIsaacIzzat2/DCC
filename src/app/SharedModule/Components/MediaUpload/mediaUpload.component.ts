import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MediaUploadModel } from './mediaUpload.model';

@Component({
  selector: 'app-media-upload',
  templateUrl: './mediaUpload.component.html',
  styleUrls: ['./mediaUpload.component.scss'],
  providers: [MediaUploadModel],
})
export class MediaUploadComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public set mediaLink(value: string) {
    this.model.mediaLink = value;
  }
  @Input() public set mediaType(value: string) {
    this.model.mediaType = value;
  }
  @Input() public set maxFileSize(value: number) {
    this.model.maxFileSize = value;
  }
  @Input() public set allowedExtensions(value: string[]) {
    this.model.allowedExtensions = value;
  }
  @Output() public onUpload: EventEmitter<void> = new EventEmitter<void>();

  constructor(public model: MediaUploadModel) {}

  ngAfterViewInit() {
    this.model.onUpload.subscribe((data: any) => this.onUpload.emit(data));
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (
      (this.model.mediaType === 'image' &&
        this.model.uploadedFile.type !== 'image') ||
      (this.model.mediaType === 'video' &&
        this.model.uploadedFile.type !== 'video')
    ) {
      this.model.onUpload.emit(null);
      this.model.uploadedFile.src = null;
    }
  }
}
