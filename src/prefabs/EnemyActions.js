// Refractored some helper function with the help of Codex -brody
function resetJumpFlag(enemy) {
    if (enemy.isGrounded) {
        enemy.isJumping = false;
    }
}

function isPlayerAboveEnemy(scene, enemy) {
    return scene.player.y < enemy.y - enemy.jump_trigger_height;
}

function isPlayerCloseEnoughToJump(scene, enemy, dist) {
    return dist <= enemy.attack_distance * enemy.jump_trigger_range_multiplier;
}

function shouldEnemyJump(scene, enemy, dist) {
    return (
        isPlayerAboveEnemy(scene, enemy) &&
        isPlayerCloseEnoughToJump(scene, enemy, dist) &&
        !scene.player.isGrounded &&
        scene.player.body.velocity.y < enemy.jump_trigger_velocity &&
        enemy.isGrounded &&
        !enemy.attacking &&
        !enemy.isJumping
    );
}

function shouldEnemyStrafe(enemy) {
    return Math.random() < enemy.strafe_attack_chance;
}

function getHorizontalSpeed(enemy, speed) {
    return enemy.direction === 'R' ? speed : -speed;
}

function getStrafeDirection(scene, enemy) {
    return enemy.x < scene.player.x ? 'L' : 'R';
}

function faceDirection(enemy, direction) {
    direction === 'R' ? enemy.flip_right() : enemy.flip_left();
}

function isOutsideStrafeRange(enemy, dist) {
    return dist > enemy.attack_distance * enemy.jump_trigger_range_multiplier;
}

export class EnemyIdleState extends State {

    enter(scene, enemy) {
        //console.log('in idle state');
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
        //console.log('attack roll:', rand, 'isGrounded:', enemy.isGrounded); // ← ADD

        if (rand === 1) {
            enemy.FSM.transition('punch');
        } else if (rand === 2) {
            enemy.FSM.transition('kick');
        } else {
            scene.time.delayedCall(1000, () => {
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
        enemy.attach_body('idle');
        enemy.play('Walk');
    }

    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);
        enemy.reorient(scene.player);

        resetJumpFlag(enemy);

        if (shouldEnemyJump(scene, enemy, dist)) {
            enemy.isJumping = true;
            enemy.FSM.transition('jump');
            return;
        }

        if (dist <= enemy.attack_distance) {
            if (shouldEnemyStrafe(enemy)) {
                enemy.FSM.transition('strafe');
            } else {
                enemy.FSM.transition('attack');
            }
            return;
        }

        /*
        if (dist < enemy.chill_distance) {
            enemy.FSM.transition('idle');
            return;
        }
        commenting this out because im working on AI -brody */

        enemy.setVelocityX(getHorizontalSpeed(enemy, enemy.chase_speed));
    }
}

export class EnemyStrafeState extends State {
    enter(scene, enemy) {
        console.log('in strafe state');
        enemy.attach_body('idle');
        enemy.play('Walk');
        enemy.strafeDir = getStrafeDirection(scene, enemy);
        enemy.strafeTime = Phaser.Math.Between(enemy.strafe_min_duration, enemy.strafe_max_duration);
        faceDirection(enemy, enemy.strafeDir);
        scene.time.delayedCall(enemy.strafeTime, () => {
            enemy.FSM.transition('chase');
        });
    }
    execute(scene, enemy) {
        const dist = enemy.getDist(scene.player);

        if (isOutsideStrafeRange(enemy, dist) || !enemy.isGrounded) {
            enemy.FSM.transition('chase');
            return;
        }

        faceDirection(enemy, enemy.strafeDir);
        enemy.setVelocityX(getHorizontalSpeed(enemy, enemy.strafe_speed));
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
        enemy.setVelocityX(getHorizontalSpeed(enemy, enemy.chase_speed));

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

export class EnemyKnockbackState extends State {
    enter(scene, stickman) {
        stickman.play('Idle');
        
    }

    execute(scene, stickman) {
        console.log("it happened!");

        const { x, y } = stickman.body.velocity;
        const vel = Math.sqrt(x * x + y * y);
        /*
        if (vel < 1 && stickman.isGrounded) {
            stickman.FSM.transition('idle');
        }
        */
    
    }
}
