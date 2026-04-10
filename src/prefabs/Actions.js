export class IdleState extends State {

    enter(scene, stickman) {
        console.log('Entered Idle State');
        stickman.setVelocityX(0);

        //stickman.play('Idle');
    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        }
        if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        }
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        }
    }
}

export class MoveRightState extends State {

    enter(scene, stickman) {
        stickman.setFlipX(false);
        stickman.attach_body('facing_right');
    }

    execute(scene, stickman) {
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        }

        if(scene.keys.D.isDown) {
            const frame_speed = stickman.movement_speed * (scene.game.loop.delta / 1000);
            stickman.setVelocityX(stickman.movement_speed);
            //stickman.move(stickman.movement_speed);
            //stickman.flip(false);
            //stickman.play('run');
        } else if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        } else {
            stickman.StickmanFSM.transition('idle');
        }

    }
}

export class MoveLeftState extends State {

    enter(scene, stickman) {
        stickman.setFlipX(true);
        stickman.attach_body('facing_left');
    }

    execute(scene, stickman) {
        if (scene.keys.SPACE.isDown && stickman.isGrounded) {
            stickman.StickmanFSM.transition('jump');
        }

        if(scene.keys.A.isDown) {
            const frame_speed = stickman.movement_speed * (scene.game.loop.delta / 1000);
            stickman.setVelocityX(-stickman.movement_speed);
            //stickman.move(-stickman.movement_speed);
            //stickman.flip(true);
            //stickman.play('run');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else  {
            stickman.StickmanFSM.transition('idle');
        }

    }
}

export class JumpState extends State {

    enter(scene, stickman) {
        console.log('Entered Jump State');
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
