export class IdleState extends State {

    enter(scene, stickman) {
        console.log('Entered Idle State');
    }

    execute(scene, stickman) {

        console.log("test");
        if (scene.cursors.right.isDown) { 
            stickman.StickmanFSM .transition('right_arm_punch');
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
