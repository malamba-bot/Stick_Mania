export class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        this.load.setPath('../../assets/');

        this.load.image('background', 'Background.png');
        this.load.image('grid_overlay', 'grid_overlay.png');

        // Load stickman assets here
        this.load.setPath('../../assets/stickman/');

        this.load.aseprite('player', 'StickManIdle.png', 'StickManIdle.json');
        this.load.image('base_stance', 'base_stance.png');

        this.load.json('stickmanShapes', 'stickmanMatter.json');
    }

    create() {
        this.scene.start('MainMenu')
    }
}
