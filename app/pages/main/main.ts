import {Page, NavController} from 'ionic-angular';
import {Image} from '../image/image';
import {Video} from '../video/video';
import {GamepadPage} from '../gamepad/gamepad';

@Page({
  templateUrl: 'build/pages/main/main.html',
})
export class Main {
  private nav: NavController;

  constructor(nav: NavController) {
    this.nav = nav;

  }

  private gotoVR(v): void {
    this.nav.push(Video);
  }

  private gotoImage(): void {
    // console.log(this.nav);
    this.nav.push(Image);
  }

  private gotoGame(): void {
    this.nav.push(GamepadPage);
  }

}
