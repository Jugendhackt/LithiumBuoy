import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';


import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { NewTimePage } from '../pages/newTime/newTime';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';

import { BackgroundProcesses } from '../classes/BackgroundProcesses';
import { AlarmService } from '../classes/alarmService';

import { BatteryStatus } from '@ionic-native/battery-status';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    HomePage,
    TabsPage,
    TutorialPage,
    NewTimePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TutorialPage,
    AboutPage,
    SettingsPage,
    HomePage,
    TabsPage,
    NewTimePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BatteryStatus,
    BackgroundMode,
    AlarmService
  ]
})
export class AppModule {}
