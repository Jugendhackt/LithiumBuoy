import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { NodeMCUAdapter } from '../../classes/NodeMCUAdapter';
import { BatteryStatus } from '@ionic-native/battery-status';
import { BatteryStatusResponse } from '@ionic-native/battery-status';
import { BackgroundMode } from '@ionic-native/background-mode';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BackgroundMode]
})
export class HomePage {
  private socket: boolean;
  private client: NodeMCUAdapter;
  private isDisabled: boolean;
  private batterylevel: number = 0;
  private loadTo: number = 75;
  private loadToActive: boolean = false;
  private changeDetectorRef: ChangeDetectorRef;

  constructor(public navCtrl: NavController, changeDetectorRef: ChangeDetectorRef, http: Http, storage: Storage, battery: BatteryStatus, public background: BackgroundMode) {
    this.socket = false;
    this.client = new NodeMCUAdapter(http, storage);

    this.background = background;
    this.changeDetectorRef = changeDetectorRef
    this.isDisabled = false;

    this.client.getState().subscribe(data => console.log(data))

    let subscription = battery.onChange().subscribe((status: BatteryStatusResponse) => {
      console.log("LEVEL " + status.level);
      this.batterylevel = status.level;
      changeDetectorRef.detectChanges();
      if (this.batterylevel >= this.loadTo) {
        this.loadToActive = false;
      }
    });

  }

  //Executed if the switch to control the socket is toggled
  public socketToggleEvent() {
    console.log("Toggled: " + this.socket);
    if (this.socket) {
      this.client.on().subscribe(data => console.log(data))
      this.socket = true;
    } else if (!this.socket) {
      this.client.off().subscribe(data => console.log(data))
      this.stopLoadTo();
      this.socket = false;
    }
    //this.socket ? this.client.off() : this.client.on();
  }
  //BACKGROUND

  //Function to active the Background-Mode
  private enableBackground(): void {
    console.log("Background");
    this.background.enable();
    //  alert(this.background.isEnabled());
    //   this.background.moveToBackground();
  }
  //TODO: Make it toggable, rather than two functions
  public startLoadTo() {
    this.enableBackground();
    this.client.on().subscribe(data => console.log(data))
    this.loadToActive = true;
    this.socket = true;
  }
  public stopLoadTo() {
    this.background.disable();
    this.client.off().subscribe(data => console.log(data))
    this.loadToActive = false;
    this.socket = false;
  }

  //Notifications
  public sendTestNotification() {

  }
}
