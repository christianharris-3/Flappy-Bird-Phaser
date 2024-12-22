export default class Bird extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(5);
    }
    update(keys){
        this.setAccelerationY(1000);
        if (keys.space.isDown){
            this.setVelocityY(-500);
        }
        this.setAngle(Math.atan(this.body.velocity.y/400)*50);
    }
    hit_boundary(screen_height){
        return (this.body.y<0 || this.body.y>screen_height);
    }
}