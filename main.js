const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {

    this.load.image('ground','https://labs.phaser.io/assets/sprites/platform.png');
    this.load.image('player','https://labs.phaser.io/assets/sprites/phaser-dude.png');

}

function create() {

    platforms = this.physics.add.staticGroup();

    platforms.create(400,380,'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100,200,'player');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player,platforms);

    cursors = this.input.keyboard.createCursorKeys();

}

function update() {

    if(cursors.left.isDown){
        player.setVelocityX(-200);
    }

    else if(cursors.right.isDown){
        player.setVelocityX(200);
    }

    else{
        player.setVelocityX(0);
    }

    if(cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-400);
    }

}