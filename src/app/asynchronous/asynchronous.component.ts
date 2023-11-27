import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asynchronous',
  templateUrl: './asynchronous.component.html',
  styleUrls: ['./asynchronous.component.scss']
})
export class AsynchronousComponent implements OnInit {

  timeoutResponse: string = 'test'

  constructor() { }

  ngOnInit(): void {
  }

  checkSetTimeout(): void {
    setTimeout(() => {
      this.timeoutResponse = 'setTimeoutCheck';
    }, 1000);
  }

}
