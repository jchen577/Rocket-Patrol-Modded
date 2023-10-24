/*
Name: Jacky Chen
Title: Rocket Patrol: The Minor Moddining
Time: 10 hours
Mods: Countdown timer(3 points)
      Timer increment on spaceship kill(5 points)
      New spaceship type(5 points)
      High score tracking(1 point)
      New title screen(3 points)
      4 new explosion sound effects(3 points)
Credits: https://phaser.discourse.group/t/countdown-timer/2471/4 (Help for the countdown timer)
*/
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