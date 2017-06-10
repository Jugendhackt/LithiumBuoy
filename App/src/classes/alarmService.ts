import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AlarmService {
  alarms: any[];
  Storage;
  constructor (private storage: Storage){
    this.Storage=storage;
    this.refreshAlarms();
  }

  addAlarm(alarm): void{
    console.log("Pushing...");
    this.alarms.push(alarm);
    this.Storage.set("alarms", this.alarms);
    console.log("Pushed:",this.alarms);
  }

  removeAlarm(index) {
    console.log("Removing:", index);
    if (index > -1) {
      this.alarms.splice(index, 1);
      return this.Storage.set("alarms", this.alarms);
    }
  }

  setAlarms(alarms): void{
    this.alarms=alarms;
    this.Storage.set("alarms", alarms);
  }

  refreshAlarms(){
    this.Storage.get("alarms").then( (alarms) =>{
      console.log("Storaged alarms:", alarms);
      this.alarms=alarms;
      if(!alarms){
        this.alarms=[];
      }
    });
  }

  getAlarms(){
    /*this.Storage.get("alarms").then( (alarms) =>{
      console.log("Storaged alarms:", alarms);
      this.alarms=alarms;
      if(!alarms){
        this.alarms=[];
      }*/
      return this.Storage.get("alarms");
    //});
  }
}
