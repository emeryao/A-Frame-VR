import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Main} from './pages/main/main';
import {GamepadService} from './services/gamepad.service';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {},
  providers: [GamepadService]
})
export class MyApp {
  rootPage: any = Main;

  private gamepadService: GamepadService;

  private lastEmit: number = Date.now();

  constructor(platform: Platform, gamepadSvc: GamepadService) {
    this.gamepadService = gamepadSvc;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      window.addEventListener('gamepadconnected', (e: GamepadEvent) => {
        alert(JSON.stringify('gamepadconnected: ' + e.gamepad.id));
        this.updateStatus();
      });
    });
  }

  private updateStatus() {
    let controller: Gamepad = navigator.getGamepads()[0];

    for (let i = 0; i < controller.buttons.length; i++) {
      let btn: GamepadButton = controller.buttons[i];
      if (btn.pressed && (Date.now() - this.lastEmit) > 500) {
        this.gamepadService.onButtonClick.emit(i);
      }
    }

    for (let j = 0; j < controller.axes.length; j++) {
      let ax: number = controller.axes[j];

      if (Math.abs(ax) == 1 && (Date.now() - this.lastEmit) > 500) {
        this.gamepadService.onAxes.emit([j, ax]);
        this.lastEmit = Date.now();
      }
    }

    requestAnimationFrame(() => { this.updateStatus() });
  }

}
