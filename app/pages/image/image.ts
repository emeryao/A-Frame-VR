import {Page} from 'ionic-angular';
import {GamepadService} from '../../services/gamepad.service';

@Page({
    templateUrl: 'build/pages/image/image.html',
})
export class Image {
    private gamepadService: GamepadService;

    private currentImage: number = 0;

    private imageList: string[] = ['img/2.jpg', 'img/3.jpg', 'img/9.jpg', 'img/1.png'];

    private aImageList: NodeListOf<any>;

    private aCursor: any;

    constructor(gamepadSvc: GamepadService) {
        this.gamepadService = gamepadSvc;
        this.gamepadService.onAxes.subscribe((data: number[]) => {
            if (data[0] == 0) {
                let sky = document.querySelector('a-sky');
                if (data[1] == 1) {
                    this.currentImage += 1;
                } else if (data[1] == -1) {
                    this.currentImage -= 1;
                }
                if (this.currentImage == -1) {
                    this.currentImage = this.imageList.length - 1;
                }
                if (this.currentImage == this.imageList.length) {
                    this.currentImage = 0;
                }
                sky.setAttribute('src', this.imageList[this.currentImage]);
            }
        });

        this.gamepadService.onButtonClick.subscribe((data) => {
            if (data == 0) {
                this.onGamepadButtonClick();
            }
        });
    }

    private onPageDidEnter(): void {
        let sky = document.querySelector('a-sky');
        let imgs: NodeListOf<any> = document.getElementsByTagName('a-image');

        for (let i = 0; i < imgs.length; i++) {
            let element = imgs[i];
            element.addEventListener('click', (e) => {
                sky.setAttribute('src', element.getAttribute('src'));
            });
        }

        this.aImageList = document.getElementsByTagName('a-image');
        this.aCursor = document.getElementsByTagName('a-cursor')[0];

        let gamepads: Gamepad[] = navigator.getGamepads();
        if (gamepads[0]) {
            document.getElementsByTagName('a-cursor')[0].setAttribute('fuse', 'false');
        }


        AndroidFullScreen.immersiveMode(() => { }, () => { });
        screen.lockOrientation('landscape');
    }

    private onPageDidLeave(): void {
        AndroidFullScreen.showSystemUI(() => { }, () => { });
        screen.unlockOrientation();
    }

    private onGamepadButtonClick(): void {
        for (let i = 0; i < this.aImageList.length; i++) {
            let element = this.aImageList[i];
            if (element.is('hovered')) {
                element.click();
                this.aCursor.click();
            }
        }
    }

}
