import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ExplorePage } from '../pages/explore/explore';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegistrationPage } from '../pages/registration/registration';
import { CharityPage } from '../pages/charity/charity';
import { TabsPage } from '../pages/tabs/tabs';
import { PaymentPage } from '../pages/payment/payment';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { CharityListPage } from '../pages/charity-list/charity-list';
import { ProjectPage } from '../pages/project/project';
import { ConfigService } from '../config.service';
import { SettingsPage } from '../pages/settings/settings';
import { CardPage } from '../pages/card/card';
import { PaymentOptionsPage } from '../pages/payment-options/payment-options';
import { CharityCreationPage } from '../pages/charity-creation/charity-creation';
import { CharityServiceProvider } from '../charity.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ExplorePage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    CharityPage,
    TabsPage,
    PaymentPage,
    PortfolioPage,
    CharityListPage,
    ProjectPage,
    SettingsPage,
    CardPage,
    PaymentOptionsPage,
    CharityCreationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: '  ',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',
      activator: 'ripple',
    },
    )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ExplorePage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    CharityPage,
    TabsPage,
    PaymentPage,
    PortfolioPage,
    CharityListPage,
    ProjectPage,
    SettingsPage,
    CardPage,
    PaymentOptionsPage,
    CharityCreationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConfigService,
    CharityServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
