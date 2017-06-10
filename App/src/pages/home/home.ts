import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
import { NodeMCUAdapter } from '../../classes/NodeMCUAdapter';
import { BatteryStatus } from '@ionic-native/battery-status';
import { BatteryStatusResponse } from '@ionic-native/battery-status';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BackgroundMode]
})
export class HomePage {
  private socket: boolean;
  private client: NodeMCUAdapter;

  constructor(public navCtrl: NavController, http: Http, storage: Storage, battery: BatteryStatus, public background: BackgroundMode) {
    this.socket = false;
    this.client = new NodeMCUAdapter(http, storage);


    let subscription = battery.onChange().subscribe((status: BatteryStatusResponse) => {
      console.log(status.level, status.isPlugged);
 }
);
  }
  public socketToggleEvent() {
    console.log("Toggled: " + this.socket);
    if (this.socket) {
      this.client.on().subscribe(data => console.log(data))
    } else if(!this.socket) {
      this.client.off().subscribe(data => console.log(data))
    }
    //this.socket ? this.client.off() : this.client.on();
 }
//BACKGROUND


this.background = background;

enableBackground(){
    console.log("Background");
    this.background.enable();
    alert(this.background.isEnabled());
    this.background.moveToBackground();
}
}
