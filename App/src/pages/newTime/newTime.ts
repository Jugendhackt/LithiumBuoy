import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AlarmService } from '../../classes/alarmService';

@Component({
  selector: 'page-newTime',
  templateUrl: 'newTime.html'
})
export class NewTimePage {
  event: Object = {"time":"","enabled":true};
  AlarmService;
  ViewController;
  constructor(public navCtrl: NavController, private alarmService: AlarmService, private viewController: ViewController) {
    this.AlarmService=alarmService;
    this.ViewController=viewController;
    console.log("NewTimePage constructed");
  }

  save(): void{
    console.log("Saved", this.event);
    this.AlarmService.addAlarm(this.event);
    this.ViewController.dismiss();
  }


}
