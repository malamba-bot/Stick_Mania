import {globals} from '../main.js'

export class Button extends Phaser.GameObjects.Container {

    constructor(scene, x, y, text, config, callback) {
        super(scene, x, y);

        let button_text = scene.add.text(
            0, 0, text, config
        ).setOrigin(0.5)

        let button_box = scene.add.rectangle(
            0, 0, 
            button_text.width, 
            button_text.height, 
            null
        )
            .setInteractive( {useHandCursor: true} )
            .setRounded(globals.rounding) 
            .setStrokeStyle(2, 0xFFFFFF)
            .setDepth(button_text.depth - 1);

        button_box
            .on('pointerdown', callback)
            .on('pointerover', () => { button_box.setFillStyle(globals.colors.green) })
            .on('pointerout', () => { button_box.setFillStyle(null) })

        this.add(button_box);
        this.add(button_text);

        scene.add.existing(this);
    }
}
