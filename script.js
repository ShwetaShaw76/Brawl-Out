const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d');
const chr = document.querySelector("#chr")
const bg = document.querySelector("#bg")
const plt1 = document.querySelector("#plt1")
const plts = document.querySelector("#plth")
const wall = document.querySelector("#wall")
const ladder = document.querySelector("#ladder")
const walk1 = document.querySelector("#walk1")
const walkRev = document.querySelector("#walkRev")
const climb = document.querySelector("#Climb")
const flag = document.querySelector("#flag")
let win = false; 

canvas.height = innerHeight-2;
canvas.width = innerWidth-2;

let g=1;

class Flag{
    constructor(position){
        this.position = position;
        this.height =100;
        this.width = 50;
    }
    draw(){
        c.drawImage(flag,this.position.x,this.position.y,this.width,this.height)
    }
}

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

    draw(image){
        c.drawImage(image,this.position.x,this.position.y,this.width,this.height)
    }

    update(image){
        this.draw(image);
        this.position.x +=this.speed.x;
        this.position.y +=this.speed.y;

        if(this.position.y+this.height >= canvas.height-15){
            this.speed.y = 0;
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

const player = new Character({x:0,y:500})
const platforms = [new platform({x:150,y:260}),new platform({x:600,y:500}),new platform({x:0,y:window.innerHeight-50}),new platform({x:800,y:80}),new platform({x:window.innerWidth-250,y:window.innerHeight-50})]
const walls = [new wallv({x:1200,y:350})]
const ladders = [new ladderv({x:250,y:280}),new ladderv({x:850,y:platforms[2].position.y-580})]
const flag1 = new Flag({x:window.innerWidth-60,y:window.innerHeight-150})

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

    flag1.draw();
    walls.forEach(wall =>{
        wall.draw();
    })
    ladders.forEach(ladder=>{
        ladder.draw();
    })

    platforms.forEach(platform => {
        platform.draw();
    });
    player.update(chr);
    

    if(keys.right.pressed == true){
        player.speed.x = 5;
        player.update(walk1);
    } 
    else if(keys.left.pressed == true){
        player.speed.x = -5
        player.update(walkRev);
    }else player.speed.x = 0;
    platforms.forEach(platform => {
    if (player.position.x + player.width > platform.position.x &&
  player.position.x < platform.position.x + platform.width &&
  player.position.y + player.height <= platform.position.y + 20 &&
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
    else if(player.position.x + player.width > wall.position.x + wall.width &&
        player.position.x < wall.position.x + wall.width &&
        player.position.y + player.height > wall.position.y &&
        player.position.y < wall.position.y + wall.height
    )
    if(player.speed.x < 0){
        player.speed.x = 0;
        player.position.x = wall.position.x + wall.width;
    }
})
    for(let i = 0; i < ladders.length; i++){
    if(player.position.x + player.width > ladders[i].position.x &&
        player.position.x < ladders[i].position.x + ladders[i].width &&
        player.position.y + player.height > ladders[i].position.y &&
        player.position.y < ladders[i].position.y + ladders[i].height
    ){
        if(keys.up.pressed){
            player.speed.y = -5;
            player.update(climb);
            player.position.x = ladders[i].position.x+25;
        }
    }
}
    if(win == false){
    if(player.position.x >= flag1.position.x && player.position.y >= flag1.position.y){
        window.alert("You win!")
        win = true;
        window.location.reload();
    }
    // else if(player.position.y >= canvas.height-100){
    //     window.alert("you lose!!")
    //     win = true;
    //     window.location.reload();
    // }
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
            keys.down.pressed = true;
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