import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//Service to manage and save the alarms
@Injectable()
export class AlarmService {

  alarms: any[];
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

  //Remove an alarm from the list using its index
  removeAlarm(index) {
    console.log("Removing:", index);
    if (index > -1) {
      this.alarms.splice(index, 1);
      return this.Storage.set("alarms", this.alarms);
    }
  }

  //Set the alarm to the given array (Schema at "addAlarm()")
  setAlarms(alarms): void{
    this.alarms=alarms;
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
  getAlarms(){
    return this.Storage.get("alarms");
  }
}
