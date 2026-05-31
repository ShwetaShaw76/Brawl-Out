let canvas = document.querySelector('canvas');
let c= canvas.getContext('2d')
let menu = document.querySelector('#menuBoard')
let buttonImg = document.querySelector('#button')

canvas.height = innerHeight-1;
canvas.width = innerWidth;

class menuboard{
    constructor(position){
        this.position = position;
        this.width = 800;
        this.height = 500;
    }
    draw(){
        c.drawImage(menu,this.position.x,this.position.y,this.width,this.height)
    }
}
class button{
    constructor(position){
        this.position = position;
        this.width = 400;
        this.height = 100;
    }
    draw(){
        c.drawImage(buttonImg,this.position.x,this.position.y,this.width,this.height)
    }
}

const menu1 = new menuboard({x:canvas.width/2-400,y:canvas.height/2-250})
menu1.draw();

const buttons = {
    start : new button({x:canvas.width/2-200,y:canvas.height/2-100}),
    quit : new button({x:canvas.width/2-200,y:canvas.height/2+50})
}
buttons.start.draw();
buttons.quit.draw();

