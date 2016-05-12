import {Component, OnInit, Input} from 'angular2/core';
import {CORE_DIRECTIVES,FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {DataProvider} from '../../../shared/services/data_provider';
import { HTTP_PROVIDERS } from 'angular2/http';

@Component({
  selector: 'weightchart',
  templateUrl: 'app/components/charts/weight/weight-chart.html',
  //styleUrls: ['app/components/charts/weight/weight-chart.css'],
  properties: ['lineChartData', 'lineChartLabels', 'lineChartSeries', 'lineChartOptions',
 'lineChartColours','lineChartLegend','lineChartType'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
  providers:[DataProvider, HTTP_PROVIDERS ]
})
export class WeightChart {
  errorMessage:string;
d:DataProvider;
  // lineChart
   @Input() lineChartData:Array<any> = [];
  @Input() lineChartLabels:Array<any>  = [];
  @Input() lineChartSeries:Array<any>  = [];
  @Input() lineChartOptions:any = {
    animation: false,
    responsive: false
  };
  @Input() lineChartColours:Array<any>  = [];
   @Input() lineChartLegend:boolean = true;
   @Input() lineChartType:string = '';
   systole:Array<number> = [];
   diastole:Array<number> = [];
   pulse:Array<number> = [];
   labels:Array<string> = [];
  chartClicked(e:any) {
    console.log(e);
  }

  chartHovered(e:any) {
    console.log(e);
  }
  constructor( d:DataProvider) {
  this.lineChartData  = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [18, 48, 77, 9, 100, 27, 40]
  ];
    this.d = d;
    this.getBloodpressure();
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    this.lineChartSeries = ['Systole', 'Diastole', 'Pulse'];
    // this.lineChartOptions = {
    //   animation: false,
    //   responsive: true
    // };
    this.lineChartColours = [
      { // grey
        fillColor: 'rgba(148,159,177,0.2)',
        strokeColor: 'rgba(148,159,177,1)',
        pointColor: 'rgba(148,159,177,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        fillColor: 'rgba(77,83,96,0.2)',
        strokeColor: 'rgba(77,83,96,1)',
        pointColor: 'rgba(77,83,96,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(77,83,96,1)'
      },
      { // grey
        fillColor: 'rgba(148,159,177,0.2)',
        strokeColor: 'rgba(148,159,177,1)',
        pointColor: 'rgba(148,159,177,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,177,0.8)'
      }
    ];
     this.lineChartLegend = true;
     this.lineChartType = 'Line';
    console.log('line demo');
  }
  getBloodpressure() {
    console.log('1----');
  this.d.getBloodpressure()
                 .subscribe(
                   lineChartData => {
                     console.log('Itt vagyunk');
                     console.log(lineChartData);
                     this.setBloodpressure(lineChartData);
                   },
                   error =>  this.errorMessage = <any>error);
  }
  setBloodpressure(input:Array<any>) {
    console.log('2');

    for(var r of input)
    {
      console.log(r);
      this.systole.push(r.component[0].valueQuantity.value);
      this.diastole.push(r.component[1].valueQuantity.value);
      this.pulse.push(r.component[2].valueQuantity.value);
      this.labels.push(r.effectiveDateTime);
    }
    this.lineChartData = [this.systole,this.diastole,this.pulse];
    console.log(this.labels);
    this.lineChartLabels = this.labels;
  }
  ngOnInit() {
        console.log('On INIT');
    }

  // events


}
