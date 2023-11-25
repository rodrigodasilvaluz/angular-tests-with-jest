import { Component, OnInit } from '@angular/core';

interface ObsName {
  name: string
};

@Component({
  selector: 'app-matchers',
  templateUrl: './matchers.component.html',
  styleUrls: ['./matchers.component.scss'],
})
export class MatchersComponent implements OnInit {
  public objName = { name: 'Rodrigo' };
  public arrCondiment = [
    'bread',
    'egg',
    'milk',
    'souce',
  ]

  constructor() {}

  ngOnInit(): void {}

  calc(n1: number, n2: number): number {
    return n1 + n2;
  }

  getObject(): ObsName {
    return this.objName;
  }

  getNull(): null {
    return null;
  }

  getZero(): number {
    return 0;
  }

  getFloatNumber(): number {
    return 0.1 + 0.2;
  }

  getItemArrCondiment(index: number): string {
    return this.arrCondiment[index];
  }

  compileExeption(): void {
    throw new Error('You are using old angular version')
  }
}
