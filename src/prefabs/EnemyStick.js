import {Stickman} from './Stickman.js'
import {EnemyIdleState, EnemyChaseState, EnemyAttackState, EnemyPunchState, EnemyKickState, EnemyJumpState} from './EnemyActions.js'
import {FreezeState, KnockbackState} from './Actions.js'

export class EnemyStick extends Stickman {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.chill_distance = 100;
        this.attack_distance = 0;

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
        return Phaser.Math.Distance.Between(
            this.x, this.y, opp.x, opp.y);
    }

    preUpdate(time, delta) {
        // since this is overriding the sprite object's preUpdate, run the usual preUpdate sequence before
        // doing anything else
        super.preUpdate(time, delta);
        this.FSM.step();
    }

}
