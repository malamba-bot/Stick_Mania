export class IdleState extends State {

    enter(scene, stickman) {
        console.log('Entered Idle State');
        stickman.move(0);

        //stickman.play('Idle');
        //stickman.sprite.setVelocityX(0);
    }

    execute(scene, stickman) {
        if (scene.keys.A.isDown) {
            stickman.StickmanFSM.transition('move_right');
        }
    }
}

export class MoveRightState extends State {

    enter(scene, stickman) {
        console.log('hoe moving right');
    }

    execute(scene, stickman) {
        if(scene.keys.A.isDown) {
            stickman.move(-200);
            stickman.flipX = true;
            //stickman.play('run');
        } else if (scene.keys.D.isDown) {
            stickman.StickmanFSM.transition('idle');
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

    }
}

export class RightArmPunchState extends State {

    enter(scene, stickman) {

        console.log('Entered Right Arm Punch State');
        
    }

    execute(scene, stickman) {

    }
}
