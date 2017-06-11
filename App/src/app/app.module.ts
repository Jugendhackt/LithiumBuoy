import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { AlarmPage } from '../pages/alarm/alarm';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { NewAlarmPage } from '../pages/newAlarm/newAlarm';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';

import { BatteryStatus } from '@ionic-native/battery-status';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { AlarmService } from '../classes/alarmService'
import { AlarmPipe } from '../classes/alarmPipe';

@NgModule({
  declarations: [
    MyApp,
    AlarmPage,
    SettingsPage,
    HomePage,
    TabsPage,
    TutorialPage,
    ProgressBarComponent,
    NewAlarmPage,
    AlarmPipe
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
    AlarmPage,
    SettingsPage,
    HomePage,
    TabsPage,
    NewAlarmPage
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
