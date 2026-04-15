import {EnemyStick} from '../prefabs/EnemyStick.js'
import {globals} from '../main.js'

export class WaveSpawner {
    constructor(scene, waves) {
        this.scene = scene;
        this.waves = waves;
        this.current_wave = 0;
        this.enemies = [];
        this.waveActive = false;
        this.spawnedEnemies = 0;
    }

    startWave(waveIndex) {
        if (waveIndex >= this.waves.length) return;

        this.current_wave = waveIndex;
        const wave = this.waves[waveIndex];
        this.enemies = [];
        this.waveActive = true;
        this.spawnedEnemies = 0;

        for  (let i = 0; i < wave.enemyCount; i++) {
            // Alternate sides: even indices on left, odd on right
            const side = i % 2 === 0 ? 'left' : 'right';
            this.scene.time.delayedCall(
                i * wave.spawnInterval, () => { 
                    this.spawnEnemy(side);
                });
        }
        console.log(`Started wave ${waveIndex + 1} with ${wave.enemyCount} enemies.`);
    }
    spawnEnemy(side = 'right') {
        const scene = this.scene;

        //const spawnX = side === 'left' ? -50 : scene.sys.canvas.width + 50;
        const spawnX = 400;
        const spawnY =  300;

        const enemy = new EnemyStick(scene, spawnX, spawnY, 'idle', false);
        this.enemies.push(enemy);
        this.spawnedEnemies += 1;
    }
    update() {
        if (!this.waveActive) return;
        
        //  state machine handling for each enemy stopping each enemys state machine from being handled
        //  in the play scene and instead being handled in the wave spawner
        for (const enemy of this.enemies) {
            if (enemy.StateMachine) {
                enemy.StateMachine.step();
            }
            enemy.health.healthBarFollow(enemy);
        }

        this.enemies = this.enemies.filter(enemy => {
            if (enemy.health.value <= 0) {
                enemy.destroy();
                enemy.health.deleteHealthBar();
                return false;
            }
            return true;
        });

        const wave = this.waves[this.current_wave];

        if (this.spawnedEnemies >= wave.enemyCount && this.enemies.length === 0) {
            this.completeWave();
        }
    }

    completeWave() {
        this.waveActive = false;

        this.scene.time.delayedCall(2000, () => {
            this.startWave(this.current_wave + 1);
        });
    }
}
