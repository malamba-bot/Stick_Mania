export class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        this.load.setPath('../../assets/');

        this.load.json('hitboxes', 'json/hitboxes.json');

        this.load.image('background', 'Background.png');
        this.load.image('grid_overlay', 'grid_overlay.png');

        // Load stickman assets here
        this.load.setPath('../../assets/stickman/');

        this.load.aseprite('player', 'StickManIdle.png', 'StickManIdle.json');
        this.load.image('base_stance', 'base_stance.png');
        this.load.image('snowflake', '../snowflake.png');

        this.load.spritesheet('idle', 'idle_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('punch', 'punching_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('walk', 'walk_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('jump', 'jump_spritesheet.png', { frameWidth: 1080, frameHeight: 1920});
        this.load.spritesheet('kick', 'kick_spritesheet.png', { frameWidth: 1080, frameHeight: 1920}); 
    }

    create() {
        this.scene.start('MainMenu')
    }
}
