import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable'
import { AlarmModel } from "../model/AlarmModel";

//Service to manage and save the alarms
@Injectable()
export class AlarmService {

  alarms: Array<AlarmModel>;
  Storage;
  constructor (private storage: Storage){
    this.Storage=storage;
    this.refreshAlarms();
  }

  //Add an alarm to the list
  /*
    JSON-Schema for the input:
    {
      "time":"String",
      "enabled":"Boolean"
    }
  */
  addAlarm(alarm): void{
    console.log("Pushing...");
    this.alarms.push(alarm);
    this.Storage.set("alarms", this.alarms);
    console.log("Pushed:",this.alarms);
  }

  addAlarmWithTypesafety(alarm: AlarmModel): void{
    console.log("Pushing...");
    this.alarms.push(alarm);
    this.Storage.set("alarms", this.alarms);
    console.log("Pushed:",this.alarms);
  }

  //Remove an alarm from the list using its index
  removeAlarm(index) {
    //return this.Storage.get("alarms");
    this.refreshAlarms();
    console.log(this.Storage.get("alarms"));
    return this.Storage.get("alarms").then((alarms) => {
      this.alarms=alarms;
      if(!alarms){
        this.alarms=[];
      }
      console.log("Removing:", index, this.alarms);
      if (index > -1) {
        this.alarms.splice(index, 1);
        console.log("Removed:",this.alarms);
        this.Storage.set("alarms", this.alarms);
      }
    });
  }

  //Set the alarm to the given array (Schema at "addAlarm()")
  setAlarms(alarms): void{
    this.alarms = alarms;
    this.Storage.set("alarms", alarms);
  }

  //Set the alarm to the given array (Schema at "addAlarm()")
  setAlarmsWithTypesafety(alarms: Array<AlarmModel>): void{
    this.alarms = alarms;
    this.Storage.set("alarms", alarms);
  }

  //Internal refresh function to get everything up-to-date
  refreshAlarms(){
    this.Storage.get("alarms").then( (alarms) =>{
      console.log("Storaged alarms:", alarms);
      this.alarms=alarms;
      if(!alarms){
        this.alarms=[];
      }
    });
  }

  //Returns a promise to get the saved alarms
  getAlarms() {
    return this.Storage.get("alarms");
  }

  getAlarmsRx(): Observable<Array<AlarmModel>> {
    return Observable.fromPromise(this.Storage.get("alarms"));
  }

  //Returns a promise to get the saved alarms
  getAlarmsWithTypesafety(): Promise<Array<AlarmModel>> {
    return this.Storage.get("alarms");
  }
}
