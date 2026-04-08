export class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        this.load.setPath('../../assets/');

        this.load.image('background', 'Background.png');

        // Load stickman assets here
        this.load.setPath('../../assets/stickman/');

        this.load.aseprite('player', 'StickManIdle.png', 'StickManIdle.json');
        this.load.image('base_stance', 'base_stance.png');
    }

    create() {
        this.scene.start('MainMenu')
    }
}
