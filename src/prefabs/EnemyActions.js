export class EnemyIdleState extends State {

    enter(scene, enemy) {
        //console.log('in idle state');
        enemy.setVelocityX(0);
        enemy.direction === 'R'
            ? enemy.attach_body('facing_right')
            : enemy.attach_body('facing_left');
        enemy.play('Idle');
    }

    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);
        if (dist > enemy.chill_distance) {
            enemy.FSM.transition('chase');
        }
    }
}

export class EnemyAttackState extends State {
    enter(scene, enemy) {
        const rand = Phaser.Math.Between(1, 2);
        if (rand === 1) {
            enemy.FSM.transition('punch');
        } else if (rand === 2) {
            enemy.FSM.transition('punch');
        }
    }

    execute(scene, enemy) {
    }
}

export class EnemyChaseState extends State {
    enter(scene, enemy) {
        //console.log('in chase state');
        enemy.direction === 'R'
            ? enemy.attach_body('facing_right')
            : enemy.attach_body('facing_left');

        enemy.play('Walk');
    }

    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);

        // Exit chase and stop if within x pixels
        // TODO change this if you want AI to chill
        if (dist < enemy.chill_distance) {
            enemy.FSM.transition('idle');
        } else if (dist < enemy.attack_distance) {
            enemy.FSM.transition('attack');
        }

        // Chase player
        enemy.reorient(scene.player);
        const speed = 
            enemy.direction == 'R' ? 2.2 : -2.2;

        // If player is in the air, make enemy jump instead of pathing on angle
        if (dist < -100 &&
            !scene.player.isGrounded && enemy.isGrounded) {
            enemy.FSM.transition('jump');
        }

        // Only move horizontally, don't apply vertical velocity
        enemy.setVelocityX(speed);
    }
}

export class EnemyJumpState extends State {

    enter(scene, enemy) {
        enemy.setVelocityY(enemy.jump_velocity);
        enemy.isGrounded = false;
    }

    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);

        if (dist > 400) {
            enemy.FSM.transition('idle');
        } else if (enemy.isGrounded) {
            enemy.FSM.transition('chase');
        }
    }
}

export class EnemyPunchState extends State {

    enter(scene, enemy) {
        //console.log('punching state');        
        enemy.reorient(scene.player);
        enemy.attacking = true;
        enemy.direction == 'R'
            ? enemy.attach_body('punching_right')
            : enemy.attach_body('punching_left');

        enemy.play('Punch');
        enemy.once('animationcomplete', () => {
            enemy.attacking = false
        });
    }

    execute(scene, enemy) {
        if (enemy.attacking) return;

        //const dist = enemy.getDist(scene.player);
            enemy.FSM.transition('chase');
    }
}

export class EnemyKickState extends State {

    enter(scene, enemy) {
        enemy.direction == 'R'
            ? enemy.attach_body('kicking_right')
            : enemy.attach_body('kicking_left');
    }

    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);

        if (dist > 400) {
            enemy.FSM.transition('idle');
        } else {
            enemy.FSM.transition('chase');
        }
    }
}

export class EnemyFreezeDebuff extends State {

    enter(scene, enemy) {
        enemy.play('Frozen');

        /* TODO
        scene.time.delayedCall(5000, () => {
            enemy.FSM.transition('idle');
        }, [], this);
        */

    }

    execute(scene, enemy) {
        const { x, y } = enemy.body.velocity;
        const vel = Math.sqrt(x * x + y * y);
        if (vel < 0.2 && enemy.isGrounded) {
            enemy.FSM.transition('idle');
        }
    
    }
}
