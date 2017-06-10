import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewAlarmPage } from '../newAlarm/newAlarm';
import { PopoverController } from 'ionic-angular';
import { AlarmService } from '../../classes/alarmService';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
  providers: [AlarmService]
})
export class AlarmPage {
  alarms = [
    {
      "time":"08:04",
      "enabled":false,
    }
  ];

  alarmService;
  alertController;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private AlarmService: AlarmService, private alertCtrl: AlertController) {
    this.alertController=AlertController;
    this.alarmService=AlarmService;
    this.alarmService.getAlarms().then( (alarms) => {
      this.alarms=alarms;
      console.log("alarm was constructed: ", this.alarms);
    });
  }

  //The create/plus button was pressed => Popover is opened
  newAlarm(): void {
    //this.alarms=this.alarmService.alarms;
    console.log("New Alarm", this.alarms);
    let popover = this.popoverCtrl.create(NewAlarmPage);
    popover.present();
    popover.onDidDismiss(() => {
      console.log("Dismissed")
      this.alarmService.getAlarms().then( (alarms) => {
        this.alarms=alarms;
      });
    });
  }

  //Executed when an alarm is changed (enabled/disabled)
  changedAlarm(): void {
    this.alarmService.setAlarms(this.alarms);
  }

  //A card in the list was pressed => Promp is opened and asks if you really wanna delete that alert
  delete(index): void {
    console.log("Index:",index);
    let confirm = this.alertCtrl.create({
      title: 'Wecker löschen?',
      message: 'Möchtest du diesen Wecker wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          handler: () => {
            console.log('Disagree clicked', index);
          }
        },
        {
          text: 'Löschen',
          handler: () => {
            console.log('Agree clicked', index);
            if(index>-1){
              this.alarmService.removeAlarm(index).then(() => {
                console.log("Deleted")
                this.alarmService.getAlarms().then( (alarms) => {
                  this.alarms=alarms;
                });
              });
            }
          }
        }
      ]
    });
    confirm.present();
  }
}
