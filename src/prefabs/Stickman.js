export class Stickman extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;

        this.construct_body();
        scene.add.existing(this);
    }

    construct_body() {
        let text = this.scene.add.text(0, 0, "Hello world")
            .setOrigin(0.5);
        this.add(text);
    }
}
