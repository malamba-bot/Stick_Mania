import {globals} from '../main.js'
import {Button} from '../prefabs/Button.js'

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('MainMenu');
    }

    preload() {
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

        new Button(
            this,
            globals.width / 2, 
            globals.height * 0.58, 
            'Start',
            button_config,
            () =>  this.scene.start('Play') 
        );
    }
}
