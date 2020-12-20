import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GrocercryService } from '../services';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items$: Observable<Array<any>>
  products: any[] = [];

  constructor(
    private GrocercryService: GrocercryService,
    private CookieService: CookieService
  ) {

  }

  ngOnInit() {
    this.getItems();
    let items = this.CookieService.get('Cart');
    if (items) {
      this.products = JSON.parse(this.CookieService.get('Cart'))
    }
  }

  getItems() {
    this.items$ = this.GrocercryService.getAllItem()
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  addToCart(product) {
    const index = this.products.findIndex(item => item._id == product._id)
    if (index < 0) {
      product.qty = 1
      this.products.push(product);
    }
    else {
      this.products[index].qty += 1;
    }

    this.CookieService.remove('Cart');
    this.CookieService.put('Cart', JSON.stringify(this.products))
  }
}
