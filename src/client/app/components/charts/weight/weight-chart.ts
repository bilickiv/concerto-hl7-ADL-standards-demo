import {Component, OnInit, Input} from 'angular2/core';
import {CORE_DIRECTIVES,FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';


@Component({
  selector: 'weightchart',
  templateUrl: 'app/components/charts/weight/weight-chart.html',
  //styleUrls: ['app/components/charts/weight/weight-chart.css'],
  properties: ['lineChartData', 'lineChartLabels', 'lineChartSeries', 'lineChartOptions',
 'lineChartColours','lineChartLegend','lineChartType'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class WeightChart {

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
  chartClicked(e:any) {
    console.log(e);
  }

  chartHovered(e:any) {
    console.log(e);
  }
  constructor() {
    this.lineChartData = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [18, 48, 77, 9, 100, 27, 40]
  ];
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    this.lineChartSeries = ['Series A', 'Series B', 'Series C'];
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
   randomize() {
     console.log(this.lineChartData);
    let _lineChartData:Array<any> = [];
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = [];
      for (let j = 0; j < this.lineChartData[i].length; j++) {
        _lineChartData[i].push(Math.floor((Math.random() * 100) + 1));

      }
    }
    this.lineChartData = _lineChartData;
    console.log('done randomization');

  }
  ngOnInit() {
        console.log('On INIT');
    }

  // events


}
