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
        RegistrationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
