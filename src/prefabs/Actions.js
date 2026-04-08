export class IdleState extends State {

    enter(scene, stickman) {
        console.log('Entered Idle State');

        //stickman.play('Idle');
        //stickman.sprite.setVelocityX(0);
    }

    execute(scene, stickman) {
        if (scene.cursors.right.isDown) { 
            stickman.StickmanFSM.transition('right_arm_punch');
        }

    }
}

export class MovementState extends State {

    enter(scene, stickman) {
        console.log('Entered Movement State');
    }

    execute(scene, stickman) {

        const { A, D } = scene.keys;

        if(A.isDown) {
            stickman.setVelocityX(-200);
            stickman.flipX = true;
            //stickman.play('run');
        } else if (D.isDown) {
            stickman.setVelocityX(200);
            stickman.flipX = false;
            //stickman.play('run');
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
