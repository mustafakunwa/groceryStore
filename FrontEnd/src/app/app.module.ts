import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AgmCoreModule } from '@agm/core';

import {
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BidiModule } from '@angular/cdk/bidi';
import { CookieService, CookieOptions } from 'angular2-cookie/core';

import {
  MenuComponent,
  HeaderComponent,
  SidebarComponent,
  OptionsComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './core';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import {
  AuthService,
  AuthGuard,
  AuthInterceptorService,
  LoaderInterceptorService,
  LoaderService,
  GrocercryService
} from './services/index'
import { SnackbarService } from './shared/snackbar/snackbar.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    OptionsComponent,
    MenuComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    BidiModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    CookieService,
    { provide: CookieOptions, useValue: false },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    SnackbarService,
    AuthGuard,
    AuthService,
    LoaderService,
    GrocercryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
