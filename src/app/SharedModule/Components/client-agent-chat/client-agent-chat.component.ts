import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChatMessage } from 'src/app/DCP/membership-managment/components/request-result-actions/Interfaces/ChatMessage';
import { ClientAgentChatModel } from './client-agent-chat.model';

@Component({
  selector: 'client-agent-chat',
  templateUrl: './client-agent-chat.component.html',
  styleUrls: ['./client-agent-chat.component.scss'],
  providers:[ClientAgentChatModel]
})
export class ClientAgentChatComponent implements OnInit ,OnChanges {

  //************************************Inputs & Outputs************************************* */
  @Input() chatMessages:ChatMessage[]=[];
  @Output() SendMessage:EventEmitter<any>=new EventEmitter<any>();
  
  constructor(public model:ClientAgentChatModel) { 

   
  }
  ngOnChanges(changes: SimpleChanges): void {
  this.model.SendMessage=this.SendMessage;  }

  ngOnInit(): void {
  }

}
