import { Component, OnInit } from '@angular/core';
import { GrocercryService } from '../services';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { PaymentComponent } from './payment/payment.component';
import { SnackbarService } from '../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.scss']
})
export class OrderNowComponent implements OnInit {

  orderItems: any = [];

  orderTotals: any = {};



  constructor(
    private GrocercryService: GrocercryService,
    private CookieService: CookieService,
    private SnackbarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    let items = this.CookieService.get('Cart');
    if (items) {
      this.orderItems = JSON.parse(this.CookieService.get('Cart'));
      this.orderTotals = {
        subtotal: this.getSubTotal(),
        tax: this.getCalculatedTax(),
        discount: 0.0,
        total: this.getTotal()
      }
    }
  }

  pay() {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '60vw',
      minWidth: "400px",
      disableClose: true,
      closeOnNavigation: true,
      data: { price: this.orderTotals.total }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.CookieService.remove('Cart');
          this.GrocercryService.cart([]).subscribe();
          this.GrocercryService.order({ order: this.orderItems, price: this.orderTotals.total }).subscribe(
            res => {
              this.SnackbarService.openSnackBar('success', 'Payment succesfull');
              this.router.navigateByUrl('/');
            }
          )
        }
      }
    )
  }

  getSubTotal() {
    let total = 0.0;
    for (let i = 0; i < this.orderItems.length; i++) {
      total += this.orderItems[i].price * this.orderItems[i].qty;
    }
    return total;
  }

  getCalculatedTax() {
    return (0 * this.getSubTotal()) / 100;
  }

  getTotal() {
    return this.getSubTotal() + this.getCalculatedTax();
  }

}
