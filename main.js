const config = {

type: Phaser.AUTO,

width: window.innerWidth,
height: window.innerHeight,

physics:{
default:'arcade',
arcade:{
gravity:{y:900},
debug:false
}
},

scene:{
preload:preload,
create:create,
update:update
}

}

const game = new Phaser.Game(config)

let player
let platforms
let coins
let enemies
let score = 0
let scoreText

let moveLeft=false
let moveRight=false
let jump=false

function preload(){

this.load.image(
'ground',
'https://labs.phaser.io/assets/sprites/platform.png'
)

this.load.image(
'player',
'https://labs.phaser.io/assets/sprites/phaser-dude.png'
)

this.load.image(
'coin',
'https://labs.phaser.io/assets/sprites/gold_1.png'
)

this.load.image(
'enemy',
'https://labs.phaser.io/assets/sprites/robot.png'
)

this.load.image(
'background',
'https://labs.phaser.io/assets/skies/space3.png'
)

}

function create(){

const worldWidth = 8000

this.physics.world.setBounds(0,0,worldWidth,window.innerHeight)

this.cameras.main.setBounds(0,0,worldWidth,window.innerHeight)

const bg = this.add.tileSprite(
0,
0,
worldWidth,
window.innerHeight,
'background'
)

bg.setOrigin(0,0)
bg.setScrollFactor(0.3)

platforms = this.physics.add.staticGroup()

for(let i=0;i<40;i++){

platforms.create(
i*200,
window.innerHeight-40,
'ground'
).setScale(2).refreshBody()

}

player = this.physics.add.sprite(200,200,'player')

player.setBounce(0.1)
player.setCollideWorldBounds(true)

this.physics.add.collider(player,platforms)

this.cameras.main.startFollow(player,true,0.08,0.08)

coins = this.physics.add.group()

for(let i=2;i<40;i+=2){

coins.create(
i*200,
window.innerHeight-120,
'coin'
)

}

enemies = this.physics.add.group()

for(let i=5;i<40;i+=6){

let enemy = enemies.create(
i*200,
window.innerHeight-120,
'enemy'
)

enemy.setVelocityX(100)
enemy.setBounce(1)
enemy.setCollideWorldBounds(true)

}

this.physics.add.collider(enemies,platforms)

this.physics.add.overlap(player,coins,collectCoin,null,this)

this.physics.add.collider(player,enemies,hitEnemy,null,this)

scoreText = this.add.text(20,20,"Score:0",{
font:"30px Arial",
fill:"#ffffff"
})

scoreText.setScrollFactor(0)

document.getElementById("left").ontouchstart=()=>moveLeft=true
document.getElementById("left").ontouchend=()=>moveLeft=false

document.getElementById("right").ontouchstart=()=>moveRight=true
document.getElementById("right").ontouchend=()=>moveRight=false

document.getElementById("jump").ontouchstart=()=>jump=true
document.getElementById("jump").ontouchend=()=>jump=false

}

function update(){

if(moveLeft){
player.setVelocityX(-260)
}
else if(moveRight){
player.setVelocityX(260)
}
else{
player.setVelocityX(0)
}

if(jump && player.body.touching.down){
player.setVelocityY(-550)
}

}

function collectCoin(player,coin){

coin.disableBody(true,true)

score += 10

scoreText.setText("Score:"+score)

}

function hitEnemy(){

player.setTint(0xff0000)

player.setVelocity(0,0)

}
