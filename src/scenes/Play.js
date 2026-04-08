import {globals} from '../main.js'
import {player_consts} from '../main.js'

import {Stickman} from '../prefabs/Stickman.js'

export class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    

    create() {
        this.add.image(0, 0, 'background').setOrigin(0);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = new Stickman(this, player_consts.start_x, player_consts.start_y, true);

    }

    update() {

        this.player.StickmanFSM.step();
        if (this.cursors.left.isDown) {
            console.log('this hoe moving left');
        }

    }
}
