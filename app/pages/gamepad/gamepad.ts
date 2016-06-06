import {Page} from 'ionic-angular';
import {GamepadService} from '../../services/gamepad.service';

@Page({
    templateUrl: 'build/pages/gamepad/gamepad.html',
})
export class GamepadPage {

    private gamepadService: GamepadService;

    private padMessage: string = '';

    private axesMessage: string = '';

    constructor(gamepadSvc: GamepadService) {
        this.gamepadService = gamepadSvc;

        this.gamepadService.onButtonClick.subscribe((data) => {
            this.padMessage = data;
        });

        this.gamepadService.onAxes.subscribe((data) => {
            this.axesMessage = data;
        });
    }

}
