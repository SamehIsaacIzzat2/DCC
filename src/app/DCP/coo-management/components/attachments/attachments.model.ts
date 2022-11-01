import { Injectable } from '@angular/core';
import { FileData } from '../../../../SharedModule/Components/fileUpload/interface';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { SnackService } from 'src/app/SharedModule/Services/snack.service';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { LookupService } from 'src/app/SharedModule/Services/lookup.service';
import { takeUntil, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class AttachmentsModel {
  endSub$ = new Subject();

  public attachments: any[] = [];

  constructor(
    private apiSer: APICallerService,
    private snakSer: SnackService,
    public lookupSer: LookupService,
    private translate: TranslateService
  ) {
    this.getRequiredDocuments();
  }
  ngOnInit(): void {}

  saveData() {
    this.attachments.forEach((attachment) => {
      if (
        (attachment.isMandatory && attachment.files.length == 0) ||
        (attachment.filesCount &&
          attachment.files.length != attachment.filesCount)
      ) {
        this.snakSer.snack(
          this.translate.instant('shared.generalWord.requiredData')
        );
        return false;
      }
    });
    return true;
  }

  getRequiredDocuments() {
    const servicesConfigs$ =
      this.lookupSer.getServicesConfigs('New Membership');
    servicesConfigs$.pipe(takeUntil(this.endSub$)).subscribe((configs) => {
      this.apiSer
        .get(APIs.coo.requiredDocuments + '/' + configs[0].id)
        .subscribe((data) => {

          if (!data.isError) {
            data.result.forEach((item: any) => {
              this.attachments.push({
                documentName: item.documentName,
                documentEnglishName: item.documentEnglishName,
                description: item.descriptions,
                allowedExtenstionsList: item.allowedExtenstionsList,
                noOfAttachments: item.noOfAttachments,
                isMandatory: item.isMandatory,
                files: [],
              });
            });
          }
        });
    });
  }

  public upload(files: FileData[]) {
    for (let index = 0; index < this.attachments.length; index++) {
      for (let index2 = 0; index2 < files.length; index2++) {
        if (
          this.attachments[index].documentName == files[index2].documentName
        ) {
          this.attachments[index].files.push({
            documentName: this.attachments[index].documentName,
            fileName: files[index2].fileName,
            content: files[index2].content,
          });
        }
      }
    }
    console.log(this.attachments);
  }
}
