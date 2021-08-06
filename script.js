var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var list = [];
var listTemp = [];
const size = 5



function Carre(x, y, life, size) {
    this.x = x;
    this.y = y;
    this.life = life;
    this.color = (life ? "blue" : "white");
    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, size, size);
    }
}

function startDraw(size) {
    var width = canvas.width;
    var height = canvas.height;
    let life;


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
    /*list[1][5].life = true
    list[1][5].color = "blue";
    list[1][5].draw()
    list[2][5].life = true
    list[2][5].color = "blue";
    list[2][5].draw()
    list[3][5].life = true
    list[3][5].color = "blue";
    list[3][5].draw()
    list[2][4].life = true
    list[2][4].color = "blue";
    list[2][4].draw()
    list[2][6].life = true
    list[2][6].color = "blue";
    list[2][6].draw()*/
}


function draw() {



    for (let i = 0; i < list.length; i++) {

        for (let j = 0; j < list[i].length; j++) {

            let nbLife = NbLife(i, j);


            if (nbLife === 3) {
                listTemp[i][j].life = true;
                listTemp[i][j].color = "blue";
                listTemp[i][j].draw()

            } else if (nbLife == 2 || nbLife==3) {

            }else{
                listTemp[i][j].life = false;
                listTemp[i][j].color = "white";
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
    let [x, y] = check(i - 1, list.length, j - 1, list[i].length)
    if (list[x][y].life) {
        nbLife++;
    }
    [x, y] = check(i - 1, list.length, j, list[i].length);
    if (list[x][y].life) {
        nbLife++;
    }
    [x, y] = check(i - 1, list.length, j + 1, list[i].length)
    if (list[x][y].life) {
        nbLife++;
    }
    [x, y] = check(i, list.length, j - 1, list[i].length)
    if (list[x][y].life) {
        nbLife++;
    }
    [x, y] = check(i, list.length, j + 1, list[i].length)
    if (list[x][y].life) {
        nbLife++;
    }
    [x, y] = check(i + 1, list.length, j - 1, list[i].length)
    if (list[x][y].life) {
        nbLife++;
    }
    [x, y] = check(i + 1, list.length, j, list[i].length)
    if (list[x][y].life) {
        nbLife++;
    }
    [x, y] = check(i + 1, list.length, j + 1, list[i].length)
    if (list[x][y].life) {
        nbLife++;
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





startDraw(size);


setInterval(function () { draw() }, 100)

