import { HttpParams } from "@angular/common/http";

export class LoaderHttpParams extends HttpParams {

  constructor(public hasLoader: boolean) {
   super();
  }
  
}