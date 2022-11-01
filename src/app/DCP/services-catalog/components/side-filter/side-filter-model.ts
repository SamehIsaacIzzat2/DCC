import { Injectable } from "@angular/core";
import { APIs } from "src/app/CallerModule/Data/APIs";
import { APICallerService } from "src/app/CallerModule/Services/APICaller.service";

@Injectable()
export class SideFilterModel {

//*************Data************* */
public serviceType:any[]=[];

    constructor(private apiSer:APICallerService ) {
        this.getData();

    }

    getData() {
        this.apiSer.get(APIs.lookups.serviceTypes).subscribe((res) => {
            if(!res.isError){
                console.log(res)
                this.serviceType=res.result;
                console.log(this.serviceType)

            }
          
        })
      }
}
