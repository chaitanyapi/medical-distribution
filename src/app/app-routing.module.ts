import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { AppComponent } from "./app.component";
import { EmptyComponentComponent } from "./empty-component/empty-component.component";
import { HomeComponent } from "./home/home.component";
import { VideoCenterComponent } from "./video-center/video-center.component";
import { ProductsComponent } from "./product/products/products.component";
import { LoginComponent } from "./login/login/login.component";
import { RegisterComponent } from "./login/register/register.component";
import { ProfileComponent } from "./login/profile/profile.component";
import { Guard } from './guards';
import { ServicesService } from "./login/services.service";
import { ShowPictureComponent } from './show-picture/show-picture.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { CompanyComponent } from './company/company/company.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { UpdateCompanyComponent } from './company/update-company/update-company.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { PurchaseInvoiceComponent } from './invoice/purchase-invoice/purchase-invoice.component';


const routes: Routes = [
  { path: '', component: EmptyComponentComponent, pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent, canActivate:[Guard] },
  { path: 'detail/:id', component: HeroDetailComponent, canActivate:[Guard] },
  { path: 'heroes',     component: HeroesComponent, canActivate:[Guard] },
  { path: 'home', component: HomeComponent},
  { path: 'videos', component: VideoCenterComponent, canActivate:[Guard]},
  { path: 'products', component: ProductsComponent, canActivate:[Guard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[Guard]},
  { path: 'customers', component: CustomersComponent, canActivate:[Guard]},
  { path: 'company', component: CompanyComponent, canActivate: [Guard]},
  { path: 'updatecustomer/:id', component: UpdateCustomerComponent, canActivate: [Guard]},
  { path: 'updatecompany/:id', component: UpdateCompanyComponent, canActivate: [Guard]},
  { path: 'updateproduct/:id', component: UpdateProductComponent, canActivate: [Guard]},
  { path: 'purchaseinvoice', component: PurchaseInvoiceComponent, canActivate: [Guard]}
  //{ path: 'showimage/:filename', component: ShowPictureComponent, canActivate:[Guard]}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}