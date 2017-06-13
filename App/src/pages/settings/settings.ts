import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StateService } from '../../classes/state.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage {
private ip: string = "";
  private stateService:StateService;
constructor(public navCtrl: NavController, private storage: Storage, stateService:StateService) {
this.stateService = stateService;
this.storage.get('ip').then((val) => {
  console.log(this.ip);
    this.ip = val;
  });
}

saveSettings(){
  this.storage.set('ip', this.ip);
  console.log("Saved IP: " + this.ip);
}
 
}
