export default class Pillar
{
    constructor(scene, screen_width, screen_height, image) {
        this.score_added = false;

        let gap = Phaser.Math.Between(200,400);
        let y_pos = Phaser.Math.Between(100,screen_height-gap-200);

        this.top_pillar = scene.physics.add.sprite(screen_width,y_pos,image);
        this.top_pillar.setOrigin(0,1);
        this.top_pillar.setOffset(this.top_pillar.width/2,-this.top_pillar.height/2);


        this.bottom_pillar = scene.physics.add.sprite(screen_width,y_pos+gap,image);
        this.bottom_pillar.setFlipY(true);
        this.bottom_pillar.setOrigin(0,0);
        this.bottom_pillar.setOffset(this.top_pillar.width/2,this.top_pillar.height/2);


    }
    add_to_group(group){
        group.add(this.top_pillar);
        group.add(this.bottom_pillar);
    }
    update(){
        this.top_pillar.x -= 10;
        this.bottom_pillar.x -= 10;
    }
    get_score(){
        if (!this.score_added && this.top_pillar.x<100){
            this.score_added = true;
            return true;
        }
        return false;
    }
}