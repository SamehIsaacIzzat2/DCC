import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, take } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';


@Component({
  selector: 'request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {

  public flags=[
    false,
    false,
    false,
    false,
    false,
  ]

  //==============================Data==============================
  public clickFlag: boolean = false;


  @Input() item: any;
  @Input() id: any;
  @Input() requestId:any;
  @Input() type:string;
  @Input() showRate:boolean;
  @Input() showPay:boolean=false;

  @Output() Click=new EventEmitter();
  constructor(private active:ActivatedRoute,private apiSer: APICallerService,private langSer:LanguageService
    ) {
  }

  ngOnInit(): void {
  }

}
