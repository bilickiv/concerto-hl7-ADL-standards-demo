import {Component} from 'angular2/core';
import {CORE_DIRECTIVES,FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {WrapperCmp} from '../../header/header';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';



@Component({
  selector: 'weight',
  templateUrl: 'app/components/charts/weight/weight.html',
  styleUrls: ['app/components/charts/weight/weight.css'],
  directives: [WrapperCmp,  CORE_DIRECTIVES, LineChartDemo]
})
export class WeightPage {
}


//let template = require('./weight.html');

@Component({
  selector: 'line-chart-demo',
  template: `<base-chart class="chart"
              [data]="lineChartData"
              [labels]="lineChartLabels"
              [options]="lineChartOptions"
              [series]="lineChartSeries"
              [colours]="lineChartColours"
              [legend]="lineChartLegend"
              [chartType]="lineChartType"
            ></base-chart>`,
  properties: ['lineChartData', 'lineChartLabels', 'lineChartSeries', 'lineChartOptions',
 'lineChartColours','lineChartLegend','lineChartType'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class LineChartDemo {

  // lineChart
   lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90],
    [18, 48, 77, 9, 100, 27, 40]
  ];
   lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
   lineChartSeries:Array<any> = ['Series A', 'Series B', 'Series C'];
   lineChartOptions:any = {
    animation: false,
    responsive: true,
    multiTooltipTemplate: ''
  };
   lineChartColours:Array<any> = [
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
   lineChartLegend:boolean = true;
   lineChartType:string = 'Line';
  chartClicked(e:any) {
    console.log(e);
  }

  chartHovered(e:any) {
    console.log(e);
  }
  constructor() {
    console.log('line demo');
  }
   randomize() {
    let _lineChartData:Array<any> = [];
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = [];
      for (let j = 0; j < this.lineChartData[i].length; j++) {
        _lineChartData[i].push(Math.floor((Math.random() * 100) + 1));

      }
    }
    this.lineChartData = _lineChartData;
  }

  // events


}
