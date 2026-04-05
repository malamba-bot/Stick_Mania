import {globals} from '../main.js'

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('MainMenu');
    }

    create() {
        this.add.text(globals.width / 2, globals.height / 2, 'Dis da main menu');
    }

}
