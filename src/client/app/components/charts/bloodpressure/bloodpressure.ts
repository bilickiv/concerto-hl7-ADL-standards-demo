import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {WrapperCmp} from '../../header/header';



@Component({
  selector: 'bloodpressure',
  templateUrl: 'app/components/charts/bloodpressure/bloodpressure.html',
  styleUrls: ['app/components/charts/bloodpressure/bloodpressure.css'],
  directives: [WrapperCmp, CORE_DIRECTIVES]
})
export class BloodPressurePage {
}
