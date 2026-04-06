import {globals} from '../main.js'

import {Stickman} from '../prefabs/Stickman.js'

export class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }

    create() {
        this.player = new Stickman(this, globals.width / 2, globals.height / 2);
    }
}
