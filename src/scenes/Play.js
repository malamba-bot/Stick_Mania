import {globals} from '../main.js'
import {player_consts} from '../main.js'

import {PlayerStick} from '../prefabs/PlayerStick.js'
import {WaveSpawner} from '../prefabs/WaveSpawner.js'

export class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    

    create() {
        this.keys = 
        {
            A: this.input.keyboard.addKey('a'),
            D: this.input.keyboard.addKey('d'),
            W: this.input.keyboard.addKey('w'),
            J: this.input.keyboard.addKey('j'),
            K: this.input.keyboard.addKey('k'),
            L: this.input.keyboard.addKey('l'),
            ESC: this.input.keyboard.addKey('esc'),
            SPACE: this.input.keyboard.addKey('space')
        }

        //Health UI
        /*this.healthText = this.add.text(20, 20, 'Health: 100', {
        fontSize: '20px',
        color: '#ffffff'
        }).setScrollFactor(0).setDepth(100);*/
    
        this.add.image(0, 0, 'background').setOrigin(0);
        this.player = new PlayerStick(
            this, 
            player_consts.start_x, 
            player_consts.start_y, 
            'idle');

        this.matter.world.setBounds(0, 0, globals.width, globals.height);

        const snowflakeImg = this.add.image(40,100, 'snowflake');
        snowflakeImg.setScale(0.15);
        snowflakeImg.setVisible(false);

        // Added enemy health text for testing purposes
        // TODO remove
        //this.enemyHealthText = this.add.text(20, 50, 'Enemy Health: 100', { fontSize: '20px', color: '#ffffff' }).setDepth(100);

        // gameTimer will go off every 45 seconds and give a random number from 1-3 which represent the debuffs we have in the game
        // I will add a function that later calls each debuff and spawns their respective icons

        var gameTimer = this.time.addEvent({
            delay: 45000,
            callback: this.player.appliedDebuff,
            callbackScope: this.player,
            loop: true,

        });

        gameTimer.paused = false;

        //Stamina debuff (still need to work on it)
        function applyStaminaDebuff() {
            //console.log('Stamina debuff applied!');
            //this.staminaDrainMultiplier = 2;
            //this.time.delayedCall(5000, () => {
                //this.staminaDrainMultiplier = 1;
                //console.log('Stamina debuff expired!');
            //});

        }

        function onEvent() {
            //console.log(Phaser.Math.Between(1,3));
            //console.log('45 seconds have passed');
            //if (randomNum() === 1) {
                //applyStaminaDebuff();
            //}
             //else if (randomNum() === 2) {
                //apply another debuff
            //}
             //else if (randomNum() === 3) {
                //apply another debuff
            //}
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
            this.scene.launch('Pause', this);
        });

        // grid overlay (DEV FEATURE)
        let overlay = this.add.image(globals.width / 2, globals.height / 2, 'grid_overlay');
        let overlay_visible = false;
        overlay.setVisible(overlay_visible);
        let o_key = this.input.keyboard.addKey('o');
        o_key.on('down', () => overlay.setVisible(overlay_visible = !overlay_visible));

        // Set friction on walls to zero TODO check for removal
        const walls = this.matter.world.walls;
        walls.left.friction = walls.right.friction = 0;
        walls.bottom.friction = 100;

        this.matter.world.on('collisionstart', (event) => {
            for(const pair of event.pairs) {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;

                const objA = bodyA.parent?.gameObject;
                const objB = bodyB.parent?.gameObject;

                // Only compound bodies have parents, so this effectively checks if a Stickman is involved in the collision
                if (!objA && !objB) continue;

                if(objA && objB) {
                    if (bodyA.label == 'hurtbox' && !objB.invincible) 
                        objB.takeDamage(10, objA);
                    if (bodyB.label == 'hurtbox' && !objA.invincible) 
                        objA.takeDamage(10, objB);
                } else {
                    const obj = objA ?? objB; // get the player body
                    if (bodyA === walls.bottom || bodyB == walls.bottom) {
                        obj.isGrounded = true;
                    }
                        
                }
            }
        });

        // wave spawner
        const waves = [
            { enemyCount: 2, spawnInterval: 1000 },
            { enemyCount: 4, spawnInterval: 1000 },
            { enemyCount: 7, spawnInterval: 1000 }
        ];

        this.waveSpawner = new WaveSpawner(this, waves);
        this.waveSpawner.startWave(0);
    }

    update() {

        // Enemy testing heatlh
        //this.enemyHealthText.setText('Enemy Health: ' + this.enemy.health.value);
        //this.enemy.health.healthBarFollow(this.enemy);
        this.waveSpawner.update();
    }
}
