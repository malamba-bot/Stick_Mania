export class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        this.load.setPath('../assets/stickman');
        this.load.image('base_stance', 'base_stance.png');
    }

    create() {

    }
}
