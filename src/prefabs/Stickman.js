import {IdleState, RightArmPunchState, MoveRightState, MoveLeftState, JumpState} from './Actions.js'
import {globals, player_consts} from '../main.js'

export class Stickman extends Phaser.GameObjects.Container {

    constructor(scene, x, y, is_playable) {
        super(scene, x, y);

        this.scene = scene;

        //Constant values
        this.movement_speed = 200;

        this.init_animations();
        this.construct_body();

        scene.add.existing(this);

        if (is_playable) {
            this.StickmanFSM = new StateMachine('idle', 
                {
                    idle: new IdleState(),
                    right_arm_punch: new RightArmPunchState(),
                    move_right: new MoveRightState(),
                    move_left: new MoveLeftState(),
                    jump: new JumpState(),
                }, 
                [scene, this]);
        } else {

        }
    }

    move(vel) {
        this.each(child => {
            child.setVelocityX(vel);
        });
    }

    construct_body() {
        this.blocked = {
            left: false,
            right: false,
        }

        this.sprite = this.scene.physics.add.sprite(0, 0, 'player')
            .setScale(0.6)
            .setOrigin(0.5)
            .setSize(100, 1)
            .setOffset(-1000, 0); // TODO
        
        this.add(this.sprite);

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

        body.setCollideWorldBounds(true);
        this.add(body);
    }

    checkCollideWorldBounds() {
        this.each(child => {
            if (child.body.blocked.left) {
                this.blocked.left = true;
                //this.sprite.x = this.scene.physics.world.bounds.left;
            } else if (child.body.blocked.right) {
                this.blocked.right = true;
            }
        });
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

    /*flip(bool) {
        this.each(child => {
            child.flipX = bool;
        });
    }*/

}

