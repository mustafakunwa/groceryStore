import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

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
  MatSidenavModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieOptions, CookieService } from 'angular2-cookie';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
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
    MatSidenavModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    CookieService,
    { provide: CookieOptions, useValue: false },
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
