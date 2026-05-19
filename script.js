const canvas = document.querySelector("canvas")

const c = canvas.getContext('2d')

canvas.height = 700;
canvas.width = 576;

const g=0.4;

class Character{
    constructor(position){
        this.position=position;
        this.speed = 1;
    }

    draw(){
        c.fillStyle='red';
        c.fillRect(this.position.x,this.position.y,50,150)
    }

    update(){
        this.draw();
        this.position.y +=this.speed;

        if(this.position.y+150 >= canvas.height){
            this.speed = 0;
        }
        else{
            this.speed += g;
        }
    }
}

player = new Character({x:0,y:0})

function animate(){
    window.requestAnimationFrame(animate)

    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)

    player.update();
}

animate()