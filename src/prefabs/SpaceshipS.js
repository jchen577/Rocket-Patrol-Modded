class SpaceshipS extends Phaser.GameObjects.Sprite{//New Spaceship class to add the new type
    constructor(scene,x,y,texture,frame,pointValue,timeValue){
        super(scene,x,y,texture,frame);
    
        scene.add.existing(this);//Add objects to a scene that already exists
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceship2Speed;
        this.times = timeValue;
    }
    
    update(){
        this.x -= this.moveSpeed;

        if(this.x <= 64 -this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width -64;
    }
}