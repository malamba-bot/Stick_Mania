import {globals} from '../main.js'

export class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
    }

    init(scene) {
       this.scene = scene; 
    }

    create() {

        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        // Box size
        const boxWidth = 800;
        const boxHeight = 800;

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

        // Outline rectangle
        const outline = this.add.graphics();
        outline.lineStyle(4, 0xffffff, 1);
        outline.strokeRect(
            (screenWidth - boxWidth) / 2,
            (screenHeight - boxHeight) / 2,
            boxWidth,
            boxHeight
        );

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        const buttonStyle = {
            fontSize: '32px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 20, y: 10 },
            fixedWidth: 200,
            align: 'center',
            stroke: '#000000',
            strokeThickness: 2
        };

        this.scene.keys.ESC.on('down', () => {
            this.scene.exit();
            this.scene.launch('Play');
        });

        // Restart Button
        const restartButton = this.add.text(centerX, centerY + 80, 'Restart', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => restartButton.setScale(1.1))
            .on('pointerout', () => restartButton.setScale(1))
            .on('pointerdown', () => {
                this.click.play();
                this.scene.stop('Pause');
                this.scene.start('Play');
            });

        // Main Menu Button
        const menuButton = this.add.text(centerX, centerY, 'Main Menu', buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => menuButton.setScale(1.1))
            .on('pointerout', () => menuButton.setScale(1))
            .on('pointerdown', () => {
                this.click.play();
                this.scene.stop('Pause');
                this.scene.start('MainMenu');
            });
    }
}
