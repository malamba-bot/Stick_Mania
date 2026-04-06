export class Stickman extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;

        this.construct_body();
    }

    construct_body() {
        this.add(this.scene.add.text(0, 0, "Hello world"));

    }
}

// Register this object with Phaser's object factory
// Parameters define the key and the function which will be run when when this.add.<key> is called
Phaser.GameObjects.GameObjectFactory.register('stickman', function (x, y, config) {
    return this.displayList.add(new Stickman(this.scene, x, y, config));
});

