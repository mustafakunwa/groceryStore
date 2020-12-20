import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { GrocercryService } from '../services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['#', '_id', 'price', 'actions'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private GrocercryService: GrocercryService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.GrocercryService.getAllOrder().subscribe(
      res => {
        if (res && res.length > 0) {
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    )
  }

}
