import {globals} from '../main.js'
import {player_consts} from '../main.js'

import {Stickman} from '../prefabs/Stickman.js'

export class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    

    create() {
        this.matter.world.setBounds(0, 0, globals.width, globals.height);
        this.add.image(0, 0, 'background').setOrigin(0);
        this.player = new Stickman(
            this, 
            player_consts.start_x, 
            player_consts.start_y, 
            'base_stance',
            true);

        this.matter.world.setBounds(0, 0, globals.width, globals.height);
            
        // START AI GENERATED @Chatgpt.com
        // Ground collision detection for matter physics
        this.matter.world.on('beforeupdate', () => {
            this.player.isGrounded = false;
        });

        this.matter.world.on('collisionactive', (event) => {
            for (const pair of event.pairs) {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;

                if (
                    (bodyA.parent === this.player.body && bodyB === this.matter.world.walls.bottom) ||
                    (bodyB.parent === this.player.body && bodyA === this.matter.world.walls.bottom)
                ) {
                    this.player.isGrounded = true;
                    break;
                }
            }
        });
        //END AI GENERATED

        this.keys = 
        {
            A: this.input.keyboard.addKey('a'),
            D: this.input.keyboard.addKey('d'),
            ESC: this.input.keyboard.addKey('esc'),
            SPACE: this.input.keyboard.addKey('space')
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
