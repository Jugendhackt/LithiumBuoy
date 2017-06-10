import { BackgroundMode } from '@ionic-native/background-mode';

export class BackgroundProcesses {
  constructor(private backgroundMode: BackgroundMode){

  }

  enable(){
    /*if(this.device.platform=="android"){
      this.backgroundMode.setDefaults({"title":"Lithium Buoy","color":"blue"});
    }*/
    this.backgroundMode.enable();
  }
}
