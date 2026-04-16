import {Stickman} from './Stickman.js'

export class EnemyStick extends Stickman {

    constructor(scene, x, y, texture, is_playable) {
        super(scene, x, y, texture, is_playable);
        this.chill_distance = 100;
        this.attack_distance = 0;
    }

    reorient(opp) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, opp.x, opp.y);
        
        // Determine direction (left or right)
        if (Math.cos(angle) > 0) {
            if (this.direction !== 'R') {
                this.flip_right();
                this.attach_body('facing_right');
            }
        } else {
            if (this.direction !== 'L') {
                this.flip_left();
                this.attach_body('facing_left');
            }
            
        }
    }

    getDist(opp) {
        return Phaser.Math.Distance.Between(
            this.x, this.y, opp.x, opp.y);
    }
}
