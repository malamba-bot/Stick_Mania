export class IdleState extends State {

    enter(scene, stickman) {
        console.log('Entered Idle State');
        stickman.move(0);

        //stickman.play('Idle');
    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        }
        if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        }
        if (scene.keys.W.isDown) {
            stickman.StickmanFSM.transition('jump');
        }
    }
}

export class MoveRightState extends State {

    enter(scene, stickman) {
    }

    execute(scene, stickman) {
        if(scene.keys.D.isDown && stickman.blocked.right == false) {
            stickman.move(stickman.movement_speed);
            stickman.flipX = true;
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
    }

    execute(scene, stickman) {
        if(scene.keys.A.isDown && stickman.blocked.left == false) {
            stickman.move(-stickman.movement_speed);
            stickman.flipX = true;
            //stickman.play('run');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else {
            stickman.StickmanFSM.transition('idle');
        }

    }
}

export class JumpState extends State {

    enter(scene, stickman) {
        console.log('Entered Jump State');
    }

    execute(scene, stickman) {

        if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_left');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('move_right');
        } else if (!scene.keys.W.isDown){
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
