import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { MainUserComponent } from './components/user/main-user/main-user.component';
import { UserComponent } from './components/user/user/user.component';
import { OrderComponent } from './components/user/order/order.component';

const routes: Routes = [
  { component: MainComponent, path: "" },
  { component: MainComponent, path: "main" },
  { component: RegisterComponent, path: "register" },
  {
    path: "admin", component: MainAdminComponent,
    children: [{
      component: AddProductComponent, path: "add-product"
    }]
  },
  {
    path: "user", component: UserComponent,
    children: [
      {component: MainUserComponent, path: "" },
      {component: OrderComponent, path: "order/:cartId" },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
