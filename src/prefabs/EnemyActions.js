export class EnemyIdleState extends State {

    enter(scene, enemy) {
        enemy.setVelocityX(0);
        enemy.attach_body('idle');
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

        if (rand === 1) {
            enemy.FSM.transition('punch');
        } else if (rand === 2) {
            enemy.FSM.transition('kick');
        } else {
            scene.time.delayedCall(1000, () => {
                if (enemy.active && 
                    enemy.FSM.state != 'freeze' || enemy.FSM.state != 'knockback')
                    enemy.FSM.transition('idle');
            });
        }
    }
}

export class EnemyChaseState extends State {
    enter(scene, enemy) {
        enemy.attach_body('idle');
        enemy.play('Walk');
    }

    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);
        enemy.reorient(scene.player);

        enemy.resetJumpFlag();

        if (enemy.shouldJump(scene, dist)) {
            enemy.isJumping = true;
            enemy.FSM.transition('jump');
            return;
        }

        if (dist <= enemy.attack_distance) {
            if (enemy.shouldStrafe()) {
                enemy.FSM.transition('strafe');
            } else {
                enemy.FSM.transition('attack');
            }
            return;
        }

        enemy.setVelocityX(enemy.getHorizontalSpeed(enemy.chase_speed));
    }
}

export class EnemyStrafeState extends State {
    enter(scene, enemy) {
        enemy.attach_body('idle');
        enemy.play('Walk');
        enemy.strafeDir = enemy.getStrafeDirection(scene);
        enemy.strafeTime = Phaser.Math.Between(enemy.strafe_min_duration, enemy.strafe_max_duration);
        enemy.faceDirection(enemy.strafeDir);
        scene.time.delayedCall(enemy.strafeTime, () => {
            if (enemy.active && 
                (enemy.FSM.state != 'freeze' || enemy.FSM.state != 'knockback'))
                enemy.FSM.transition('chase');
        });
    }
    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);

        if (enemy.isOutsideStrafeRange(dist) || !enemy.isGrounded) {
            enemy.FSM.transition('chase');
            return;
        }

        enemy.faceDirection(enemy.strafeDir);
        enemy.setVelocityX(enemy.getHorizontalSpeed(enemy.strafe_speed));
    }
}

export class EnemyJumpState extends State {

    enter(scene, enemy) {
        enemy.reorient(scene.player);
        enemy.setVelocityY(enemy.jump_velocity);
        enemy.isGrounded = false;
        enemy.play('Jump');
    }

    execute(scene, enemy) {
        enemy.setVelocityX(enemy.getHorizontalSpeed(enemy.chase_speed));

        if (enemy.isGrounded) {
            enemy.FSM.transition('chase');
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
    }
}

