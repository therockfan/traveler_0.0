const config = {
type: Phaser.AUTO,
width: 800,
height: 400,

physics:{
default:'arcade',
arcade:{
gravity:{y:500},
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

platforms = this.physics.add.staticGroup()

platforms
.create(400,380,'ground')
.setScale(2)
.refreshBody()

player = this.physics.add.sprite(100,200,'player')

player.setBounce(0.2)
player.setCollideWorldBounds(true)

this.physics.add.collider(player,platforms)

document.getElementById("left").ontouchstart=()=>moveLeft=true
document.getElementById("left").ontouchend=()=>moveLeft=false

document.getElementById("right").ontouchstart=()=>moveRight=true
document.getElementById("right").ontouchend=()=>moveRight=false

document.getElementById("jump").ontouchstart=()=>jump=true
document.getElementById("jump").ontouchend=()=>jump=false

}

function update(){

if(moveLeft){
player.setVelocityX(-200)
}
else if(moveRight){
player.setVelocityX(200)
}
else{
player.setVelocityX(0)
}

if(jump && player.body.touching.down){
player.setVelocityY(-400)
}

}
