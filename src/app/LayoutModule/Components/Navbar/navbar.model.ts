import { Router } from '@angular/router';
import { ModalService } from '../../../SharedModule/Components/Modal/modal.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IModal } from '../../../SharedModule/Components/Modal/iModal';
import { AuthenticationService } from '../../../CallerModule/Services/authentication.service';
import { LanguageService } from 'src/app/SharedModule/Services/language.service';

@Injectable()
export class NavbarModel {
  //======================Data=======================

  //===================Constructor====================
  constructor(
    private router: Router,
    private modalService: ModalService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private langSer:LanguageService
  ) {}

  //======================Logic=======================

  // Open Confirm Modal
  public openConfirmModal() {
    let modal: IModal = {
      title: 'Hi Esraa',
      text: 'Welcome in NOVA',
    } as IModal;
    this.modalService.confirm(modal, () => {});
  }
  // Toggle Current Language
  toggleLang() {
    let toggledLang = this.langSer.toggleVal('ar','en');
    this.langSer.setLangInLocalStorage(toggledLang);
    // this.langSer.useLang(toggledLang);
    // i can use onlangChange to enhance reload
    location.reload();
  }

  // Logout
  public logout() {
    this.authService.signOut();
    this.router.navigate(['/dcc/identity/login']);
  }
}
