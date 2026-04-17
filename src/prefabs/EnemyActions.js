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
        const rand = Phaser.Math.Between(1, 3); 
        //console.log('attack roll:', rand, 'isGrounded:', enemy.isGrounded); // ← ADD

        if (rand === 1) {
            enemy.FSM.transition('punch');
        } else if (rand === 2) {
            enemy.FSM.transition('kick');
        } else {
            scene.time.delayedCall(2000, () => {
                enemy.FSM.transition('idle');
            });
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

    if (dist < enemy.attack_distance) {
        enemy.FSM.transition('attack');
        return; 
    }

    if(scene.player.isGrounded) {
        enemy.isJumping = false;
    }

        // Chase player
        enemy.reorient(scene.player);
        const speed = 
            enemy.direction == 'R' ? 2.2 : -2.2;

        // If player is in the air, make enemy jump instead of pathing on angle
    if ((!scene.player.isGrounded && scene.player.body.velocity.y < -2) && enemy.isGrounded && !enemy.attacking) { 
        if(!enemy.isJumping) {
            const jumpChance = 0.4;
            if(Math.random() < jumpChance) {
                enemy.FSM.transition('jump');
            }
            enemy.isJumping = true;
        }
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

        if (enemy.isGrounded) {
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
        enemy.reorient(scene.player);
        enemy.attacking = true;

        enemy.direction == 'R'
            ? enemy.attach_body('kicking_right')
            : enemy.attach_body('kicking_left');

        enemy.play('Kick');

        enemy.once('animationcomplete', () => {
            enemy.attacking = false;
    });
}

execute(scene, enemy) {
    if (enemy.attacking) return;
    enemy.FSM.transition('chase');
}}
