import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { BatteryStatus } from '@ionic-native/battery-status';
import { BatteryStatusResponse } from '@ionic-native/battery-status';
import { BackgroundMode } from '@ionic-native/background-mode';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { StateService } from '../../classes/StateService'
import { LocalNotifications } from '@ionic-native/local-notifications'
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BackgroundMode,LocalNotifications]
})
export class HomePage {
  private socket: boolean = false;
  private isDisabled: boolean = false;
  private batterylevel: number = 0;
  private loadTo: number = 75;
  private loadToActive: boolean = false;
  private changeDetectorRef: ChangeDetectorRef;
  private stateService:StateService;
  private LocalNotifications: LocalNotifications;
  public platform: Platform;

  constructor(public navCtrl: NavController, stateService: StateService, changeDetectorRef: ChangeDetectorRef, http: Http, storage: Storage, battery: BatteryStatus, public background: BackgroundMode, localNotifications: LocalNotifications, Platform: Platform) {
    this.background = background;
    this.changeDetectorRef = changeDetectorRef
    this.stateService = stateService;
    this.LocalNotifications = localNotifications;
    this.platform=Platform;
    console.log(this.platform);

    let subscription = battery.onChange().subscribe((status: BatteryStatusResponse) => {
      console.log("LEVEL " + status.level);
      this.batterylevel = status.level;
      changeDetectorRef.detectChanges();
      if (this.batterylevel >= this.loadTo) {
        let isAndroid: Boolean = true;
        this.setLoadTo(false);
        this.LocalNotifications.schedule({
          id: 1,
          text: 'Charging finished',
          sound: this.setSound()
        });
      }
    });

  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/shame.mp3'
    } else {
      return 'file://assets/sounds/bell.mp3'
    }
  }
  //BACKGROUND

  //Function to activate the Background-Mode
  private enableBackground(): void {
    console.log("Background");
    this.background.enable();
  }
  public toggleLoadTo() {
    this.setLoadTo(!this.loadToActive)
  }
  private setLoadTo(enabled: boolean) {
    if (enabled) {
      this.enableBackground();
      this.stateService.turnSocketOn();
    } else {
      this.background.disable();
      this.stateService.turnSocketOff();
    }
    this.loadToActive = enabled
  }

}
