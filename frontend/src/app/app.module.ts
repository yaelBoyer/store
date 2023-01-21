import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule,
  NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule,
  NbStepperModule, NbThemeModule, NbToastrModule, NbTreeGridModule, NbUserModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MainComponent } from "./components/main/main.component";
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberWithCommasPipe } from './pipes/number-with-commas.pipe';
import { TokenLocalStorage, TokenStorage } from './utils/token-storage';
import { AUTH_TOKEN_INTERCEPTOR_FILTER, noOpInterceptorFilter } from './utils/auth.options';
import { RegisterComponent } from './components/register/register.component';
import { AuthJWTInterceptor } from './services/interceptors/jwt-interceptor';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { ProductContainerComponent } from './components/admin/product-container/product-container.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MainUserComponent } from './components/user/main-user/main-user.component';
import { CartComponent } from './components/user/cart/cart.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { OrderComponent } from './components/user/order/order.component';
import { UserComponent } from './components/user/user/user.component';
import { HighlightSearchPipe } from './pipes/highlight-search ';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    NumberWithCommasPipe,
    HighlightSearchPipe,
    RegisterComponent,
    AddProductComponent,
    MainAdminComponent,
    ProductContainerComponent,
    ProductListComponent,
    ProductCardComponent,
    MainUserComponent,
    CartComponent,
    ProductModalComponent,
    OrderComponent,
    UserComponent,
  ],
  providers: [
    { provide: TokenStorage, useClass: TokenLocalStorage },
    { provide: AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: noOpInterceptorFilter },
    { provide: HTTP_INTERCEPTORS, useClass: AuthJWTInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    HttpClientModule,
    NbCheckboxModule,
    FormsModule,
    NbSelectModule,
    NbAlertModule,
    NbInputModule,
    NbCardModule,
    NbStepperModule,
    NbUserModule,
    NbAuthModule,
    NbActionsModule,
    ReactiveFormsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbSearchModule,
    NbDialogModule.forRoot(),
    NbListModule,
    NbTreeGridModule,
    NbFormFieldModule,
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot(),
  ]
})
export class AppModule { }
