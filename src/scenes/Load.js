export class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        this.load.setPath('./assets/');

        this.load.json('hitboxes', 'json/hitboxes.json');

        this.load.image('background', 'Background.png');
        this.load.image('grid_overlay', 'grid_overlay.png');
        this.load.image('snowflake', 'snowflake.png');
        this.load.image('lock', 'Lock.png');
        this.load.image('low_stamina', 'staminaDecrease.png');
        this.load.image('tallymark', 'tallymark.png');
        this.load.image('tallymarkV', 'WaveV.png');
        this.load.image('tallymarkX', 'WaveX.png');

        this.load.audio('kick_sound', 'kick.mp3');
        this.load.audio('punch_sound', 'punch.mp3');
        this.load.audio('jump_sound', 'impactWood_medium_002.ogg');

        // Load stickman assets here
        this.load.setPath('./assets/stickman/');

        this.load.aseprite('player', 'StickManIdle.png', 'StickManIdle.json');
        this.load.image('base_stance', 'base_stance.png');

        this.load.spritesheet('idle', 'idle_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('punch', 'punching_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('walk', 'walk_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('jump', 'jump_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('kick', 'kick_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('frozen', 'freeze_spritesheet.png', {frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('melt', 'melt_spritesheet.png', {frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('fizzling', 'fizzling_spritesheet.png', {frameWidth: 1080, frameHeight: 1920});
    }

    create() {
        this.init_animations();
        this.scene.start('MainMenu');

    }

    init_animations() {
        if (!this.anims.exists('Idle')) {
            this.anims.create({
                key: 'Idle',
                frames: this.anims.generateFrameNames('idle', { start: 0, end: 2}),
                frameRate: 6,
                repeat: -1
            });
        }

        if(!this.anims.exists('Punch')) {
            this.anims.create({
                key: 'Punch',
                frames: this.anims.generateFrameNames('punch', { start: 0, end: 7 }),
                frameRate: 12,
            });
        }

        if(!this.anims.exists('Kick')) {
            this.anims.create({
                key: 'Kick',
                frames: this.anims.generateFrameNames('kick', { start: 0, end: 7 }),
                frameRate: 12,
            });
        }


        if(!this.anims.exists('Walk')) {
            this.anims.create({
                key: 'Walk',
                frames: this.anims.generateFrameNames('walk', { start: 0, end: 5 }),
                frameRate: 16,
                repeat: -1,
            });
        }


        if(!this.anims.exists('Jump')) {
            this.anims.create({
                key: 'Jump',
                frames: this.anims.generateFrameNames('jump', { start: 2, end: 9 }),
                frameRate: 8,
            });
        }

        if(!this.anims.exists('Frozen')) {
            this.anims.create({
                key: 'Frozen',
                frames: this.anims.generateFrameNames('frozen', { start: 0, end: 4 }),
                frameRate: 10,
            });
        }

        if(!this.anims.exists('fizzling')) {
            this.anims.create({
                key: 'fizzling',
                frames: this.anims.generateFrameNames('fizzling', { start: 0, end: 4 }),
                frameRate: 10,
            });
        }
    }
}
