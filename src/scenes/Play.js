import {globals} from '../main.js'
import {player_consts} from '../main.js'

import {Stickman} from '../prefabs/Stickman.js'

export class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    

    create() {
        this.add.image(0, 0, 'background').setOrigin(0);
        this.player = new Stickman(
            this, 
            player_consts.start_x, 
            player_consts.start_y, 
            'base_stance',
            true);

        this.keys = 
        {
            A: this.input.keyboard.addKey('a'),
            D: this.input.keyboard.addKey('d'),
            W: this.input.keyboard.addKey('w'),
            ESC: this.input.keyboard.addKey('esc')
        }

        // PAUSE MENU 
        this.keys.ESC.on('down', () => {
            this.scene.pause();
            this.scene.launch('Pause');
        });

        // grid overlay (DEV FEATURE)
        let overlay = this.add.image(globals.width / 2, globals.height / 2, 'grid_overlay');
        let overlay_visible = false;
        overlay.setVisible(overlay_visible);
        let o_key = this.input.keyboard.addKey('o');
        o_key.on('down', () => overlay.setVisible(overlay_visible = !overlay_visible));


    }

    update() {
        this.player.StickmanFSM.step();
        //this.player.setAngle(0);
    }
}
