import { Injectable }     from 'angular2/core';
import { Http, Response, URLSearchParams } from 'angular2/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  http: Http;
  bloodpressuredata = [
  [65, 59, 80, 81, 56, 55, 40],
  [28, 48, 40, 19, 86, 27, 90],
  [18, 48, 77, 9, 100, 27, 40]
];
  hapiUrl: string = "";
 p: URLSearchParams;


constructor ( http: Http) {
  this.http = http;
  this.hapiUrl = 'http://52.29.254.68:8080/hapi-fhir-jpaserver-example/baseDstu2/Observation';  // URL to web api
  this.p =  new URLSearchParams();
  this.p.set('patient._id', 'Ex1');
  this.p.set('_sort:desc', '_lastUpdated');
  this.p.set('code', 'http://loinc.org|55284-4');
  this.p.set('_count', '100');
}
  getBloodpressure (): Observable<string[]> {
    console.log('HTTP req');
    return this.http.get(this.hapiUrl, {
                  search: this.p
                  }).map(this.extractData);
                }
  getBP(): Array<any> {
    console.log('DataProvider');
    return this.bloodpressuredata;
  }
  add(value: Array<any>): void {
    this.bloodpressuredata.push(value);
  }
  private extractData(res: Response) {
    console.log('PARSING');
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }else{
      console.log(res.status);
      console.log(res.json());
    }
    console.log('PARSING');
    let body = res.json();
    for(var prop in res.json()) {
        if(!res.json().hasOwnProperty(prop)) {
            continue;
        }
        console.log(prop.toString());
    }
    console.log('END');
    console.log(body.data);
    return body.data || { };
  }
}
