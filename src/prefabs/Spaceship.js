class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame,pointValue,timeValue){
        super(scene,x,y,texture,frame);
    
        scene.add.existing(this);//Add objects to a scene that already exists
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.times = timeValue;
    }
    
    update(){
        this.x -= this.moveSpeed;

        if(this.x <= 0 -this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}