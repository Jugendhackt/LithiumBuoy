import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';




export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController) {
        this.slides = [
          {
            title: 'Wilkommen bei dieser tollen App',
            description: 'Dein Akku schonen blah blah',
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: 'Verschiedene Modis blah blah',
            description: 'mit InApp Käufen',
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: 'Datensammeln',
            description: "blah blah blah",
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
  }

  startApp() {
    this.navCtrl.setRoot(TabsPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
