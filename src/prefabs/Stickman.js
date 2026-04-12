import {IdleState, RightArmPunchState, MoveRightState, MoveLeftState, JumpState, PunchState} from './Actions.js'
import {EnemyIdleState, EnemyChaseState} from './EnemyActions.js'
import {globals, player_consts} from '../main.js'
import {DijkstraPathfinding} from './Dijkstra.js'

export class Stickman extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, is_playable) {

        super(scene, x, y, texture);

        this.scene = scene;

        //Constant values
        this.maxHealth = 100;
        this.health = 100;
        this.direction = 'R';


        this.movement_speed = 5;
        this.jump_velocity = -10;

        this.setScale(0.6);

        this.scene.matter.add.gameObject(this)
        scene.add.existing(this);

        this.init_animations();
        this.construct_body();
        this.attach_statemachine(is_playable);

    }

    takeDamage(amount) {
    this.health -= amount;

    if (this.health < 0) {
        this.health = 0;
    }
}


    attach_statemachine(is_playable) {
        if (is_playable) {
            this.StickmanFSM = new StateMachine('idle', 
                {
                    idle: new IdleState(),
                    right_arm_punch: new RightArmPunchState(),
                    move_right: new MoveRightState(),
                    move_left: new MoveLeftState(),
                    jump: new JumpState(),
                    punch: new PunchState(),
                }, 
                [this.scene, this]);
        } else {
            this.StateMachine = new StateMachine('idle',
                {
                    idle: new EnemyIdleState(),
                    chase: new EnemyChaseState(),
                },
                [this.scene, this]);
        }
    }

    construct_body() {
        this.generate_hitboxes();
        this.attach_body('facing_right');
    }

    /*
        * Generates compound hitboxes for each character action and stores it in a dictionary alongside the relevant key. 
        * These entries are used by the state machine to create and bind new hitboxes when actions are taken.
        */
    generate_hitboxes() {
        const make_parts = (state, attacking) => 
        {
            // START AI GENERATED @claude.ai
            // create shapes that consitute compound body
            const { Bodies, Body } = Phaser.Physics.Matter.Matter
            const coords = hitbox_coords[state];

            let torso  = Bodies.rectangle(coords.torso[0],  coords.torso[1],  coords.torso[2],  coords.torso[3]);
            let head   = Bodies.circle(coords.head[0], coords.head[1], coords.head[2]);
            let groin  = Bodies.circle(coords.groin[0], coords.groin[1], coords.groin[2]);
            let thighs = Bodies.rectangle(coords.thighs[0], coords.thighs[1], coords.thighs[2], coords.thighs[3]);
            let calves = Bodies.rectangle(coords.calves[0], coords.calves[1], coords.calves[2], coords.calves[3]);
            if (attacking) {
                let hurtbox = Bodies.circle(coords.hurtbox[0], coords.hurtbox[1], coords.hurtbox[2]);
                return Body.create({ parts: [torso, head, groin, thighs, calves, hurtbox] });
            }
            return Body.create({ parts: [torso, head, groin, thighs, calves] });
            // END AI GENERATED
        }

        this.hitboxes = {};
        let hitbox_coords = this.scene.cache.json.get('hitboxes');

        this.hitboxes['facing_left'] = make_parts('facing_left', false);
        this.hitboxes['facing_right'] = make_parts('facing_right', false);
        this.hitboxes['punching_left'] = make_parts('punching_left', true);
        this.hitboxes['punching_right'] = make_parts('punching_right', true);
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

