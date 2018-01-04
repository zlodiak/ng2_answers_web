import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  getNowDate(): Object {
    let d = new Date();
    d.setHours(d.getHours() + 3);
    let dateHuman = d.toISOString();
    let unixTimeStamp = Math.floor(d.getTime() / 1000);

    return {
      dateHuman: dateHuman,
      unixTimeStamp: unixTimeStamp
    };
  };

  fromUnixToHuman(unixDate): string {
    let a = new Date(unixDate * 1000);
    //let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let months = ['Янв','Фев','Мар','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  };

  stringToUnix(str): number {
    return (new Date(str).getTime() / 1000);
  };

  secondsToHuman(x): string {
    let h = Math.floor(x / 3600);
    let m = (Math.floor(x / 60) - (Math.floor(x / 3600) * 60));
    let s = x % 60;

    let result: string = '';

    if(h == 0 && m == 0) {
      result = ''+s;
    } else if(h == 0) {
      result = ''+(m + " : " + s);
    } else {
      result = ''+(h + " : " + m + " : " + s);
    }

    return result;
  };

}
