import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewTimePage } from '../newTime/newTime';
import { PopoverController } from 'ionic-angular';
import { AlarmService } from '../../classes/alarmService';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [AlarmService]
})
export class AboutPage {
  times = [
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
      this.times=alarms;
      console.log("About was constructed: ", this.times);
    });
  }

  //The create/plus button was pressed
  newTime(): void {
    this.times=this.alarmService.alarms;
    console.log("New time", this.times);
    let popover = this.popoverCtrl.create(NewTimePage);
    popover.present();
    popover.onDidDismiss(() => {
      console.log("Dismissed")
      this.alarmService.getAlarms().then( (alarms) => {
        this.times=alarms;
      });
    });
  }

  //Executed when an alarm is changed (enabled/disabled)
  changedAlarm(): void {
    this.alarmService.setAlarms(this.times);
  }

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
                  this.times=alarms;
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
