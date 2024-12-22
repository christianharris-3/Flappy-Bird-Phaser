import Bird from './bird.js'
import Pillar from './pillar.js'

let screenw = 1500;
let screenh = 800;

const config = {
    type: Phaser.AUTO,
    width: screenw,
    height: screenh,
    backgroundColor: '#aaaaaa',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let player;
let pillar_objects;
let background;
let score_display;
let keys;
let pillars;
let game_ended;
let score;

function preload(){
    this.load.image('background','Sprites/background.png');
    this.load.image('bird','Sprites/bird.png');
    this.load.image('pillar','Sprites/pillar.png');
    this.load.image('title','Sprites/title.png');
}
function create(){
    game_ended = false;
    score = 0;
    background = this.physics.add.image(screenw/2,screenh/2,'background');

    player = new Bird(this,100,300,'bird');
    pillar_objects = this.physics.add.group();
    keys = this.input.keyboard.createCursorKeys();
    pillars = [];

    this.physics.add.overlap(player, pillar_objects, hit_pillar, null, this);

    score_display = this.add.text(10,10,`Score: ${score}`, {fontFamily: 'Impact', fontSize: '48px', color: '#222'});
    score_display.setDepth(20);

    this.time.addEvent({
        delay: Phaser.Math.Between(2000,3000),
        callback: create_pillar,
        loop: true,
        callbackScope: this,
    });
}
function update(){
    if (!game_ended)
    {
        player.update(keys);
        if (player.hit_boundary(screenh)){
            game_over(this);
        }

        for (const pillar of pillars) {
            pillar.update();
            if (pillar.get_score()){
                score+=1;
                score_display.setText(`Score: ${score}`);
            }
        }
    }
}

function hit_pillar(player, pillar_objects){
    game_over(this);
}
function create_pillar(){
    let new_pillar = new Pillar(this, screenw, screenh,'pillar');
    new_pillar.add_to_group(pillar_objects);
    pillars.push(new_pillar);
}

function game_over(scene){
    player.destroy();
    game_ended = true;
    let game_over_text = scene.add.text(screenw/2,screenh/2,'GAME OVER', {fontFamily:'Impact',fontSize:'100px',color:'#000'});
    game_over_text.setOrigin(0.5,0.5);
}