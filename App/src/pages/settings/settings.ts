import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage {
private ip: string;
constructor(public navCtrl: NavController, private storage: Storage) {
this.ip = "";

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
