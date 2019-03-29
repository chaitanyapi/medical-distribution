import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { NgxPaginationModule } from 'ngx-pagination'; 
// import { DataTableModule } from 'angular-2-data-table';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { ServicesService } from './login/services.service';
import { VideoService } from "./video.service";
import { HeroService } from "./hero.service";
import { FetchImageService } from './fetch-image.service';
import { ProductService } from './product/product.service';
import { CustomerServiceService } from './customer/customer-service.service';
import { CompanyService } from './company/company.service';
import { PurchaseInvoiceService } from './invoice/purchase-invoice.service';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from "./app-routing.module";
import { ShowheroComponent } from './showhero/showhero.component';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { HomeComponent } from './home/home.component';
import { VideolistComponent } from './videolist/videolist.component';
import { VideodetailComponent } from './videodetail/videodetail.component';
import { SafePipe } from './safe.pipe';
import { ProductsComponent } from './product/products/products.component';
import { EnterProductComponent } from './enter-product/enter-product.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './login/profile/profile.component';
import { Guard } from './guards';
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { ShowPictureComponent } from './show-picture/show-picture.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { CompanyComponent } from './company/company/company.component';
import { ListCompanyComponent } from './company/list-company/list-company.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { UpdateCompanyComponent } from './company/update-company/update-company.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { PurchaseInvoiceComponent } from './invoice/purchase-invoice/purchase-invoice.component';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    ShowheroComponent,
    EmptyComponentComponent,
    VideoCenterComponent,
    HomeComponent,
    VideolistComponent,
    VideodetailComponent,
    SafePipe,
    ProductsComponent,
    EnterProductComponent,
    ListProductsComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    ListCustomerComponent,
    ShowPictureComponent,
    CustomersComponent,
    CompanyComponent,
    ListCompanyComponent,
    UpdateCustomerComponent,
    UpdateCompanyComponent,
    UpdateProductComponent,
    PurchaseInvoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    FlashMessagesModule,
    NgxPaginationModule
    // DataTableModule
  ],
  providers: [HeroService, VideoService, ServicesService, FlashMessagesService, Guard, 
              FetchImageService, ProductService, CustomerServiceService, CompanyService,
              NgbTypeaheadConfig, PurchaseInvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
