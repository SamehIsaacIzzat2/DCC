import { Injectable } from '@angular/core';
import { APIs } from 'src/app/CallerModule/Data/APIs';
import { APICallerService } from 'src/app/CallerModule/Services/APICaller.service';
import { AuthenticationService } from 'src/app/CallerModule/Services/authentication.service';
import { WidgetMode } from 'src/app/SharedModule/Components/Widget/enums';
import { IWidget } from './../../../SharedModule/Components/Widget/iWidget';
import { DashboardWidgetsTag } from './enums';

@Injectable()
export class DashboardWidgetListModel {

  //=========================Data=====================
  public widgets: Array<IWidget> = new Array<IWidget>();

  constructor(private authService: AuthenticationService, private apicaller: APICallerService) {
    if(this.authService.isCallCenter() || this.authService.isOperationManager()) 
      this.initCallCenterBlocks();
  }

  // Initialize Call Center Blocks
  private initCallCenterBlocks() {
    this.widgets = [
      {
        title: "Created Orders",
        text: "",
        tag: DashboardWidgetsTag.CreatedOrders,
        mode: WidgetMode.Block,
        isVisible: true,
        url: "",
        background: "#70A83E",
        color: "#fff",
        icon: "add_shopping_cart",
        isClickable: false,
        isSelectable: false
      },
      {
        title: "Cancelled Orders",
        text: "",
        tag: DashboardWidgetsTag.CancelledOrders,
        mode: WidgetMode.Block,
        isVisible: true,
        url: "",
        background: "#f44336",
        color: "#fff",
        icon: "remove_shopping_cart",
        isClickable: false,
        isSelectable: false
      },
      {
        title: "Delivered Orders",
        text: "",
        tag: DashboardWidgetsTag.DeliveredOrders,
        mode: WidgetMode.Block,
        isVisible: true,
        url: "",
        background: "rgb(152,211,100)",
        color: "#fff",
        icon: "check_circle",
        isClickable: false,
        isSelectable: false
      },
      {
        title: "Out For Delivery Orders",
        text: "",
        tag: DashboardWidgetsTag.OutForDeliveryOrders,
        mode: WidgetMode.Block,
        isVisible: true,
        url: "",
        background: "rgb(209,50,39)",
        color: "#fff",
        icon: "report_problem",
        isClickable: false,
        isSelectable: false
      },
      {
        title: "Attempt To Delivery Orders",
        text: "",
        tag: DashboardWidgetsTag.AttemptToDeliveryOrders,
        mode: WidgetMode.Block,
        isVisible: true,
        url: "",
        background: "rgb(119,134,207)",
        color: "#fff",
        icon: "shopping_cart",
        isClickable: false,
        isSelectable: false
      },
      {
        title: "Confirmed Orders",
        text: "",
        tag: DashboardWidgetsTag.ConfirmedOrders,
        mode: WidgetMode.Block,
        isVisible: true,
        url: "",
        background: "rgb(131,227,46)",
        color: "#fff",
        icon: "shopping_basket",
        isClickable: false,
        isSelectable: false
      },
      {
        title: "Donations",
        text: "0",
        tag: DashboardWidgetsTag.Donations,
        mode: WidgetMode.Block,
        isVisible: true,
        url: "",
        background: "rgb(112, 168, 62)",
        color: "#fff",
        icon: "favorite_border",
        isClickable: false,
        isSelectable: false
      },
      {
        title: "Successful Refund Requests",
        text: "0",
        tag: DashboardWidgetsTag.Refund,
        mode: WidgetMode.Block,
        isVisible: true,
        url: "",
        background: "#ef0000",
        color: "#fff",
        icon: "attach_money",
        isClickable: false,
        isSelectable: false
      }
    ];
  }

  // Load Call Center Counts
  public loadCallCenterCounts() {
    this.loadCreatedOrdersCount();
    this.loadCancelledOrdersCount();
    this.loadDeliveredOrdersCount();
    this.loadOutForDeliveryOrdersCount();
    this.loadAttemptToDeliveryOrdersCount();
    this.loadConfirmedOrdersCount();
    this.loadDonationOrders();
    this.loadPendingRefundRequests();

  }

   // Load Donation Orders Count
   public loadDonationOrders() {
    this.apicaller.get(APIs.DonationOrder.GetTodayCreatedCount).subscribe(res => {
      if (!res.isError) {
        this.widgets.forEach(widget => {
          if(widget.tag == DashboardWidgetsTag.Donations) 
            widget.text = res.result;
        })
      }
    });
  }
  // Load Donation Orders Count
  public loadPendingRefundRequests() {
   this.apicaller.get(APIs.Refund.GetNumberOfRefundRequests).subscribe(res => {
     if (!res.isError) {
       this.widgets.forEach(widget => {
         if(widget.tag == DashboardWidgetsTag.Refund) 
           widget.text = res.result.countSucceded;
       })
     }
   });
  }

  // Load Created Orders Count
   public loadCreatedOrdersCount() {
    this.apicaller.get(APIs.OrderStatistics.GetCreatedOrdersCount).subscribe(res => {
      if (!res.isError) {
        this.widgets.forEach(widget => {
          if(widget.tag == DashboardWidgetsTag.CreatedOrders) 
            widget.text = res.result;
        })
      }
    });
  }

  // Load Cancelled Orders Count
  public loadCancelledOrdersCount() {
    this.apicaller.get(APIs.OrderStatistics.GetCancelledOrdersCount).subscribe(res => {
      if (!res.isError) {
        this.widgets.forEach(widget => {
          if(widget.tag == DashboardWidgetsTag.CancelledOrders) 
            widget.text = res.result;
        })
      }
    });
  }

  // Load Delivered Orders Count
  public loadDeliveredOrdersCount() {
    this.apicaller.get(APIs.OrderStatistics.GetDeliveredOrdersCount).subscribe(res => {
      if (!res.isError) {
        this.widgets.forEach(widget => {
          if(widget.tag == DashboardWidgetsTag.DeliveredOrders) 
            widget.text = res.result;
        })
      }
    });
  }

  // Load OutForDelivery Orders Count
  public loadOutForDeliveryOrdersCount() {
    this.apicaller.get(APIs.OrderStatistics.GetOutForDeliveryOrdersCount).subscribe(res => {
      if (!res.isError) {
        this.widgets.forEach(widget => {
          if(widget.tag == DashboardWidgetsTag.OutForDeliveryOrders) 
            widget.text = res.result;
        })
      }
    });
  }

  // Load AttemptToDelivery Orders Count
  public loadAttemptToDeliveryOrdersCount() {
    this.apicaller.get(APIs.OrderStatistics.GetAttemptToDeliveryOrdersCount).subscribe(res => {
      if (!res.isError) {
        this.widgets.forEach(widget => {
          if(widget.tag == DashboardWidgetsTag.AttemptToDeliveryOrders) 
            widget.text = res.result;
        })
      }
    });
  }

  // Load Confirmed Orders Count
  public loadConfirmedOrdersCount() {
    this.apicaller.get(APIs.OrderStatistics.GetConfirmedOrdersCount).subscribe(res => {
      if (!res.isError) {
        this.widgets.forEach(widget => {
          if(widget.tag == DashboardWidgetsTag.ConfirmedOrders) 
            widget.text = res.result;
        })
      }
    });
  }

}
