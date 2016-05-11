import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {WrapperCmp} from '../../header/header';
import {WeightChart} from './weight-chart';


@Component({
  selector: 'weightpage',
  templateUrl: 'app/components/charts/weight/weight.html',
  styleUrls: ['app/components/charts/weight/weight.css'],
  directives: [WrapperCmp,  CORE_DIRECTIVES, WeightChart]
})
export class WeightPage {
}
