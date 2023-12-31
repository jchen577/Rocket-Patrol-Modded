class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starfield','./assets/starfield.png');
        this.load.image('spaceship2','./assets/spaceship2.png');
        this.load.spritesheet(`explosion`,'./assets/explosion.png',{frameWidth: 64, frameHeight: 32, startFram: 0, endFrame: 9});

    }

    create(){
        this.initTime = 60;
        //tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
//green background
        this.add.rectangle(0,borderUISize+borderPadding,game.config.width,borderUISize*2,0x00FF00).setOrigin(0,0);
//white borders
        this.add.rectangle(0,0,game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,game.config.height - borderUISize,game.config.width,borderUISize,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0,borderUISize,game.config.height,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize,0,borderUISize,game.config.height,0xFFFFFF).setOrigin(0,0);
        
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30,5).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20,4).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10,3).setOrigin(0,0);
        this.ship04 = new SpaceshipS(this, game.config.width -50, borderUISize*6 + borderPadding*4+50, 'spaceship2', 0, 50,5).setOrigin(0, 0);
        //New and smaller spaceship, significantly faster

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{start:0,end:9,first:0}),
            frameRate: 30
        })
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:100,
        }
        //Create a config for the highscore text
        let highSConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#00FF00',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:0,
        }

        this.timer = this.add.text(game.config.width-borderPadding-borderUISize-60, game.config.height-borderPadding-borderUISize-10,`Time:${this.initTime}`,highSConfig).setOrigin(0.5);

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize+borderPadding*2,this.p1Score,scoreConfig);
        //Add the high score text and number
        this.scoreRight = this.add.text(game.config.width - borderPadding-borderUISize-100,borderUISize+borderPadding*2,highS,scoreConfig);
        this.highSText = this.add.text(game.config.width - borderPadding - borderUISize - 250,borderUISize+borderPadding*2,'High Score:',highSConfig)
        

        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        /*this.clock = this.time.delayedCall(60000,()=>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2,game.config.height/2 +64,'Press (R) to Restart or <- for Menu',scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            //After the game ends, if the user got a new high score, change highS to that score
            if(this.p1Score > highS){
                highS = this.p1Score;
            }
        },null,this);*/
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        //Add a looped event which plays every second to call to onEvent
        this.clock = this.time.delayedCall(30000,()=>{//Make the spaceships speed up after 30 seconds
                this.ship01.moveSpeed = this.ship01.moveSpeed *1.5;
                this.ship02.moveSpeed = this.ship02.moveSpeed *1.5;
                this.ship03.moveSpeed = this.ship03.moveSpeed *1.5;
                this.ship04.moveSpeed = this.ship04.moveSpeed *1.5;

        },null,this);
    }
    
    update(){
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update()
        }

        if(this.checkCollision(this.p1Rocket,this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket,this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket,this.ship04)){//New spaceship collision
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
    }

    checkCollision(rocket,ship){
        if(rocket.x < ship.x + ship.width && rocket.x +rocket.width >ship.x
           && rocket.y < ship.y + ship.height && rocket.height+rocket.y > ship.y 
        ){
            return true;
        }else{
            return false;
        }
    }


    shipExplode(ship){
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x,ship.y,'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete',()=>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.initTime += ship.times;//Add time to timer
        this.scoreLeft.text = this.p1Score;
        this.soundN = Math.round(Math.random()*4);//Determine which sound to play
        if(this.soundN ==1){//If the number is 1 2 or 3 play a sound
            this.sound.play('sfx_explosion1');
        }
        else if(this.soundN == 2){
            this.sound.play('sfx_explosion2');
        }
        else if(this.soundN ==3){
            this.sound.play('sfx_explosion4')
        }
        else{
            this.sound.play('sfx_explosion3');
        }
        
    }

    onEvent ()//Timer loop(Decrement the time)
    {
        this.initTime -= 1; // One second
        this.timer.setText('Time:'+Math.floor(this.initTime));//Change the text
        if(this.initTime == 0){
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth:0,
            }//Print the game over message
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2,game.config.height/2 +64,'Press (R) to Restart or <- for Menu',scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            //After the game ends, if the user got a new high score, change highS to that score
            if(this.p1Score > highS){
                highS = this.p1Score;
            }
            this.time.removeEvent(this.timedEvent);
        }
    }
}
