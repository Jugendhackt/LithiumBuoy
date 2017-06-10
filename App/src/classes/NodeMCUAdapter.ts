import { Storage } from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


export class NodeMCUAdapter implements EndpointAdapter {
    private url: string;
    private http: Http;
    constructor(http: Http, private storage: Storage) {
        this.http = http;
        storage.get('ip').then((val) => {
            this.url = "http://" + val + "/";
            console.log(this.url)
        });
    }

    on(): Observable<any> {
        return this.http
            .get(this.url + "on")
    }

    off(): Observable<any> {
        return this.http
            .get(this.url + "off");
    }

    getState(): Observable<any> {
        return this.http
            .get(this.url + "state")
    }
}