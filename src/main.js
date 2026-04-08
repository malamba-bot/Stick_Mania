import {Load} from './scenes/Load.js'
import {MainMenu} from './scenes/MainMenu.js'
import {Play} from './scenes/Play.js'

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 800,
    backgroundColor: '#000000',
    physics: { 
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Load, MainMenu, Play],
}

export let game = new Phaser.Game(config);

export const globals = {
    width: game.config.width,
    height: game.config.height,
    TITLE_FONT_SIZE: 48,
    REG_FONT_SIZE: 32,
}

export const player_consts = {
    start_x: -100,
    start_y: 150,
}
