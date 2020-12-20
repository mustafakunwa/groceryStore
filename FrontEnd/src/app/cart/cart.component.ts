import { Component, OnInit } from '@angular/core';
import { GrocercryService } from '../services';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: any[] = [];

  constructor(
    private GrocercryService: GrocercryService,
    private CookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    let items = this.CookieService.get('Cart');
    if (items) {
      this.products = JSON.parse(this.CookieService.get('Cart'))
    }
    if (this.products.length <= 0)
      this.getCart();
  }

  getCart() {
    this.GrocercryService.getCart().subscribe(
      res => {
        if (res && res.length > 0)
          this.products = res[0].products;
      }
    )
  }

  order() {
    if (this.products.length > 0)
      this.router.navigateByUrl('/orderNow');
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

  removeToCart(id) {
    const index = this.products.findIndex(item => item._id == id)
    if (this.products[index].qty == 1) {
      this.products.splice(index, 1);
    } else {
      this.products[index].qty -= 1;
    }
    this.CookieService.remove('Cart');
    this.CookieService.put('Cart', JSON.stringify(this.products));
  }

  save() {
    this.GrocercryService.cart(this.products).subscribe(res => {
    })
  }

}
