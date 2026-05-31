let canvas = document.querySelector('canvas');
let c= canvas.getContext('2d')
let menu = document.querySelector('#menuBoard')
let buttonImg = document.querySelector('#button')
let bgm = document.querySelector('#bgm')
let musicOn = document.querySelector('#musicOn')
let musicOff = document.querySelector('#musicOff')
let git = document.querySelector('#git')

canvas.height = innerHeight-1;
canvas.width = innerWidth;

class menuboard{
    constructor(position){
        this.position = position;
        this.width = 800;
        this.height = 600;
    }
    draw(){
        c.drawImage(menu,this.position.x,this.position.y,this.width,this.height)
    }
}
class button{
    constructor(position,height,width){
        this.position = position;
        this.width = width;
        this.height = height;
    }
    draw(){
        c.drawImage(buttonImg,this.position.x,this.position.y,this.width,this.height)
    }
}

class MusicButton{
    constructor(position){
        this.position = position;
        this.width = 120;
        this.height = 90;
        this.state = true;
    }

    draw(){
        if(this.state){
            c.drawImage(musicOn,this.position.x,this.position.y,this.width,this.height)
        }
        else{
            c.drawImage(musicOff,this.position.x,this.position.y,this.width,this.height)
        }
    }

    update(){
        this.draw();
    }
}

const menu1 = new menuboard({x:canvas.width/2-400,y:canvas.height/2-300})
menu1.draw();

const buttons = {
    start : new button({x:canvas.width/2-200,y:canvas.height/2-150},90,400),
    quit : new button({x:canvas.width/2-200,y:canvas.height/2-20},90,400),
    git : new button({x:canvas.width/2+50,y:canvas.height/2+90},90,120)
}
buttons.start.draw();
buttons.quit.draw();
buttons.git.draw();
c.drawImage(git,buttons.git.position.x+13,buttons.git.position.y,100,90)

const musicButton = new MusicButton({x:canvas.width/2-150,y:canvas.height/2+90});
musicButton.draw();
musicButton.onClick = function(){
    this.state = !this.state;
    this.update();
    if(this.state){
        document.querySelector('#bgm').play();
    }
    else{
        document.querySelector('#bgm').pause();
    }
}
canvas.addEventListener('click',function(event){
    const x = event.clientX;
    const y = event.clientY;

    if(x >= buttons.start.position.x && x <= buttons.start.position.x + buttons.start.width && y >= buttons.start.position.y && y <= buttons.start.position.y + buttons.start.height){
        window.location.href = "level1.html";
    }
    if(x >= musicButton.position.x && x <= musicButton.position.x + musicButton.width && y >= musicButton.position.y && y <= musicButton.position.y + musicButton.height){
        musicButton.onClick();
    }
    if(x >= buttons.git.position.x && x<= buttons.git.position.x + buttons.git.width && y>= buttons.git.position.y && y <= buttons.git.position.y + buttons.git.height){
        window.open("https://github.com/ShwetaShaw76/Brawl-Out","_blank");
    }
})
