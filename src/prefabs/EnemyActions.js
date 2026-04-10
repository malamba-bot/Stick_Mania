
export class EnemyIdleState extends State {

    enter(scene, enemy) {
        console.log('Entered Idle State');
        enemy.setVelocity(0, 0);
        //enemy.play('Idle');
    }

    execute(scene, enemy) {
        const dist = Phaser.Math.Distance.Between(
            enemy.x, enemy.y, scene.player.x, scene.player.y
        );

        if (dist < 150) { // Start chasing when player is within 150 pixels
            enemy.StateMachine.transition('chase');
        }
    }
}

export class EnemyChaseState extends State {
    enter(scene, enemy) {
        enemy.play('Walk');
        console.log('Entered Chase State');
    }
    
    execute(scene, enemy) {
        const dist = Phaser.Math.Distance.Between(
            enemy.x, enemy.y, scene.player.x, scene.player.y
        );
        
        if (dist > 200) { // If too far, go back to idle
            enemy.StateMachine.transition('idle');
            return;
        }
        
        const speed = 2.2;
        if (dist > 8) {
            const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, scene.player.x, scene.player.y);
            enemy.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        } else {
            enemy.setVelocity(0, 0);
        }
    }
}
