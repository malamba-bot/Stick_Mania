import {Load} from './scenes/Load.js'
import {MainMenu} from './scenes/MainMenu.js'
import {Play} from './scenes/Play.js'
import {Pause} from './scenes/Pause.js'

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 800,
    backgroundColor: '#000000',
    physics: { 
        default: 'matter',
        matter: {
            debug: true,
            gravity: { y: 2 },
            setBounds: true,
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    scene: [Load, MainMenu, Play, Pause],
}

export let game = new Phaser.Game(config);

export const globals = {
    width: game.config.width,
    height: game.config.height,
    TITLE_FONT_SIZE: 48,
    REG_FONT_SIZE: 32,
}

export const player_consts = {
    start_x: game.config.width / 2,
    start_y: game.config.height * 0.7,
    basic_fizzle: 3,
    combo_fizzle: 10,
}
