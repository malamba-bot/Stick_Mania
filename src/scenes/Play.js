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

        this.matter.world.setBounds(0, 0, globals.width, globals.height);

        const snowflakeImg = this.add.image(40,80, 'snowflake');
        snowflakeImg.setScale(0.15);

        this.keys = 
        {
            A: this.input.keyboard.addKey('a'),
            D: this.input.keyboard.addKey('d'),
            W: this.input.keyboard.addKey('w'),
            ESC: this.input.keyboard.addKey('esc'),
            SPACE: this.input.keyboard.addKey('space')
        }

        // gameTimer will go off every 45 seconds and give a random number from 1-3 which represent the debuffs we have in the game
        // I will add a function that later calls each debuff and spawns their respective icons

        var gameTimer = this.time.addEvent({
            delay: 45000,
            callback: onEvent,
            loop: true,

        });

        gameTimer.paused = false;

        function onEvent() {
            console.log(Phaser.Math.Between(1,3));
            console.log('45 seconds have passed');
        }

        /*
        var debuffTimer = this.time.addEvent({

            delay: 300,
            callback: this.randomNum,
            callbackScope: this,
            loop: true,

        })

        function randomNum(){
            console.log("3 seconds have passed")
            return Phaser.Math.Between(1,3)
        }
        */

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

        this.enemy = this.matter.add.sprite(globals.width / 2, globals.height / 2, 'base_stance').setScale(0.6);

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

        this.matter.world.on('collisionstart', (event) => {
            for (const pair of event.pairs) {
                const a = pair.bodyA.gameObject;
                const b = pair.bodyB.gameObject;

                if (
                    (a === this.player && b === this.enemy) ||
                    (a === this.enemy && b === this.player)
                ) {
                    console.log('Player hit the enemy!');
                }
            }
        });

    }

    update() {
        this.player.StickmanFSM.step();
        //this.player.setAngle(0);
    }
}
