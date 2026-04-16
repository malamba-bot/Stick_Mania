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
        this.enemiesDefeated = 0;

        // Wave text replaced by tally marks - Nina
        //this.waveText = this.scene.add.text(globals.width / 2, 50, 'Wave: 1', { fontFamily: 'Eraser', fontSize: '32px', color: '#ffffff' }).setOrigin(0.5).setDepth(100);
        this.enemiesLeftText = this.scene.add.text(globals.width / 2, 100, 'Enemies Left: ', { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5).setDepth(100);

    }

    startWave(waveIndex) {
        if (waveIndex >= this.waves.length) return;

        this.current_wave = waveIndex;
        const wave = this.waves[waveIndex];
        this.enemies = [];
        this.waveActive = true;
        this.spawnedEnemies = 0;
        this.enemiesDefeated = 0;

        this.spawnTimer = this.scene.time.addEvent({
            delay: wave.spawnInterval,
            callback: this.onSpawnTick,
            callbackScope: this,
            loop: true
        });

        console.log(`Started wave ${waveIndex + 1} with ${wave.enemyCount} enemies.`);
    }

    spawnEnemy(side = 'right') {
        //const spawnX = side === 'left' ? -50 : scene.sys.canvas.width + 50;
        const spawnX = side === 'left' ? 50 : globals.width - 50;
        const spawnY =  300;

        const enemy = new EnemyStick(this.scene, spawnX, spawnY, 'idle', false);
        this.enemies.push(enemy);
        this.spawnedEnemies += 1;
    }

    update() {
        //this.waveText.setText('Wave: ' + this.current_wave + 1);
        this.enemiesLeftText.setText('Enemies Left: ' + (this.waves[this.current_wave].enemyCount - this.enemiesDefeated));
        //this.addNumTallymark(this.waves[this.current_wave].enemyCount - this.enemiesDefeated);

        if (!this.waveActive) return;
        
        //  state machine handling for each enemy stopping each enemys state machine from being handled
        //  in the play scene and instead being handled in the wave spawner
        for (const enemy of this.enemies) { // TODO move this to stick class
            enemy.health.healthBarFollow(enemy);
        }

        this.enemies = this.enemies.filter(enemy => {
            console.log(enemy.health.value);
            if (enemy.health.value <= 0) {
                enemy.destroy();
                enemy.health.deleteHealthBar();
                this.enemiesDefeated++;
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

    onSpawnTick() {
        const wave = this.waves[this.current_wave];

        if(this.spawnedEnemies >= wave.enemyCount) {
            this.spawnTimer.remove();
            return;
        }

        if(this.enemies.length < 3) {
            const side = this.spawnedEnemies % 2 === 0 ? 'left' : 'right';

            this.spawnEnemy(side);
        }
    }
    addNumTallymark(numTallies) {

        this.tallyTextX = 0;
        this.tallyTextY = 0;
        this.tallyText = '';

        for (let i = 0; i < numTallies; i++) {
             this.tallyText += '|';
        }

        return this.tallyText;
    }
}
