/**
 * Created by jossi on 15.06.2017.
 */
/*
 JSON-Schema for the input:
 {
 "time":"String",
 "enabled":"Boolean"
 }
 */
export class AlarmModel {

    time: string;
    enabled: boolean;
    //TODO: Migrate this to a more appropiate type
    repeat: Array<string>;

    constructor(time: string, enabled: boolean, repeat: Array<string>) {
        this.time = time;
        this.enabled = enabled;
        this.repeat = repeat;
    }

    get getTime(): string {
        return this.time;
    }

    get getEnabled(): boolean {
        return this.enabled;
    }

    get getRepeat(): Array<string> {
        return this.repeat;
    }


    set setTime(value: string) {
        this.time = value;
    }

    set setEnabled(value: boolean) {
        this.enabled = value;
    }

    set setRepeat(value: Array<string>) {
        this.repeat = value;
    }
}