import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {PopoverModule} from 'ngx-bootstrap/';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageBodyComponent } from './main-page-body/main-page-body.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { DestinationComponent } from './destination/destination.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BesttripStoreComponent } from './besttrip-store/besttrip-store.component';
import { ContentIntegrityComponent } from './content-integrity/content-integrity.component';
import { PressComponent } from './press/press.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { CareerComponent } from './career/career.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { InspirationComponent } from './inspiration/inspiration.component';
import { FlightComponent } from './flight/flight.component';
import { DestinationRioComponent } from './destination-rio/destination-rio.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { PostCardComponent } from './post-card/post-card.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageBodyComponent,
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    DestinationComponent,
    AboutUsComponent,
    BesttripStoreComponent,
    ContentIntegrityComponent,
    PressComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    CareerComponent,
    HelpCenterComponent,
    InspirationComponent,
    FlightComponent,
    DestinationRioComponent,
    PostModalComponent,
    ProfileComponent,
    PostCardComponent,
    ProfileModalComponent,
    ProfileViewComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModalModule,
    Ng2SearchPipeModule,
    PopoverModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
