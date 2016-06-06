import {ApplicationRef} from '@angular/core';
import {Page} from 'ionic-angular';
import {GamepadService} from '../../services/gamepad.service';

@Page({
    templateUrl: 'build/pages/gamepad/gamepad.html',
})
export class GamepadPage {
    private appRef: ApplicationRef;

    private gamepadService: GamepadService;

    private padMessage: string = '';

    private axesMessage: string = '';

    constructor(appRef: ApplicationRef, gamepadSvc: GamepadService) {
        this.appRef = appRef;
        this.gamepadService = gamepadSvc;

        this.gamepadService.onButtonClick.subscribe((data: number) => {
            this.padMessage = data.toString();
            this.appRef.tick();
        });

        this.gamepadService.onAxes.subscribe((data: number[]) => {
            this.axesMessage = JSON.stringify(data);
            this.appRef.tick();
        });
    }

}
