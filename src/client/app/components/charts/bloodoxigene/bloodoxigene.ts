import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {WrapperCmp} from '../../header/header';



@Component({
  selector: 'bloodoxigene-page',
  templateUrl: 'app/components/charts/bloodoxigene/bloodoxigene.html',
  styleUrls: ['app/components/charts/bloodoxigene/bloodoxigene.css'],
  directives: [WrapperCmp,  CORE_DIRECTIVES]
})
export class BloodOxigenePage {
}
