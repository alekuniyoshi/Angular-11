import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginator: any;

  pages: number[];
  since: number;
  to: number;

  constructor() { }

  ngOnInit(): void {
    this.iniPaginator();
  }

  ngOnChanges(change: SimpleChanges): void {

    let paginatorUpdated = change['paginator'];
    if (paginatorUpdated.previousValue) {
      this.iniPaginator();
    }
  }

  private iniPaginator(): void {
    this.since = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
    this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);

    if (this.paginator.totalPages > 5) {
      this.pages = new Array(this.to - this.since + 1).fill(0).map((_valor, index) => index + this.since);
    } else {
      this.pages = new Array(this.paginator.totalPages).fill(0).map((_valor, index) => index + 1);
    }
  }

}
