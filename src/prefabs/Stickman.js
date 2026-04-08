import {IdleState, RightArmPunchState} from './Actions.js'

export class Stickman extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;

        this.construct_body();
        scene.add.existing(this);

        this.StickmanFSM = new StateMachine('idle', 
            {
                idle: new IdleState(),
                right_arm_punch: new RightArmPunchState(),
            }, 
            [scene, this]);
    }

    construct_body() {
        this.scene.anims.createFromAseprite('player');

        let animKey = this.scene.anims.exists('idle') ? 'idle' : 'Idle'; // i dont remeber if i made it caps XD, also jus safer

        if (!this.scene.anims.exists(animKey)) {
            this.scene.anims.create({
                key: 'Idle',
                frames: this.scene.anims.generateFrameNames('player'),
                frameRate: 6,
                repeat: -1
            });
            animKey = 'Idle';
        }

        let sprite = this.scene.add.sprite(-100, 150, 'player')
            .setScale(0.6)
            .setOrigin(0.5)
            .play(animKey);
        this.add(sprite);

        console.log(sprite);
    }
}

