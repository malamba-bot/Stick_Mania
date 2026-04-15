export class IdleState extends State {

    enter(scene, stickman) {
        stickman.setVelocityX(0);
        stickman.direction === 'R'
            ? stickman.attach_body('facing_right')
            : stickman.attach_body('facing_left');
        stickman.play('Idle');
    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else if (scene.keys.K.isDown) {
           stickman.StickmanFSM.transition('punch'); 
        }  else if (scene.keys.L.isDown) {
            stickman.StickmanFSM.transition('kick');
        } else if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        }
    }
}

export class MoveRightState extends State {

    enter(scene, stickman) {
        stickman.flip_right();
        stickman.attach_body('facing_right');
        stickman.play('Walk');
    }

    execute(scene, stickman) {
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        }

        if(scene.keys.D.isDown) {
            stickman.setVelocityX(stickman.movement_speed);
            //stickman.move(stickman.movement_speed);
            //stickman.play('run');
        } else if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        } else {
            stickman.StickmanFSM.transition('idle');
        }
        if (scene.keys.K.isDown) {
            stickman.StickmanFSM.transition('punch');
        }
    }
}

export class MoveLeftState extends State {

    enter(scene, stickman) {
        stickman.flip_left();
        stickman.attach_body('facing_left');
        stickman.play('Walk');
    }

    execute(scene, stickman) {
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        } else if(scene.keys.A.isDown) {
            stickman.setVelocityX(-stickman.movement_speed);
            //stickman.play('run');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else {
            stickman.StickmanFSM.transition('idle');
        }
        if (scene.keys.K.isDown) {
            stickman.StickmanFSM.transition('punch');
        }
    }
}

export class JumpState extends State {

    enter(scene, stickman) {
        stickman.setVelocityY(stickman.jump_velocity);
        stickman.isGrounded = false;
        stickman.play('Jump');
    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.isGrounded ?
                stickman.StickmanFSM.transition('move_left') :
                stickman.flip_left();
                stickman.setVelocityX(-stickman.movement_speed);
        } else if (scene.keys.D.isDown) {
            stickman.isGrounded ?
                stickman.StickmanFSM.transition('move_right') :
                stickman.flip_right();
                stickman.setVelocityX(stickman.movement_speed);
        } else if (stickman.isGrounded){
            stickman.StickmanFSM.transition('idle');
        }

    }
}

export class PunchState extends State {

    enter(scene, stickman) {
        stickman.attacking = true;
        stickman.direction == 'R'
            ? stickman.attach_body('punching_right')
            : stickman.attach_body('punching_left');

        stickman.play('Punch');
        stickman.once('animationcomplete', () => {
            stickman.attacking = false
        });
    }

    execute(scene, stickman) {
        if (stickman.attacking) return;
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        } else {
            stickman.StickmanFSM.transition('idle');
        }

    }
}

export class KickState extends State {

    enter(scene, stickman) {
        stickman.attacking = true;
        stickman.direction == 'R'
            ? stickman.attach_body('kicking_right')
            : stickman.attach_body('kicking_left');

        stickman.play('Kick');
        stickman.once('animationcomplete', () => {
            stickman.attacking = false
        });
    }

    execute(scene, stickman) {
        if (stickman.attacking) return;
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        } else {
            stickman.StickmanFSM.transition('idle');
        }

    }
}

export class freezeDebuff extends State {

    enter(scene, stickman) {

        console.log("this bish ain't movin");
        stickman.play('Frozen');
        stickman.setVelocityX(0);

        scene.time.delayedCall(5000, () => {
            stickman.StickmanFSM.transition('idle');
        }, [], this);

    }

    execute(scene, stickman) {
    
    }
}

