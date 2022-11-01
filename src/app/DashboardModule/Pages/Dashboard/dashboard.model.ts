import { Injectable } from "@angular/core";
import { TitleService } from "src/app/LayoutModule/Components/AdminLayout/title.service";

@Injectable()
export class DashboardModel {

    constructor(private titleService: TitleService) {
        this.setTitle();
    }

    // Set Title
    public setTitle() {
        this.titleService.setTitle('Dashboard');
    }

}