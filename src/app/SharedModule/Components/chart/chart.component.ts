import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { IchartData } from './interfaces';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: IchartData[];
  @Input() totalRequest: number;
  public precentageArray: number[];
  public doughnutChartData: ChartData<'doughnut'>;
  // Doughnut
  // public doughnutChartLabels: string[] = [
  //   'Required action',
  //   'Waiting',
  //   'Interested',
  //   'Closed',
  // ];

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions = {
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    // responsive: false,
    // cutout: 100,
  };

  // Bar chart
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        display: false,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public barChartData: ChartData<'bar'> = {
    labels: [
      'Complaint',
      'New Membership',
      'Membership Renew',
      'Business  Matching',
      'Legal Services',
    ],
    datasets: [
      {
        data: [6, 2, 5.5, 6, 4],
        label: 'Times',
        backgroundColor: [
          '#1D4861',
          '#1D4861',
          '#1D4861',
          '#1D4861',
          '#1D4861',
        ],
        hoverBackgroundColor: [
          '#1D4861',
          '#1D4861',
          '#1D4861',
          '#1D4861',
          '#1D4861',
        ],
      },
    ],
  };

  constructor(public langSer:LanguageService) {
    
  }
  ngOnChanges(changes: SimpleChanges): void {    
    let values=this.data.map((item)=>{return item.percentage});
    this.precentageArray=values.map(item =>Math.ceil(item/this.totalRequest*100))
    console.log(this.precentageArray)
    this.doughnutChartData= {
      // labels: this.doughnutChartLabels,z
      datasets: [
        {
          data: this.precentageArray,
          backgroundColor: ['#E86D38', '#FFC700', '#A73439', '#D9D9D9'],
          hoverBackgroundColor: ['#E86D38', '#FFC700', '#A73439', '#D9D9D9'],
          borderWidth: 0,
        },
      ],
    };
  }
  ngOnInit(): void {}
}
