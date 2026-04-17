import {Stickman} from './Stickman.js'
import {EnemyIdleState, EnemyChaseState, EnemyAttackState, EnemyPunchState, EnemyKickState, EnemyJumpState, EnemyStrafeState} from './EnemyActions.js'
import {FreezeState, KnockbackState} from './Actions.js'

export class EnemyStick extends Stickman {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.chill_distance = 100;
        this.attack_distance = 100;
        this.chase_speed = 2.2;
        this.strafe_speed = 2;
        this.strafe_attack_chance = 0.65;
        this.jump_trigger_height = 40;
        this.jump_trigger_velocity = -2;
        this.jump_trigger_range_multiplier = 1.5;
        this.strafe_min_duration = 1000;
        this.strafe_max_duration = 3000;
        this.isJumping = false;
        this.attach_statemachine();
    }

    attach_statemachine() {
        this.FSM = new StateMachine('idle',
            {
                idle: new EnemyIdleState(),
                chase: new EnemyChaseState(),
                attack: new EnemyAttackState(),
                punch: new EnemyPunchState(),
                kick: new EnemyKickState(),
                jump: new EnemyJumpState(),
                strafe: new EnemyStrafeState(),
                freeze: new FreezeState,
                knockback: new KnockbackState()
            },
            [this.scene, this]);
    }
    reorient(opp) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, opp.x, opp.y);

        // Determine direction (left or right)
        if (Math.cos(angle) > 0) {
            if (this.direction !== 'R') {
                this.flip_right();
            }
        } else {
            if (this.direction !== 'L') {
                this.flip_left();
            }
        }
    }

    getDist(opp) {
        if (!opp.active) return 0;
        return Phaser.Math.Distance.Between(
            this.x, this.y, opp.x, opp.y);
    }

    resetJumpFlag() {
        if (this.isGrounded) {
            this.isJumping = false;
        }
    }

    isPlayerAbove(scene) {
        return scene.player.y < this.y - this.jump_trigger_height;
    }

    isPlayerCloseEnoughToJump(dist) {
        return dist <= this.attack_distance * this.jump_trigger_range_multiplier;
    }

    shouldJump(scene, dist) {
        return (
            this.isPlayerAbove(scene) &&
            this.isPlayerCloseEnoughToJump(dist) &&
            !scene.player.isGrounded &&
            scene.player.body.velocity.y < this.jump_trigger_velocity &&
            this.isGrounded &&
            !this.attacking &&
            !this.isJumping
        );
    }

    shouldStrafe() {
        return Math.random() < this.strafe_attack_chance;
    }

    getHorizontalSpeed(speed) {
        return this.direction === 'R' ? speed : -speed;
    }

    getStrafeDirection(scene) {
        return this.x < scene.player.x ? 'L' : 'R';
    }

    faceDirection(direction) {
        direction === 'R' ? this.flip_right() : this.flip_left();
    }

    isOutsideStrafeRange(dist) {
        return dist > this.attack_distance * this.jump_trigger_range_multiplier;
    }

    preUpdate(time, delta) {
        // since this is overriding the sprite object's preUpdate, run the usual preUpdate sequence before
        // doing anything else
            super.preUpdate(time, delta);
        this.FSM.step();
    }

    destroy() {
        if (this.scene) {
            this.scene.enemiesDefeated++;
            // AI GENERATED @claude.ai
            const list = this.scene.waveSpawner.enemies;
            const index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
            // END AI GENERATED
        }
        super.destroy();
    }

}
