
export class EnemyIdleState extends State {

    enter(scene, enemy) {
        enemy.setVelocityX(0);
        enemy.direction === 'R'
            ? enemy.attach_body('facing_right')
            : enemy.attach_body('facing_left');
        enemy.play('Idle');
    }

    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);

        // Attack if close enough
        if (dist < 125) {
            const rand = Phaser.Math.Between(1, 3);
            if (rand === 1) {
                enemy.StateMachine.transition('punch');
            } else if (rand === 2) {
                enemy.StateMachine.transition('kick');
            } else if (rand === 3 && enemy.isGrounded) {
                enemy.StateMachine.transition('jump');
            }
        }

        // Only re-engage chase if player moves far away (300+ pixels)
        if (dist > 300) {
            enemy.StateMachine.transition('chase');
        }
    }
}

export class EnemyChaseState extends State {
    enter(scene, enemy) {
        enemy.direction === 'R'
            ? enemy.attach_body('facing_right')
            : enemy.attach_body('facing_left');

        enemy.play('Walk');
    }
    
    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);
        
        // Exit chase and stop if within x pixels
        // TODO change this if you want AI to chill
        if (dist < 0) {
            enemy.StateMachine.transition('idle');
        }
        
        // Chase player
        enemy.reorient(scene.player);
        const speed = 
            enemy.direction == 'R' ? 2.2 : -2.2;
        
        // If player is in the air, make enemy jump instead of pathing on angle
        if (!scene.player.isGrounded && enemy.isGrounded) {
            enemy.StateMachine.transition('jump');
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
            enemy.StateMachine.transition('idle');
        } else if (enemy.isGrounded) {
            enemy.StateMachine.transition('chase');
        }
    }
}

export class EnemyPunchState extends State {

    enter(scene, enemy) {
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

        const dist = enemy.getDist(scene.player);

        if (dist > 400) {
            enemy.StateMachine.transition('idle');
        } else {
            enemy.StateMachine.transition('chase');
        }
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
            enemy.StateMachine.transition('idle');
        } else {
            enemy.StateMachine.transition('chase');
        }
    }
}
