import {DijkstraPathfinding} from './Dijkstra.js'
import {HealthBar} from './Healthbar.js'

export class Stickman extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {

        super(scene, x, y, texture);

        this.scene = scene;

        //Constant values
        this.maxHealth = 100;
        this.direction = 'R';
        this.isGrounded = true;
        this.attacking = false;
        this.invincible = false;

        this.health = new HealthBar(scene, x, y, 100);

        this.movement_speed = 5;
        this.jump_velocity = -20;

        this.setScale(0.14);
        
        // Store the display size to maintain consistent texture scaling across all states
        this.targetDisplayWidth = this.displayWidth;
        this.targetDisplayHeight = this.displayHeight;

        this.scene.matter.add.gameObject(this)
        scene.add.existing(this);

        this.construct_body();
        this.constructAudio();

        this.play('Idle');

    }

    flip_left() {
        this.setFlipX(true);
        this.direction = 'L';
    }

    flip_right() {
        this.setFlipX(false);
        this.direction = 'R';
    }

    takeDamage(amount, opp) {
        this.invincible = true;
        this.knockback(opp, opp.FSM.state);
        this.health.decrease(amount);

        if (this.health < 0) {
            this.health = 0;
        }

        this.scene.time.delayedCall(500, () => {
            this.invincible = false;
        });
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
        const make_parts = (state, attackType) => 
        {
            // START AI GENERATED @claude.ai
            // create shapes that consitute compound body
            const { Bodies, Body } = Phaser.Physics.Matter.Matter
            const coords = hitbox_coords[state];

            let torso  = Bodies.rectangle(coords.torso[0],  coords.torso[1],  coords.torso[2],  coords.torso[3]);
            let head   = Bodies.circle(coords.head[0], coords.head[1], coords.head[2]);
            /* TODO REMOVE
            let groin  = Bodies.circle(coords.groin[0], coords.groin[1], coords.groin[2]);
            let thighs = Bodies.rectangle(coords.thighs[0], coords.thighs[1], coords.thighs[2], coords.thighs[3]);
            let calves = Bodies.rectangle(coords.calves[0], coords.calves[1], coords.calves[2], coords.calves[3]);
            */

            let parts = [torso, head];
            if (attackType) {
                let hurtbox = Bodies.circle(coords.hurtbox[0], coords.hurtbox[1], coords.hurtbox[2], 
                    { 
                        label: 'hurtbox',
                        isSensor: true
                    });

                parts.push(hurtbox);
            }
            let hitbox = Body.create({ parts: parts });
            Body.setCentre(hitbox, { x:coords.torso[0], y:coords.torso[1] - 30 }, false);
            return hitbox;
            // END AI GENERATED
        }

        this.hitboxes = {};
        let hitbox_coords = this.scene.cache.json.get('hitboxes');

        this.hitboxes['facing_left'] = make_parts('facing_left', false);
        this.hitboxes['facing_right'] = make_parts('facing_right', false);
        this.hitboxes['punching_left'] = make_parts('punching_left', true);
        this.hitboxes['punching_right'] = make_parts('punching_right', true);
        this.hitboxes['kicking_left'] = make_parts('kicking_left', true);
        this.hitboxes['kicking_right'] = make_parts('kicking_right', true);
    }

    constructAudio(){
        this.punchSound = this.scene.sound.add('punch_sound');
        this.kickSound = this.scene.sound.add('kick_sound');
    }

    attach_body(key) {
        const {Body} = Phaser.Physics.Matter.Matter;
        const hitbox = this.hitboxes[key];
        Body.setPosition(hitbox, { 
            x: this.x, 
            y: this.y});
        this
            .setExistingBody(hitbox)
            .setFixedRotation()
            .setMass(10)
            .setFriction(0)
            .setOrigin(0.5)
            .setDisplaySize(this.targetDisplayWidth, this.targetDisplayHeight);
    }

    knockback(opp, move) {
        this.isGrounded = false;
        this.FSM.transition('knockback');
        const direction = this.x > opp.x ? 1 : -1;
        const force = move == 'punch' ?
            { x: 6 * direction, y: -3 } :
            { x: 50 * direction, y: -50};

        this.scene.matter.body.setVelocity(
            this.body, 
            force
        );
    }

    // preUpdate will be called on sprites in the update list of a scene
    preUpdate(time, delta) {
        // since this is overriding the sprite object's preUpdate, run the usual preUpdate sequence before
        // doing anything else
        super.preUpdate(time, delta);
        this.health.healthBarFollow(this);
    }
}

