import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }
}
