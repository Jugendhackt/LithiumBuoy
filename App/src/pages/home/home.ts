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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BackgroundMode]
})
export class HomePage {
  private socket: boolean = false;
  private isDisabled: boolean = false;
  private batterylevel: number = 0;
  private loadTo: number = 75;
  private loadToActive: boolean = false;
  private changeDetectorRef: ChangeDetectorRef;
  private stateService:StateService;

  constructor(public navCtrl: NavController, stateService: StateService, changeDetectorRef: ChangeDetectorRef, http: Http, storage: Storage, battery: BatteryStatus, public background: BackgroundMode) {
    this.background = background;
    this.changeDetectorRef = changeDetectorRef
    this.stateService = stateService;

    let subscription = battery.onChange().subscribe((status: BatteryStatusResponse) => {
      console.log("LEVEL " + status.level);
      this.batterylevel = status.level;
      changeDetectorRef.detectChanges();
      if (this.batterylevel >= this.loadTo) {
        this.setLoadTo(false);
      }
    });

  }


  //BACKGROUND

  //Function to active the Background-Mode
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

<<<<<<< HEAD
=======
  //Notifications
  public sendTestNotification() {

  }
>>>>>>> 24aec66c73c2ea0ae8dcf33d06d11e487469dd68
}
