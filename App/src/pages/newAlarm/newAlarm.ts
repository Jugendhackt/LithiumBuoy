import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AlarmService } from '../../classes/alarmService';
import { AlarmModel } from '../../model/AlarmModel';

@Component({
  selector: 'page-newAlarm',
  templateUrl: 'newAlarm.html'
})
export class NewAlarmPage {

  viewModel: AlarmModel = new AlarmModel("", true, []);

  AlarmService: AlarmService;
  ViewController: ViewController;

  constructor(public navCtrl: NavController, private alarmService: AlarmService, private viewController: ViewController) {
    this.AlarmService = alarmService;
    this.ViewController = viewController;
    console.log("NewAlarmPage constructed");
  }

  // Function that saves a new alarm from the viewModel
  save(): void {
      this.AlarmService.addAlarmWithTypesafety(this.viewModel);
      this.ViewController.dismiss();
  }


}
