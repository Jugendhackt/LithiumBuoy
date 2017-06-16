import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { provideStorage } from "../provider/StorageProvider";
import { Observable } from "rxjs/Observable";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html',
  providers: [
      {provide: Storage, useFactory: provideStorage}
  ]
})
export class MyApp {

  rootPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storageComponent: Storage) {

    //let stuff: string = storageComponent.getItem("tutorialShown");
      let stuff: Observable<boolean> = Observable.fromPromise(storageComponent.get("tutorialShown"));
      stuff.subscribe(
          tutorialShown => {
              if (!tutorialShown) {
                  this.rootPage = TutorialPage;
              } else if (tutorialShown) {
                  this.rootPage = TabsPage;
              }
          }
      );

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
