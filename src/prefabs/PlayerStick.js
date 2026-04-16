import {globals, player_consts} from '../main.js'
import {Stickman} from './Stickman.js'
import {IdleState, MoveRightState, MoveLeftState, JumpState, PunchState, KickState, FreezeState, KnockbackState} from './Actions.js'
import {StaminaBar} from './StaminaBar.js'

export class PlayerStick extends Stickman {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.maxStamina = 100;
        this.staminaDrainMultiplier = 1;


        this.attach_statemachine();
        this.init_stamina(x, y);
    }

    attach_statemachine() {
        this.FSM = new StateMachine('idle', 
            {
                idle: new IdleState(),
                move_right: new MoveRightState(),
                move_left: new MoveLeftState(),
                jump: new JumpState(),
                punch: new PunchState(),
                kick: new KickState(),
                freeze: new FreezeState(),
                knockback: new KnockbackState()
            }, 
            [this.scene, this]);
    }

    init_stamina(x, y) {
        this.stamina = new StaminaBar(this.scene, x, y, this.maxStamina);
        this.snowflakeIcon = this.scene.add.image(globals.width - 50, 40, 'snowflake')
            .setScale(0.25)
            .setVisible(false)
            .setScrollFactor(0)
            .setDepth(100);
        this.staminaIcon = this.scene.add.image(globals.width - 100, 40, 'low_stamina')
            .setScale(0.30)
            .setVisible(false)
            .setScrollFactor(0)
            .setDepth(100);
    }

    applyStaminaDebuff() {
        console.log('Stamina debuff applied');
        this.stamina.regenAmount = 2;
        if (this.staminaIcon) this.staminaIcon.setVisible(true);

        this.scene.time.delayedCall(5000, () => {
            this.stamina.regenAmount = 4;
            if (this.staminaIcon) this.staminaIcon.setVisible(false);
            console.log("Stamina debuff ended");
        });
    }

    appliedDebuff() {

        console.log(Phaser.Math.Between(1,2));
        console.log('45 seconds have passed');
        let randomNum = Phaser.Math.Between(1,2);
        if (randomNum === 1) {
            this.FSM.transition('freeze');
        }
        else if (randomNum === 2) {
            this.applyStaminaDebuff();
        }
        //else if (randomNum() === 3) {
            //apply another debuff
            //}
    }

    preUpdate(time, delta) {
        // since this is overriding the sprite object's preUpdate, run the usual preUpdate sequence before
        // doing anything else
        super.preUpdate(time, delta);
        this.FSM.step();
        this.stamina.StaminaBarFollow(this);
    }
}
