import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class GamepadService {
    public onButtonClick: EventEmitter<number> = new EventEmitter<number>();
    public onAxes: EventEmitter<number[]> = new EventEmitter<number[]>();

    constructor() {

    }

}