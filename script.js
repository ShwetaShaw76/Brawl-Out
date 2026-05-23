const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d');
const chr = document.querySelector("#chr")
const bg = document.querySelector("#bg")

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
        this.width=60;
        this.height=120;
    }

    draw(){
        c.drawImage(chr,this.position.x,this.position.y,this.width,this.height)
    }

    update(){
        this.draw();
        this.position.x +=this.speed.x;
        this.position.y +=this.speed.y;

        if(this.position.y+this.height >= canvas.height){
            this.speed.y = 0;
        }
        else{
            this.speed.y += g;
        }
    }
}

player = new Character({x:0,y:-20})

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

    if(keys.right.pressed == true){
        player.speed.x = 10;
    } 
    else if(keys.left.pressed == true){
        player.speed.x = -10
    }else player.speed.x = 0;

    if(keys.up.pressed){
        player.speed.y = -10
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