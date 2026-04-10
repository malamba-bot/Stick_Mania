import {IdleState, RightArmPunchState, MoveRightState, MoveLeftState, JumpState} from './Actions.js'
import {globals, player_consts} from '../main.js'
import {DijkstraPathfinding} from './Dijkstra.js'

export class Stickman extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, is_playable) {
        super(scene, x, y, texture);

        this.scene = scene;

        //Constant values
        this.movement_speed = 5;

        this.setScale(0.6);

        this.init_animations();
        this.construct_body(x, y);

        scene.add.existing(this);

        if (is_playable) {
            this.StickmanFSM = new Stateachine('idle', 
                {
                    idle: new IdleState(),
                    right_arm_punch: new RightArmPunchState(),
                    move_right: new MoveRightState(),
                    move_left: new MoveLeftState(),
                    jump: new JumpState(),
                }, 
                [scene, this]);
        } else {
            // Enemy pathfinding is not initialized here.
            // If you need pathfinding, create it in the scene and pass a grid.
        }
    }

    construct_body(x, y) {
        // START AI GENERATED @claude.ai
        // create shapes that consitute compound body
        const { Bodies, Body } = Phaser.Physics.Matter.Matter

        const torso = Bodies.rectangle(35, 114, 4, 94); 
        const head = Bodies.circle(35, 34, 31); 
        const groin = Bodies.circle(35, 168, 10);
        const thighs = Bodies.rectangle(40, 180, 28, 20);
        const calves = Bodies.rectangle(40, 210, 40, 50);
        const compound = Body.create({ parts: [torso, head, groin, thighs, calves] });
        Body.setCentre(compound, { x: 0, y: 0}, true);
        // END AI GENERATED


        this.scene.matter.add.gameObject(this)
            .setOrigin(0)
            .setExistingBody(compound)
            .setFixedRotation()
            .setMass(10)

        this.setPosition(x, y);
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

