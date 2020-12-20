import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/index';
import { Router, NavigationCancel, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  IsHttpCall: boolean = false;
  public isSpinnerVisible = true;


  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isSpinnerVisible = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isSpinnerVisible = false;
      }
    }, () => {
      this.isSpinnerVisible = false;
    });
    this.loaderService.isLoading.subscribe(
      res => {
        setTimeout(() => {
          this.IsHttpCall = res;
        }, 0);

      }
    );
  }

  ngOnInit() {
  }

}
