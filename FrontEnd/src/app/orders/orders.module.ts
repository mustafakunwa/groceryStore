import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import {
  MatTableModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule
} from '@angular/material'
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersComponent
      }
    ]),
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [OrdersComponent]
})
export class OrdersModule { }
