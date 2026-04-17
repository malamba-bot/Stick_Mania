export class IdleState extends State {

    enter(scene, stickman) {
        stickman.setVelocityX(0);
        stickman.attach_body('idle');
        stickman.play('Idle');
    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.FSM.transition('move_left');
        } else if (scene.keys.D.isDown) {
            stickman.FSM.transition('move_right');
        } else if (scene.keys.K.isDown) {
           stickman.FSM.transition('punch'); 
        }  else if (scene.keys.L.isDown) {
            stickman.FSM.transition('kick');
        } else if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.FSM.transition('jump');
        }
    }
}

export class MoveRightState extends State {

    enter(scene, stickman) {
        stickman.flip_right();
        stickman.attach_body('idle');
        stickman.play('Walk');
    }

    execute(scene, stickman) {
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.FSM.transition('jump');
        }

        if(scene.keys.D.isDown) {
            stickman.setVelocityX(stickman.movement_speed);
            //stickman.move(stickman.movement_speed);
            //stickman.play('run');
        } else if (scene.keys.A.isDown) {
            stickman.FSM.transition('move_left');
        } else {
            stickman.FSM.transition('idle');
        }
        if (scene.keys.K.isDown) {
            stickman.FSM.transition('punch');
        }
    }
}

export class MoveLeftState extends State {

    enter(scene, stickman) {
        stickman.flip_left();
        stickman.attach_body('idle');
        stickman.play('Walk');
    }

    execute(scene, stickman) {
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.FSM.transition('jump');
        } else if(scene.keys.A.isDown) {
            stickman.setVelocityX(-stickman.movement_speed);
        } else if (scene.keys.D.isDown) {
            stickman.FSM.transition('move_right');
        } else {
            stickman.FSM.transition('idle');
        }
        if (scene.keys.K.isDown) {
            stickman.FSM.transition('punch');
        }
    }
}

export class JumpState extends State {

    enter(scene, stickman) {
        stickman.setVelocityY(stickman.jump_velocity);
        stickman.isGrounded = false;
        scene.sound.play("jump_sound", {
            volume: 0.5
        });
        stickman.play('Jump');
    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.isGrounded ?
                stickman.FSM.transition('move_left') :
                stickman.flip_left();
                stickman.setVelocityX(-stickman.movement_speed);
        } else if (scene.keys.D.isDown) {
            stickman.isGrounded ?
                stickman.FSM.transition('move_right') :
                stickman.flip_right();
                stickman.setVelocityX(stickman.movement_speed);
        } else if (stickman.isGrounded){
            stickman.FSM.transition('idle');
        }

    }
}

export class PunchState extends State {

    enter(scene, stickman) {
        if (stickman.stamina.value < 10) {
            stickman.FSM.transition('idle');
            return;
        }
        stickman.punch();
        
    }

    execute(scene, stickman) {
        if (stickman.attacking) return;
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.FSM.transition('jump');
        } else if (scene.keys.D.isDown) {
            stickman.FSM.transition('move_right');
        } else if (scene.keys.A.isDown) {
            stickman.FSM.transition('move_left');
        } else {
            stickman.FSM.transition('idle');
        }

    }
}

export class KickState extends State {

    enter(scene, stickman) {
        if (stickman.stamina.value < 10) {
            stickman.FSM.transition('idle');
            return;
        }
        stickman.kick();
    }

    execute(scene, stickman) {
        if (stickman.attacking) return;
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.FSM.transition('jump');
        } else if (scene.keys.D.isDown) {
            stickman.FSM.transition('move_right');
        } else if (scene.keys.A.isDown) {
            stickman.FSM.transition('move_left');
        } else {
            stickman.FSM.transition('idle');
        }

    }
}

export class FreezeState extends State {

    enter(scene, stickman) {
        stickman.attach_body('idle');
        stickman.play('Frozen');
        if (stickman.snowflakeIcon) stickman.snowflakeIcon.setVisible(true);

        scene.time.delayedCall(5000, () => {
            if (stickman.snowflakeIcon) stickman.snowflakeIcon.setVisible(false);
            stickman.FSM.transition('idle');
        }, [], this);

    }

    execute(scene, stickman) {
    
    }
}

export class KnockbackState extends State {
    enter(scene, stickman) {
        stickman.play('Idle');
    }

    execute(scene, stickman) {
        const { x, y } = stickman.body.velocity;
        const vel = Math.sqrt(x * x + y * y);
        if (vel < 1 && stickman.isGrounded) {
            stickman.FSM.transition('idle');
        }
    
    }
}

