import {IdleState, RightArmPunchState} from './Actions.js'
import {globals, player_consts} from '../main.js'

export class Stickman extends Phaser.GameObjects.Container {

    constructor(scene, x, y, is_playable) {
        super(scene, x, y);

        this.scene = scene;

        this.init_animations();
        this.construct_body();

        scene.add.existing(this);

        if (is_playable) {
            this.StickmanFSM = new StateMachine('idle', 
                {
                    idle: new IdleState(),
                    right_arm_punch: new RightArmPunchState(),
                }, 
                [scene, this]);
        } else {

        }
    }

    construct_body() {
        let sprite = this.scene.add.sprite(0, 0, 'player')
            .setScale(0.6)
            .setOrigin(0.5)
        this.add(sprite);


        // Add physics bodies
        let torso = this.scene.physics.add.image(0, 0, null);
        torso.setVisible(false);

        this.add(torso);
        this.add(sprite);
    }

    init_animations() {
        this.scene.anims.createFromAseprite('player');

        if (!this.scene.anims.exists('Idle')) {
            this.scene.anims.create({
                key: 'Idle',
                frames: this.scene.anims.generateFrameNames('player'),
                frameRate: 6,
                repeat: -1
            });
        }
    }

}

