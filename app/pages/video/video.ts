import {Page, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/video/video.html',
})
export class Video {
  private navParam: NavParams;

  constructor(navParam: NavParams) {
    this.navParam = navParam;
  }

  private onPageDidEnter(): void {
    let v = document.querySelector('#video');
    let imgs: NodeListOf<any> = document.getElementsByTagName('a-image');

    for (let i = 0; i < imgs.length; i++) {
      let element = imgs[i];
      element.addEventListener('click', () => {
        let src = element.getAttribute('src');
        let dest = 'video/kava.mp4';
        switch (src) {
          case 'img/kava_Moment.jpg':
            dest = 'video/kava.mp4';
            break;
          case 'img/move_Moment.jpg':
            dest = 'video/move.mp4';
            break;
          case 'img/outside_Moment.jpg':
            dest = 'video/outside.mp4';
            break;
          default:
            break;
        }
        v.setAttribute('src', dest);
      });
    }


    AndroidFullScreen.immersiveMode(() => { }, () => { });
    screen.lockOrientation('landscape');
  }

  private onPageDidLeave(): void {
    AndroidFullScreen.showSystemUI(() => { }, () => { });
    screen.unlockOrientation();
  }
}
