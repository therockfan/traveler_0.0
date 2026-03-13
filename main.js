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
'coin',
'https://labs.phaser.io/assets/sprites/gold_1.png'
)

this.load.image(
'enemy',
'https://labs.phaser.io/assets/sprites/robot.png'
)

this.load.image(
'bg1',
'https://labs.phaser.io/assets/skies/sky4.png'
)

this.load.image(
'bg2',
'https://labs.phaser.io/assets/skies/space3.png'
)

}

function create(){

const worldWidth = 12000

this.physics.world.setBounds(0,0,worldWidth,window.innerHeight)

this.cameras.main.setBounds(0,0,worldWidth,window.innerHeight)

const bg1 = this.add.tileSprite(
0,
0,
worldWidth,
window.innerHeight,
'bg1'
)

bg1.setOrigin(0,0)
bg1.setScrollFactor(0.2)

const bg2 = this.add.tileSprite(
0,
0,
worldWidth,
window.innerHeight,
'bg2'
)

bg2.setOrigin(0,0)
bg2.setScrollFactor(0.5)

platforms = this.physics.add.staticGroup()

const groundY = window.innerHeight - 120

for(let i=0;i<60;i++){

let ground = this.add.rectangle(
i*200,
groundY,
200,
40,
0x2ecc71
)

this.physics.add.existing(ground,true)

platforms.add(ground)

}

player = this.add.rectangle(
200,
groundY-80,
28,
40,
0xffffff
)

this.physics.add.existing(player)

player.body.setBounce(0.1)
player.body.setCollideWorldBounds(true)

this.physics.add.collider(player,platforms)

this.cameras.main.startFollow(player,true,1,1)

this.cameras.main.setDeadzone(50,50)

coins = this.physics.add.group()

for(let i=3;i<60;i+=3){

coins.create(
i*200,
groundY-150,
'coin'
).setScale(0.7)

}

enemies = this.physics.add.group()

for(let i=8;i<60;i+=8){

let enemy = enemies.create(
i*200,
groundY-60,
'enemy'
)

enemy.setVelocityX(120)
enemy.setBounce(1)
enemy.setCollideWorldBounds(true)

}

this.physics.add.collider(enemies,platforms)

this.physics.add.overlap(player,coins,collectCoin,null,this)

this.physics.add.collider(player,enemies,hitEnemy,null,this)

scoreText = this.add.text(20,20,"Score:0",{
font:"28px Arial",
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
player.body.setVelocityX(-240)
}
else if(moveRight){
player.body.setVelocityX(240)
}
else{
player.body.setVelocityX(0)
}

if(jump && player.body.touching.down){
player.body.setVelocityY(-520)
}

}

function collectCoin(player,coin){

coin.disableBody(true,true)

score += 10

scoreText.setText("Score:"+score)

}

function hitEnemy(){

player.setFillStyle(0xff0000)

player.body.setVelocity(0,0)

}
