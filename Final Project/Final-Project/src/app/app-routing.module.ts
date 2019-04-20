import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { MainPageBodyComponent} from './main-page-body/main-page-body.component';
import { LoginComponent} from './login/login.component';
import { SignupComponent} from './signup/signup.component';
import { HomePageComponent} from './home-page/home-page.component';
import { DestinationComponent} from './destination/destination.component';
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
import { DestinationRioComponent} from './destination-rio/destination-rio.component'
import { ProfileComponent } from './profile/profile.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const routes: Routes = [
  {path: '',redirectTo:'/mainPage',pathMatch:'full'},
  {path:'mainPage', component:MainPageBodyComponent},
  {path:'homePage', component:HomePageComponent},
  {path:'destination', component:DestinationComponent},
  {path:'about-us', component:AboutUsComponent},
  {path:'besttrip-store', component:BesttripStoreComponent},
  {path:'content-integrity', component:ContentIntegrityComponent},
  {path:'press', component:PressComponent},
  {path:'privacy-policy', component:PrivacyPolicyComponent},
  {path:'terms-of-use', component:TermsOfUseComponent},
  {path:'career',component:CareerComponent},
  {path:'help-center',component:HelpCenterComponent},
  {path:'inspiration',component:InspirationComponent},
  {path:'flight',component:FlightComponent},
  {path:'des-rio', component:DestinationRioComponent},
  {path:'profile',component:ProfileComponent},
  {path:'profile-view',component:ProfileViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
