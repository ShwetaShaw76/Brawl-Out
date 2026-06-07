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
const winImg = document.querySelector("#win")
let walkSound = document.querySelector("#walk_music")
let ladderSound = document.querySelector("#ladder_music")
let bgm = document.querySelector("#bgm")
let victorySound = document.querySelector("#victory_music")
let win = false; 

canvas.height = innerHeight-2;
canvas.width = innerWidth-2;

let g=0.5;

class Flag{
    constructor(position) {
    this.position = position;
    this.height = window.innerHeight * 0.13;
    this.width = window.innerWidth * 0.035;
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
        this.height = window.innerHeight * 0.07;
        this.width = window.innerWidth * 0.25;
    }
    draw(){
        c.drawImage(plts,this.position.x,this.position.y,this.width,this.height)
    }    
}

class wallv{
    constructor(position){
        this.position = position;
        this.height = window.innerHeight * 0.60;
        this.width = window.innerWidth * 0.05; 
    }

    draw(){
        c.drawImage(wall,this.position.x,this.position.y,this.width,this.height)
    }
}

class ladderv{
    constructor(position){
        this.position = position;
        this.height = window.innerHeight * 0.55;
        this.width = window.innerWidth * 0.06;
    }

    draw(){
        c.drawImage(ladder,this.position.x,this.position.y,this.width,this.height)
    }
}

const player = new Character({x: 0, y: window.innerHeight - 150});

const platforms = [
    new platform({ x: window.innerWidth * 0.12,y: window.innerHeight * 0.37}),
    new platform({
        x: window.innerWidth * 0.4,
        y: window.innerHeight * 0.66
    }),
    new platform({
    x: 0,
    y: window.innerHeight * 0.93
    }),
    new platform({
        x: window.innerWidth * 0.57,
        y: window.innerHeight * 0.12
    }),
    new platform({
    x: window.innerWidth * 0.83,
    y: window.innerHeight * 0.93
    })
];

const walls = [
    new wallv({
    x: window.innerWidth * 0.79,
    y: window.innerHeight * 0.42
})
];

const ladders = [
    new ladderv({
        x: window.innerWidth * 0.175,
        y: window.innerHeight * 0.4
    }),
    new ladderv({
        x: window.innerWidth * 0.58,
        y: window.innerHeight * 0.12
    })
];

const flag1 = new Flag({
    x: window.innerWidth * 0.95,
    y: window.innerHeight * 0.8
});

const keys={
    right:{
        pressed:false,
        locked:false
    },
    left:{
        pressed:false,
        locked:false
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
        walkSound.play();
        player.update(walk1);
    } 
    else if(keys.left.pressed == true){
        player.speed.x = -5
        walkSound.play();
        player.update(walkRev);
    }else{
        player.speed.x = 0;
        walkSound.pause();
    }
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
    ){
    if(player.speed.x > 0){
        player.speed.x = 0;
        player.position.x = wall.position.x - player.width;
    }
}
    else if(player.position.x + player.width > wall.position.x + wall.width &&
        player.position.x < wall.position.x + wall.width &&
        player.position.y + player.height > wall.position.y &&
        player.position.y < wall.position.y + wall.height){
    if(player.speed.x < 0){
        player.speed.x = 0;
        player.position.x = wall.position.x + wall.width;
    }
}
    else if(player.position.x + player.width > wall.position.x &&
        player.position.x < wall.position.x + wall.width &&
        player.position.y + player.height <= wall.position.y + 20 &&
        player.position.y + player.height + player.speed.y >= wall.position.y) {
        player.speed.y = 0;
        player.position.y = wall.position.y - player.height;
}
})
    ladders.forEach(ladder => {
    if(player.position.x + player.width > ladder.position.x &&
        player.position.x < ladder.position.x + ladder.width &&
        player.position.y + player.height > ladder.position.y &&
        player.position.y < ladder.position.y + ladder.height
    ){  
        keys.left.locked = true;
        keys.right.locked = true;
        player.speed.y = 0;
        g=0;
        if(keys.up.pressed){
            player.speed.y = -5;
            ladderSound.play();
            player.update(climb);
            player.position.x = ladder.position.x+25;
        }
        if(keys.down.pressed){
            player.speed.y=5;
            player.update(climb);
            player.position.x = ladder.position.x+25;
        }
    }
    else{
        keys.left.locked = false;
        keys.right.locked = false;
        g=0.5;
    }
})
    if(win == false){
    if(player.position.x >= flag1.position.x && player.position.y >= flag1.position.y-flag1.height){
        player.update(winImg);
        victorySound.play();
        bgm.pause();
        window.alert("You win!")
        win = true;
        window.location.reload();
    }
    
    else if(player.position.y >= window.innerHeight*0.83|| player.position.x >= canvas.width 
        || player.position.x + player.width <= 0){ 
    bgm.pause();
    win = true;
    window.alert("You lose!");
    window.location.reload();
    }
    }
}


animate()

addEventListener('keydown',({keyCode})=>{

    switch(keyCode){
        case 37:
            if(!keys.left.locked){
                keys.left.pressed = true;
            }
            break;
        case 39:
            if(!keys.right.locked){
                keys.right.pressed = true;
            }
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
            keys.down.pressed = false;
            break;
    }
})