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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { EditProductDialogComponent } from './dialog/edit-product-dialog/edit-product-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import {MatTableModule} from '@angular/material/table';
import { ReadProductDialogComponent } from './dialog/read-product-dialog/read-product-dialog.component';
import { AddProductDialogComponent } from './dialog/add-product-dialog/add-product-dialog.component';
import { FavoritesDialogComponent } from './dialog/favorites-dialog/favorites-dialog.component';
import { ShoppingCartDialogComponent } from './dialog/shopping-cart-dialog/shopping-cart-dialog.component';

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
        GoodInfoComponent,
        EditProductDialogComponent,
        ConfirmDialogComponent,
        ReadProductDialogComponent,
        AddProductDialogComponent,
        FavoritesDialogComponent,
        ShoppingCartDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        MatOptionModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule
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
    entryComponents: [
        EditProductDialogComponent,
        ConfirmDialogComponent,
        ReadProductDialogComponent,
        AddProductDialogComponent,
        FavoritesDialogComponent,
        ShoppingCartDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
