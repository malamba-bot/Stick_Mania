import {IdleState, RightArmPunchState, MoveRightState, MoveLeftState, JumpState} from './Actions.js'
import {globals, player_consts} from '../main.js'

export class Stickman extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, is_playable) {
        super(scene, x, y, texture);

        this.scene = scene;

        //Constant values
        this.movement_speed = 5;

        this.setScale(0.2);

        this.init_animations();
        scene.add.existing(this);
        this.construct_body();

        

        this.play('Idle');

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
        // START AI GENERATED @claude.ai
        // create shapes that consitute compound body
        /*const { Bodies, Body } = Phaser.Physics.Matter.Matter

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

        this.setPosition(globals.width / 4, globals.height / 2);*/

        // START AI GENERATED @chatgpt.com
        const shapes = this.scene.cache.json.get('stickmanShapes');

        this.scene.matter.add.gameObject(this);

        this.setOrigin(0.5);
        this.setPosition(globals.width / 4, globals.height / 2);

        const x = this.x;
        const y = this.y;

        this.setBody(shapes['spritesheetTEST1']);
        Phaser.Physics.Matter.Matter.Body.scale(this.body, 0.2, 0.2);

        this.setPosition(x, y);
        this.setFixedRotation();
        this.setMass(10);

        this.currentFrame = -1;

        this.on('animationupdate', (anim, frame) => {
            if (frame.index === this.currentFrame) return;
            this.currentFrame = frame.index;

            const bodyMap = {
                0: shapes['spritesheetTEST1'],
                1: shapes['spritesheetTEST2'],
                2: shapes['spritesheetTEST3']
            };

            const newBody = bodyMap[frame.index];
            if (!newBody) return;

            const x = this.x;
            const y = this.y;

            this.setBody(newBody);
            Phaser.Physics.Matter.Matter.Body.scale(this.body, 0.2, 0.2);

            this.setPosition(x, y);
            this.setFixedRotation();
            this.setMass(10);
        });
        //END AI GENERATED

        //sprite.body.updateFromGameObject();

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

