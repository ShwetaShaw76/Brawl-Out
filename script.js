const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d');
const chr = document.querySelector("#chr")
const bg = document.querySelector("#bg")
const plt1 = document.querySelector("#plt1")
const plts = document.querySelector("#plts")

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
        this.position = position
        this.height = 200;
        this.width = 350;
    }
    draw(){
        c.fillRect(0,0,this.width,this.height)
    }    
}

player = new Character({x:0,y:-30})

const keys={
    right:{
        pressed:false
    },
    left:{
        pressed:false
    },
    up:{
        pressed:false,
        locked:false
    },
    down:{
        pressed:false
    }

}

function animate(){
    window.requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)

    player.update();

    if(keys.right.pressed == true){
        player.speed.x = 5;
    } 
    else if(keys.left.pressed == true){
        player.speed.x = -5
    }else player.speed.x = 0;
    // Inside your animate() function:
if (keys.up.pressed && player.speed.y === 0) { 
    player.speed.y -= 15; 
    keys.up.pressed = false;
}
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
            keys.up.locked = true;
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
            keys.up.locked = false;
            break;
        case 40:
            break;
    }
})