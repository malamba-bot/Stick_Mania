import {globals} from '../main.js'

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('MainMenu');
    }

    preload() {
        // load assets here
        this.load.image('background', 'src/assets/Background.png');
    }


    create() {
        // Title text
        this.add.text(
            globals.width / 2, 
            globals.height * 0.4,
            'Stick Mania',
            {fontSize: globals.TITLE_FONT_SIZE}
        ).setOrigin(0.5);

        // Start button
        let button_config = 
            {
                fontSize: globals.REG_FONT_SIZE,
                padding: 10,
            };
        this.add_button(
            globals.width / 2, 
            globals.height * 0.58, 
            'Start',
            button_config);
    }

    add_button(x, y, text, config) {
        let button_text = this.add.text(
            x, y, text, config
        ).setOrigin(0.5)

        let button_box = this.add.rectangle(
            x, y, 
            button_text.width, 
            button_text.height, 
            null
        ).setInteractive( {useHandCursor: true} );

        button_box.setStrokeStyle(2, 0xFFFFFF);
        button_box.setDepth(button_text.depth - 1);
        button_box
            .on('pointerdown', () => { this.scene.start('Play') })
            .on('pointerover', () => { button_box.setFillStyle(0x4DAD48) })
            .on('pointerout', () => { button_box.setFillStyle(null) })
    }


}
