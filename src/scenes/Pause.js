import {globals} from '../main.js'
import {Button} from '../prefabs/Button.js'

export class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
    }
    init(data) {
        this.keys = 
        {
            ESC: this.input.keyboard.addKey('esc')
        }
        

    }
    create() {
        console.log('Pause scene created');
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        let button_config =
        {
            fontSize: globals.REG_FONT_SIZE,
            padding: 10,
        }


        // Background rectangle (dark transparent overlay)
        const background = this.add.rectangle(
            screenWidth / 2,
            screenHeight / 2,
            screenWidth,
            screenHeight,
            0x000000,
            0.7
        ); 
        background.setOrigin(0.5);


        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;


        this.keys.ESC.on('down', () => {
            this.scene.stop('Pause');
            this.scene.resume('Play');
        });

        // Restart Button
        new Button(
                    this,
                    globals.width / 2, 
                    globals.height * 0.58, 
                    'Resume',
                    button_config,
                    () => {
                        this.scene.stop('Pause');
                        this.scene.resume('Play');
                    }

                );


        // Main Menu Button
        new Button(
                    this,
                    globals.width / 2, 
                    globals.height * 0.68, 
                    'MAIN MENU',
                    button_config,
                    () => {
                        this.scene.stop('Play');
                        this.scene.stop('Pause');
                        this.scene.start('MainMenu');
                    }
                );
    }
}