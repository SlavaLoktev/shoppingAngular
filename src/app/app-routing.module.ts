import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {WomanCatalogComponent} from './views/woman-catalog/woman-catalog.component';
import {HomeComponent} from './views/home/home.component';
import {ManCatalogComponent} from './views/man-catalog/man-catalog.component';
import {KidCatalogComponent} from './views/kid-catalog/kid-catalog.component';
import {AuthenticationComponent} from './views/authentication/authentication.component';
import {RegistrationComponent} from './views/registration/registration.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'womanCatalog', component: WomanCatalogComponent},
    {path: 'manCatalog', component: ManCatalogComponent},
    {path: 'kidCatalog', component: KidCatalogComponent},
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'registration', component: RegistrationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
