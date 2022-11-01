import { Component, OnInit, Input, } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() tabs: any[];
  public activeTab:any;
  public selectedIndex=0;
  public prevRoute="";
  public nextRoute="";

  constructor() { }

  ngOnInit(): void {
    this.activeTab=this.tabs[0];
    this.prevRoute=this.tabs[0].url;
    this.nextRoute=this.tabs[1].url;
  }

  public prev():void{
    if(this.selectedIndex>0){
      this.nextRoute=this.tabs[this.selectedIndex].url;
      this.selectedIndex--;
      this.activeTab=this.tabs[this.selectedIndex];
      this.prevRoute=this.selectedIndex>0?this.tabs[this.selectedIndex-1].url:this.tabs[this.selectedIndex].url;
    }
  }

  public next(){
    if(this.selectedIndex<this.tabs.length-1){
      this.prevRoute=this.tabs[this.selectedIndex].url;
      this.selectedIndex++;
      this.activeTab=this.tabs[this.selectedIndex];
      this.nextRoute=this.selectedIndex<this.tabs.length-1?this.tabs[this.selectedIndex+1].url:this.activeTab.url;
    }
  }

}
