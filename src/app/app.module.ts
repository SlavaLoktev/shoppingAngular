import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {Routes, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WomanCatalogComponent } from './views/woman-catalog/woman-catalog.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { ManCatalogComponent } from './views/man-catalog/man-catalog.component';
import { KidCatalogComponent } from './views/kid-catalog/kid-catalog.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { RegistrationComponent } from './views/registration/registration.component';
import { ProductCardComponent } from './views/product-card/product-card.component';
import { GoodInfoComponent } from './views/good-info/good-info.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CATEGORY_URL_TOKEN} from './data/dao/impl/CategoryService';
import {PRODUCT_URL_TOKEN} from './data/dao/impl/ProductService';
import {ATTRIBUTE_URL_TOKEN} from './data/dao/impl/AttributeService';
import {ATTRVALUE_URL_TOKEN} from './data/dao/impl/AttrValueService';
import {CUSTOMERS_URL_TOKEN} from './data/dao/impl/CustomersService';
import {DEPARTMENT_URL_TOKEN} from './data/dao/impl/DepartmentService';
import {REVIEWS_URL_TOKEN} from './data/dao/impl/ReviewsService';

@NgModule({
    declarations: [
        AppComponent,
        WomanCatalogComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ManCatalogComponent,
        KidCatalogComponent,
        AuthenticationComponent,
        RegistrationComponent,
        ProductCardComponent,
        GoodInfoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // HttpClientModule нужно подключить по заданию
    ],
    providers: [
        {
            provide: PRODUCT_URL_TOKEN,
            useValue: 'http://localhost:8080/product'
        },
        {
            provide: ATTRIBUTE_URL_TOKEN,
            useValue: 'http://localhost:8080/attribute'
        },
        {
            provide: ATTRVALUE_URL_TOKEN,
            useValue: 'http://localhost:8080/attrvalue'
        },
        {
            provide: CATEGORY_URL_TOKEN,
            useValue: 'http://localhost:8080/category'
        },
        {
            provide: CUSTOMERS_URL_TOKEN,
            useValue: 'http://localhost:8080/customers'
        },
        {
            provide: DEPARTMENT_URL_TOKEN,
            useValue: 'http://localhost:8080/department'
        },
        {
            provide: REVIEWS_URL_TOKEN,
            useValue: 'http://localhost:8080/reviews'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
