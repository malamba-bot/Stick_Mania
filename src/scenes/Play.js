import {globals} from '../main.js'

import {Stickman} from '../prefabs/Stickman.js'

export class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    

    create() {
        this.add.image(0, 0, 'background').setOrigin(0);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = new Stickman(this, globals.width / 2, globals.height / 2);

    }

    update() {

        this.player.StickmanFSM.step();

    }
}
