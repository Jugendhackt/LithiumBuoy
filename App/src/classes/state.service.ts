import { Injectable } from '@angular/core';
import { NodeMCUAdapter } from './NodeMCUAdapter';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class StateService {
    private client: NodeMCUAdapter;
    public isPowered: boolean = false;

    constructor(http: Http, storage: Storage) {
        this.client = new NodeMCUAdapter(http, storage);
        this.client.getState().subscribe(data => console.log(data))
    }

    public turnSocketOn() {
        this.client.on().subscribe(data => console.log(data))
        this.isPowered = true;
    }
    public turnSocketOff() {
        this.client.off().subscribe(data => console.log(data))
        this.isPowered = false;
    }
    public toggleSocket() {
        console.log("Toggle socket called, Currenty Powered: " + this.isPowered);
        if (this.isPowered) {
            this.client.off().subscribe(data => console.log(data))
            this.isPowered = !this.isPowered;
        } else {
            this.client.on().subscribe(data => console.log(data))
            this.isPowered = !this.isPowered;
        }
    }
}