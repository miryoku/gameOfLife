let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let list = [];
let listTemp = [];
let timer
let year
let numberCellule
let celluleLife = document.getElementById("celluleLife")
let deadCell = document.getElementById("deadCell")
let cellJustDead=document.getElementById("cellJustDead")


startDraw();
boucleDraw();

function Carre(x, y, life, size) {
    this.x = x;
    this.y = y;
    this.life = life;
    this.color = (life ? celluleLife.value : deadCell.value);
    this.age = 0;
    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, size, size);
    }
}

function startDraw(size = 10) {
    var width = canvas.width;
    var height = canvas.height;
    let life;
    list = [];
    listTemp = [];
    year = 0;
    numberCellule = 0;
    for (let i = 0; i < width; i += size) {

        list[i / size] = []
        listTemp[i / size] = []
        for (let j = 0; j < height; j += size) {
            if (Math.floor(Math.random() * 2) == 0) { life = true } else { life = false }
            if (life) { numberCellule++ }
            list[i / size].push(new Carre(i, j, life, size));
            listTemp[i / size].push(new Carre(i, j, life, size));
            list[i / size][j / size].draw();
        }
    }
}

function yearDead(cellule) {
    if (!cellule.life) {
        cellule.age--
        switch (cellule.age) {
            case -1:
                cellule.color = cellJustDead.value
                break;
            case -2:

                cellule.color = deadCell.value
                break;
        }
    }

}

function draw() {
    year++;
    numberCellule = 0;
    for (let i = 0; i < list.length; i++) {

        for (let j = 0; j < list[i].length; j++) {

            let nbLife = NbLife(i, j);

            if (nbLife < 2 || nbLife > 3) {
                listTemp[i][j].life = false;
                yearDead(listTemp[i][j]);
                listTemp[i][j].draw()
            } else if (nbLife === 3) {
                listTemp[i][j].age = 0;
                listTemp[i][j].life = true;
                listTemp[i][j].color = celluleLife.value;
                listTemp[i][j].draw()
            }
            if (listTemp[i][j].life) {
                numberCellule++;
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
    let tab = [];
    tab.push(check(i - 1, list.length, j - 1, list[i].length))
    tab.push(check(i - 1, list.length, j, list[i].length))
    tab.push(check(i - 1, list.length, j + 1, list[i].length))
    tab.push(check(i, list.length, j - 1, list[i].length))
    tab.push(check(i, list.length, j + 1, list[i].length))
    tab.push(check(i + 1, list.length, j - 1, list[i].length))
    tab.push(check(i + 1, list.length, j, list[i].length))
    tab.push(check(i + 1, list.length, j + 1, list[i].length))

    for (let i = 0; i < tab.length && nbLife != 4; i++) {
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


let btn = document.getElementById("btnValidation");

btn.addEventListener("click", (e) => {
    let size = 10;
    let sizePixel = document.getElementById("sizePixel")
    if (sizePixel.value >= 1 && sizePixel.value <= 100) {
        size = parseInt(sizePixel.value)
    }
    let sizeHeight = document.getElementById("height")
    let sizeWidth = document.getElementById("width")
    if (sizeHeight.value >= 100) {
        canvas.height = sizeHeight.value
    }
    if (sizeWidth.value >= 100) {
        canvas.width = sizeWidth.value
    }
    let sizeTimer = document.getElementById("timer")
    let chrono = 100
    if (sizeTimer.value >= 10) {
        chrono = sizeTimer.value
    }
    clearInterval(timer);
    startDraw(size);
    boucleDraw(chrono)
})

let sizePixelId = document.getElementById("sizePixel");
sizePixelId.addEventListener("input", (e) => {
    let sizePixelSpan = document.getElementById("sizePixelSpan")
    sizePixelSpan.innerText = sizePixelId.value
})

let heightId = document.getElementById("height");
heightId.addEventListener("input", (e) => {
    let heightSpan = document.getElementById("heightSpan")
    heightSpan.innerText =Math.trunc((heightId.value/window.innerHeight)*100)+"%"


   

})

let WidthId = document.getElementById("width");
WidthId.addEventListener("input", (e) => {
    let WidthSpan = document.getElementById("WidthSpan")
    WidthSpan.innerText = Math.trunc((WidthId.value/window.innerWidth)*100)+"%"
})

let timerId = document.getElementById("timer");
timerId.addEventListener("input", (e) => {
    let timerSpan = document.getElementById("timerSpan")
    timerSpan.innerText = timerId.value
})

canvas.addEventListener("mousedown", (e) => {
    const nav = document.querySelector('nav');
    let sizePixel = document.getElementById("sizePixel").value;
    list[Math.trunc(e.x / sizePixel)][Math.trunc((e.y - nav.scrollHeight) / sizePixel)].life = true
    list[Math.trunc(e.x / sizePixel)][Math.trunc((e.y - nav.scrollHeight) / sizePixel)].color = celluleLife.value
    list[Math.trunc(e.x / sizePixel)][Math.trunc((e.y - nav.scrollHeight) / sizePixel)].draw()
})

const modal =
    document.querySelector('.modal');
const btnModal =
    document.querySelector('#btn')
const close =
    document.querySelector('.modal-close')

btnModal.addEventListener('click',
    function () {
        modal.style.display = 'block'
    })

close.addEventListener('click',
    function () {
        modal.style.display = 'none'
    })

window.addEventListener('click',
    function (event) {
        if (event.target.className ===
            'modal-background') {
            modal.style.display = 'none'
        }
    })

const GenerationBool = document.getElementById("generationBool");
GenerationBool.addEventListener("click", (e) => {
    if (GenerationBool.innerText == "Stop") {
        GenerationBool.innerText = "Play"
        clearInterval(timer);
    } else if (GenerationBool.innerText == "Play") {
        let sizeTimer = document.getElementById("timer")
        let chrono = 100
        if (sizeTimer.value >= 10) {
            chrono = sizeTimer.value
        }
        GenerationBool.innerText = "Stop"
        boucleDraw(chrono)
    }

})


const btnchangeOption=document.getElementById("btn");
btnchangeOption.addEventListener("click",()=>{
    let sizeHeight = document.getElementById("height")
    let sizeWidth = document.getElementById("width")
    sizeHeight.max=window.innerHeight
    sizeWidth.max=window.innerWidth
})


function boucleDraw(chrono=100){
    timer = setInterval(function () {
        draw();
        let yearBalise = document.getElementById('year');
        yearBalise.innerText = year;
        let number = document.getElementById('numberCellule');
        number.innerText = numberCellule
        let title = document.querySelector('title');
        title.innerText= "Cell :"+numberCellule+" Gen :"+year
    }, chrono)
}

