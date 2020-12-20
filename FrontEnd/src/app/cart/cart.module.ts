import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule } from '@angular/router';
import {
  MatCardModule,
  MatToolbarModule,
  MatTabsModule,
  MatIconModule,
  MatTooltipModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatListModule,
  MatSliderModule,
  MatCheckboxModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieOptions, CookieService } from 'angular2-cookie';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartComponent
      }
    ]),
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    CookieService,
    { provide: CookieOptions, useValue: false },
  ],
  declarations: [CartComponent]
})
export class CartModule { }
