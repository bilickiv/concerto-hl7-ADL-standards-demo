import {Measurement} from './measurement';
import { Injectable } from '@angular/core';

@Injectable()
export class DataSource {

measurements: Measurement[];
m:Measurement;
constructor() {
  this.m = {date:'October 13, 2014 11:13:00',description:'1'};
  this.measurements = [];
  this.measurements.push(this.m);
}
 getMeasurements() {
    return this.measurements;
  }
}
