import { Component, OnInit } from '@angular/core';
import { promisify } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Kate Metelova page';


  ngOnInit() {
    const fn = this.compose(this.getData, this.filterData, this.mapData, this.showData);
    const res = fn([1, 93, 19, 33, 12, 10]);
    console.log(res);


    const promisifyFn = this.promisify(this.fnAsync);
    promisifyFn.then(console.log('callback function'));
  }

  promisify(fnAsync): any {
    return new Promise((resolve, reject) => {
      fnAsync(resolve);
    });
  }

  fnAsync(cb) {
    setTimeout(cb, 5000);
  }

  compose(...args): any {
    return (data) => args.reduce((res, fn) => {
      return fn(res);
    }, data);
  }

  getData(data) {
    return data;
  }

  filterData(data) {
    return data.filter((el) => el > 20);
  }

  mapData(data) {
    return data.map((el) => el * 100);
  }

  showData(data) {
    return `Result: [${ data }]`;
  }
}
