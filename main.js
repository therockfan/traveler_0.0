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

}

function create(){

const worldWidth = 4000

this.physics.world.setBounds(0,0,worldWidth,window.innerHeight)

this.cameras.main.setBounds(0,0,worldWidth,window.innerHeight)

platforms = this.physics.add.staticGroup()

for(let i=0;i<20;i++){

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
