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
        this.create_physics_body(-50, -3, 10, 65, false); // torso
        this.create_physics_body(-68, -100, 80, 0, true); // head
        this.create_physics_body(-50, 43, 50, 0, true); // legs
    }

    create_physics_body(x, y, w, h, circle) {
        let body = this.scene.physics.add.image(x, y, null);
        body.setVisible(false);

        if (circle) {
            body.setCircle(w / 2);
        } else
            body.setSize(w, h);
        
        this.add(body);
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

