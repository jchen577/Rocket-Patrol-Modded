let highS = 0;

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu,Play],
    physics: 0
}
let game = new Phaser.Game(config);
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let keyF,keyR,keyLEFT,keyRIGHT;