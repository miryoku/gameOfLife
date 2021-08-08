let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let list = [];
let listTemp = [];
let timer
startDraw();
timer = setInterval(function () { draw() }, 100)
draw() 

function Carre(x, y, life, size) {
    this.x = x;
    this.y = y;
    this.life = life;
    this.color = (life ? "blue" : "white");
    this.age=0;
    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, size, size);
    }
}

function startDraw(size=10) {
    var width = canvas.width;
    var height = canvas.height;
    let life;
    list = [];
    listTemp = [];
    
    for (let i = 0; i < width; i += size) {

        list[i / size] = []
        listTemp[i / size] = []
        for (let j = 0; j < height; j += size) {
            if (Math.floor(Math.random() * 2) == 0) { life = true } else { life = false }
            list[i / size].push(new Carre(i, j, life, size));
            listTemp[i / size].push(new Carre(i, j, life, size));
            list[i / size][j / size].draw();
        }
    }
}

function yearDead(cellule){
    if(!cellule.life){
        cellule.age--
        switch(cellule.age){
            case -1:
                cellule.color="#485EEA"
                break;
            case -2:
                cellule.color="#FFFFFF"
                break;
        }
    }
 
}



function draw() {
    
    for (let i = 0; i < list.length; i++) {
        
        for (let j = 0; j < list[i].length; j++) {
            
            let nbLife = NbLife(i, j);

            if(nbLife<2 ||nbLife>3){
                listTemp[i][j].life = false;
                yearDead(listTemp[i][j]);
                listTemp[i][j].draw()
            }else if(nbLife === 3){
                listTemp[i][j].age=0;
                listTemp[i][j].life = true;
                listTemp[i][j].color = "blue";
                listTemp[i][j].draw()
            }
        }
    }
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            list[i][j].color = listTemp[i][j].color
            list[i][j].life = listTemp[i][j].life

        }
    }

}

function NbLife(i, j) {
    let nbLife = 0;
    let  tab=[];

    tab.push(check(i - 1, list.length, j - 1, list[i].length))
    tab.push( check(i - 1, list.length, j, list[i].length))
    tab.push( check(i - 1, list.length, j + 1, list[i].length))
    tab.push( check(i, list.length, j - 1, list[i].length))
    tab.push( check(i, list.length, j + 1, list[i].length))
    tab.push(check(i + 1, list.length, j - 1, list[i].length))
    tab.push( check(i + 1, list.length, j, list[i].length))
    tab.push( check(i + 1, list.length, j + 1, list[i].length))

   for(let i =0 ;i<tab.length&&nbLife!=4;i++){
        if (list[tab[i][0]][tab[i][1]].life) {
            
            nbLife++;
        }       
    }
    return nbLife;
}




function check(i, iLenght, j, jLenght) {

    if (i == -1) {
        i = iLenght - 1
    } else if (i == iLenght) {
        i = 0
    }
    if (j == -1) {
        j = jLenght - 1
    } else if (j == jLenght) {
        j = 0
    }

    return [i, j]
}


let btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
    let size =10;
    let sizePixel = document.getElementById("sizePixel")
    if (sizePixel.value >= 1 && sizePixel.value <= 100) {
        size = parseInt(sizePixel.value)
    }
    let sizeHeight = document.getElementById("height")
    let sizeWidth = document.getElementById("width")
    if(sizeHeight.value>=100 ){
        canvas.height=sizeHeight.value
    }
    if(sizeWidth.value>=100 ){
        canvas.width=sizeWidth.value
    }
    let sizeTimer = document.getElementById("timer")
    let chrono=100
    if(sizeTimer.value>=10 ){
        chrono= sizeTimer.value
    }
    clearInterval(timer);
    startDraw(size);
    timer= setInterval(function () { draw() }, chrono)
})

let sizePixelId = document.getElementById("sizePixel");
sizePixelId.addEventListener("input",(e)=>{
    let sizePixelSpan= document.getElementById("sizePixelSpan")
    sizePixelSpan.innerText=sizePixelId.value
})

let heightId = document.getElementById("height");
heightId.addEventListener("input",(e)=>{
    let heightSpan= document.getElementById("heightSpan")
    heightSpan.innerText=heightId.value
})

let WidthId = document.getElementById("width");
WidthId.addEventListener("input",(e)=>{
    let WidthSpan= document.getElementById("WidthSpan")
    WidthSpan.innerText=WidthId.value
})

let timerId = document.getElementById("timer");
timerId.addEventListener("input",(e)=>{
    let timerSpan= document.getElementById("timerSpan")
    timerSpan.innerText=timerId.value
})

canvas.addEventListener("mousedown",(e)=>{
    let sizePixel = document.getElementById("sizePixel").value; 
    list[Math.trunc(e.x/sizePixel)][Math.trunc(e.y/sizePixel)].life=true
    list[Math.trunc(e.x/sizePixel)][Math.trunc(e.y/sizePixel)].color="blue"
    list[Math.trunc(e.x/sizePixel)][Math.trunc(e.y/sizePixel)].draw()
})