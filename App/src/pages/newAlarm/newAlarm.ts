import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AlarmService } from '../../classes/alarmService';

@Component({
  selector: 'page-newAlarm',
  templateUrl: 'newAlarm.html'
})
export class NewAlarmPage {
  event: Object = {"time":"","enabled":true};
  AlarmService;
  ViewController;
  constructor(public navCtrl: NavController, private alarmService: AlarmService, private viewController: ViewController) {
    this.AlarmService=alarmService;
    this.ViewController=viewController;
    console.log("NewAlarmPage constructed");
  }

  //Save a new alarm
  save(): void{
    console.log("Saved", this.event);
    this.AlarmService.addAlarm(this.event);
    this.ViewController.dismiss();
  }


}
