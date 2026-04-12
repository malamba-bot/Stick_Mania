export class IdleState extends State {

    enter(scene, stickman) {
        console.log('Entered Idle State');
        stickman.setVelocityX(0);

        //stickman.play('Idle');
    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else if (scene.keys.K.isDown) {
           stickman.StickmanFSM.transition('punch'); 
        } else if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        }
    }
}

export class MoveRightState extends State {

    enter(scene, stickman) {
        stickman.setFlipX(false);
        stickman.direction = 'R';
        stickman.attach_body('facing_right');
    }

    execute(scene, stickman) {
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        }

        if(scene.keys.D.isDown) {
            stickman.setVelocityX(stickman.movement_speed);
            //stickman.move(stickman.movement_speed);
            //stickman.flip(false);
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
        stickman.setFlipX(true);
        stickman.direction = 'L';
        stickman.attach_body('facing_left');
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

export class PunchState extends State {

    enter(scene, stickman) {
        stickman.direction == 'R' ?
            stickman.attach_body('punching_left') :
            stickman.attach_body('punching_right');
    }

    execute(scene, stickman) {
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
export class JumpState extends State {

    enter(scene, stickman) {
        stickman.setVelocityY(stickman.jump_velocity);
        stickman.isGrounded = false;

    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else {
            stickman.StickmanFSM.transition('idle');
        }

    }
}

export class RightArmPunchState extends State {

    enter(scene, stickman) {

        console.log('Entered Right Arm Punch State');
    
    }

    execute(scene, stickman) {

    }
}

export class freezeDebuff extends State {

    enter(scene, stickman) {

        console.log("this bish ain't movin")

        var timer = this.time.addEvent({
            delay: 300,
            callback: callback,
            callbackScope: thisArg,
            repeat: 1,
        });

    }

    execute(scene, stickman) {
    
    }
}

