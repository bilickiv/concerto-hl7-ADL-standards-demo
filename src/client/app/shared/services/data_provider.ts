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
  hapiUrl: string = '';
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
  private extractData(res: Response) {
    let measurements: Array<any> = [];
    console.log('PARSING -- 2');
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    } else {
      console.log(res.status);
      //console.log(res.json());
    }
    console.log('PARSING --  3');
    console.log(res.json());
    let thisResource:any;
    thisResource = res.json();
    console.log('PARSING --  4');
    console.log(thisResource.resourceType);
    console.log(thisResource.id);
    console.log(thisResource.entry);
    for(var e of thisResource.entry)
    {
      console.log(e.resource);
      measurements.push(e.resource);
    }
    console.log('END PARSING --- 3');
    return measurements;
  }

}
