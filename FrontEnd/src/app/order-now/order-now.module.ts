import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderNowComponent } from './order-now.component';
import { RouterModule } from '@angular/router';

import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CookieOptions, CookieService } from 'angular2-cookie';
import { PaymentComponent } from './payment/payment.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderNowComponent
      }
    ]),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    FlexLayoutModule,
    NgxDatatableModule
  ],
  declarations: [OrderNowComponent, PaymentComponent],
  entryComponents: [PaymentComponent],
  providers: [
    CookieService,
    { provide: CookieOptions, useValue: false },
  ],
})
export class OrderNowModule { }
