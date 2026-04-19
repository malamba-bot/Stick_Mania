import {globals} from '../main.js'
import {Stickman} from './Stickman.js'
import {IdleState, MoveRightState, MoveLeftState, JumpState, PunchState, KickState, ComboState, FreezeState, KnockbackState, FizzleState} from './Actions.js'
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
                combo: new ComboState(),
                freeze: new FreezeState(),
                knockback: new KnockbackState(),
                fizzle: new FizzleState(),
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

    //Calculates whether of not the move fizzled. There is a one in chance likelyhood that the move fails.
    fizzle(chance) {
        const res = Phaser.Math.Between(1, chance) == 1;
        return res;
    }

    async combo() {
        for (let i = 0; i < 3; i++) {
            const rand = Phaser.Math.Between(0, 1);
            rand == 0 ?
                await this.punch() :
                await this.kick();
        }
        this.FSM.transition('idle');
    }

    flashThenHide(icon, duration = 5000, flashDuration = 1000) {
        this.scene.time.delayedCall(duration - flashDuration, () => {
            this.scene.tweens.add({
                targets: icon,
                alpha: 0,
                duration: 150,
                yoyo: true,
                repeat: 3,
                onComplete: () => {
                    icon.setVisible(false);
                    icon.setAlpha(1);
                }
            });
        });
    }

    applyStaminaDebuff() {
        this.stamina.regenAmount = 2;
        if (this.staminaIcon) {
            this.staminaIcon.setVisible(true);
            this.flashThenHide(this.staminaIcon);
        }

        this.scene.time.delayedCall(5000, () => {
            this.stamina.regenAmount = 4;
            if (this.staminaIcon) this.staminaIcon.setVisible(false);
            console.log("Stamina debuff ended");
        });
    }

    appliedDebuff() {

        let randomNum = Phaser.Math.Between(1,2);
        if (randomNum === 1) {
            this.FSM.transition('freeze');
        }
        else if (randomNum === 2) {
            this.applyStaminaDebuff();
        }
    }

    preUpdate(time, delta) {
        // since this is overriding the sprite object's preUpdate, run the usual preUpdate sequence before
        // doing anything else
        super.preUpdate(time, delta);
        this.FSM.step();
        this.stamina.StaminaBarFollow(this);
    }

    destroy() {
        if (this.scene)
            this.scene.scene.start("MainMenu");
        super.destroy();
    }
}
