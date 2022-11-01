import { Injectable } from '@angular/core';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { TokenService } from './../../CallerModule/Services/token.service';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  //=================constructor================
  constructor(
    private apiCaller: APICallerService,
    private tokenService: TokenService
  ) {}

  //==================Logic=====================

  // Export
  public export(apiPath: string, fileName: string) {
    this.showLoader();
    fetch(this.apiCaller.domainName + '/' + apiPath, {
      headers: { Authorization: 'Bearer ' + this.tokenService.AccessToken },
    })
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = `${fileName}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        this.hideLoader();
      });
  }

  // Export
  // public export(res: any, fileName: string) {
  // console.log(typeof(res))
  // // const blob =  res.blob();
  //  const blob = new Blob([res]);
  // const url = URL.createObjectURL(blob);
  // console.log("url ", url)
  // var link = document.createElement("a");
  // link.setAttribute("href", url);
  // link.setAttribute("download", `${fileName}.xlsx`);
  // link.style.display = "none";
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
  //}

  // // Export
  // public export(res: any, fileName: string) {
  // //     var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //   const blob =  new Blob([res]);
  // //     //const blob =  new Blob([this.s2ab(atob(res))]);
  // //     // const blob =  new Blob([btoa(res)], { type: contentType });
  //     const url = URL.createObjectURL(blob);
  //     console.log("url ", url)
  // //   var link = document.createElement("a");
  // //   //  link.setAttribute("href", 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8,' + encodeURI(url));
  // //     // link.setAttribute("href", 'application/csv;charset=UTF-8;' + encodeURI(url));
  // //     link.setAttribute("href", 'data:application/xls;base64,' + btoa(url));
  // //     link.setAttribute("download", `${fileName}.xlsx`);
  // //     // link.style.display = "none";
  // //     // document.body.appendChild(link);
  // //     link.click();
  //     // document.body.removeChild(link);
  //     // OR you can save/write file locally.
  //    // fs.writeFileSync(`${fileName}.xlsx`, res);
  //   // saveAs(blob, "hello world.txt");
  //   FileSaver.saveAs(blob, 'Export.xlsx');
  // }

  public s2ab(s: any) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  // Show Loader
  private showLoader() {
    let loader = document.getElementById('part-loader');
    if (loader) loader.style.display = 'flex';
  }

  // Hide Loader
  private hideLoader() {
    let loader = document.getElementById('part-loader');
    if (loader) loader.style.display = 'none';
  }
}
