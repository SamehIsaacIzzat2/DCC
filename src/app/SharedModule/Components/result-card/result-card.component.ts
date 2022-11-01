import { LanguageService } from 'src/app/SharedModule/Services/language.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, take } from 'rxjs';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { SnackService } from '../../Services/snack.service';
import { CardData, RateRequest } from './Iresult-card';

@Component({
  selector: 'result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit {

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
  constructor(private active:ActivatedRoute,private apiSer: APICallerService,
    private snackService: SnackService,private langSer:LanguageService
    ) {
    this.getId();
  }

  ngOnInit(): void {
  }

  btnClick(){
    this.Click.emit();
  }

  // to make rate
  counter(i: number) {
    return new Array(i);
  }

  setRate(index:any){
    console.log("this is the rate :> ", index);
    this.flags=[
      true,
      false,
      false,
      false,
      false,
    ];
    this.flags.fill(true,0,index+1);
    let apiPath=APIs.requests.rate;
    let rateRequest :RateRequest = new RateRequest();
    rateRequest.rate = index+1;
    rateRequest.requestNumber = this.id;
    this.apiSer.post(apiPath,rateRequest).subscribe(result=>{
      if (result.result.isSucceed) {
        this.snackService.snack(this.langSer.toggleVal("Thank you for rating Request","شكرا علي طلب تقييمك"));
      }
      else
      {
        this.snackService.snack(this.langSer.toggleVal("error in rating request !!","حدث خطأ في طلب التقييم !!"));
      }

    })
  }

  getId() {
    this.active.params.pipe(take(1),pluck('id')).subscribe(id => {
      this.id = id;
    })
  }
}
