import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {WrapperCmp} from '../../header/header';


@Component({
  selector: 'hrv',
  templateUrl: 'app/components/charts/hrv/hrv.html',
  styleUrls: ['app/components/charts/hrv/hrv.css'],
  directives: [WrapperCmp,  CORE_DIRECTIVES]
})
export class HrvPage {
}
