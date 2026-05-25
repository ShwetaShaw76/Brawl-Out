const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d');
const chr = document.querySelector("#chr")
const bg = document.querySelector("#bg")
const plt1 = document.querySelector("#plt1")
const plts = document.querySelector("#plth")
const wall = document.querySelector("#wall")
const ladder = document.querySelector("#ladder")

canvas.height = innerHeight-2;
canvas.width = innerWidth-2;

const g=1;

class Character{
    constructor(position){
        this.position=position;
        this.speed = {
            x:0,
            y:1
        }
        this.width=50;
        this.height=100;
    }

    draw(){
        c.drawImage(chr,this.position.x,this.position.y,this.width,this.height)
    }

    update(){
        this.draw();
        this.position.x +=this.speed.x;
        this.position.y +=this.speed.y;

        if(this.position.y+this.height >= canvas.height-15){
            this.speed.y = 0;
            keys.up.locked = false;
        }
        else{
            this.speed.y += g;
        }
    }
}

class platform{
    constructor(position){
        this.position = position;
        this.height = 50;
        this.width = 400;
    }
    draw(){
        c.drawImage(plts,this.position.x,this.position.y,this.width,this.height)
    }    
}

class wallv{
    constructor(position){
        this.position = position;
        this.height = 400;
        this.width = 100;
    }

    draw(){
        c.drawImage(wall,this.position.x,this.position.y,this.width,this.height)
    }
}

class ladderv{
    constructor(position){
        this.position = position;
        this.height = 400;
        this.width = 100;
    }

    draw(){
        c.drawImage(ladder,this.position.x,this.position.y,this.width,this.height)
    }
}

const player = new Character({x:0,y:0})
const platforms = [new platform({x:200,y:300}),new platform({x:600,y:500})]
const walls = [new wallv({x:400,y:350})]
const ladders = [new ladderv({x:1200,y:350})]
const keys={
    right:{
        pressed:false
    },
    left:{
        pressed:false
    },
    up:{
        pressed:false
    },
    down:{
        pressed:false
    }

}

function animate(){
    window.requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)

    player.update();
    platforms.forEach(platform => {
        platform.draw();
    });
    walls.forEach(wall =>{
        wall.draw();
    })
    ladders.forEach(ladder=>{
        ladder.draw();
    })

    if(keys.right.pressed == true){
        player.speed.x = 10;
    } 
    else if(keys.left.pressed == true){
        player.speed.x = -10
    }else player.speed.x = 0;
    if(keys.up.pressed){
        player.speed.y = -10;
    }
    platforms.forEach(platform => {
    if (player.position.x + player.width > platform.position.x &&
  player.position.x < platform.position.x + platform.width &&
  player.position.y + player.height <= platform.position.y &&
  player.position.y + player.height + player.speed.y >= platform.position.y) {
  player.speed.y = 0;
  player.position.y = platform.position.y - player.height;
}})
walls.forEach(wall => {
    if(player.position.x + player.width > wall.position.x &&
        player.position.x < wall.position.x + wall.width &&
        player.position.y + player.height > wall.position.y &&
        player.position.y < wall.position.y + wall.height
    )
    if(player.speed.x > 0){
        player.speed.x = 0;
        player.position.x = wall.position.x - player.width;
    }
})
}


animate()

addEventListener('keydown',({keyCode})=>{
    console.log(keyCode)

    switch(keyCode){
        case 37:
            keys.left.pressed = true;
            break;
        case 39:
            keys.right.pressed = true;
            break;
        case 38:
            keys.up.pressed = true;
            break;
        case 40:
            break;
    }
})

addEventListener('keyup',({keyCode})=>{
    console.log(keyCode)

    switch(keyCode){
        case 37:
            keys.left.pressed = false
            break;
        case 39:
            keys.right.pressed = false
            break;
        case 38:
            keys.up.pressed = false
            break;
        case 40:
            break;
    }
})