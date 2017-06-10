import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BackgroundMode]
})
export class HomePage {

  constructor(public navCtrl: NavController, public background: BackgroundMode) {
    this.background=background;
  }

  enableBackground(){
    console.log("Background");
    this.background.enable();
    alert(this.background.isEnabled());
    this.background.moveToBackground();
  }

}
