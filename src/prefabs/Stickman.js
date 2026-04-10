import {IdleState, RightArmPunchState, MoveRightState, MoveLeftState, JumpState} from './Actions.js'
import {globals, player_consts} from '../main.js'

export class Stickman extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, is_playable) {
        super(scene, x, y, texture);

        this.scene = scene;

        //Constant values
        this.movement_speed = 5;
        this.jump_velocity = -10;

        this.isGrounded = false;

        this.setScale(0.6);

        this.scene.matter.add.gameObject(this)
        scene.add.existing(this);

        this.init_animations();
        this.construct_body();


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

    construct_body() {
        this.generate_hitboxes();
        this.setPosition(100, 100);
        this.attach_body('facing_right');
        //this.setPosition(globals.width / 4, globals.height / 2);
            
    }

    generate_hitboxes() {
        this.hitboxes = {};
        const make_parts = (x) => 
        {
            // START AI GENERATED @claude.ai
            // create shapes that consitute compound body
            const { Bodies, Body } = Phaser.Physics.Matter.Matter

            let torso = Bodies.rectangle(0, 0, 4, 94);
            let head = Bodies.circle(x, -20, 31); 
            let groin = Bodies.circle(0, 0, 10);
            let thighs = Bodies.rectangle(0, 0, 28, 20);
            let calves = Bodies.rectangle(0, 0, 40, 50);
            return Body.create({ parts: [torso, head, groin, thighs, calves] });
            // END AI GENERATED
        }

        this.hitboxes['facing_right'] = make_parts(0);
        this.hitboxes['facing_left'] = make_parts(100);
        //compound = Body.create({ parts: [torso, head, groin, thighs, calves] });
        
        // Facing left hitbox
    }


    attach_body(key) {
        const {Body} = Phaser.Physics.Matter.Matter;
        const hitbox = this.hitboxes[key];
        Body.setPosition(hitbox, { x: this.x, y: this.y });
        this
            .setExistingBody(hitbox)
            .setFixedRotation()
            .setMass(10)
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

