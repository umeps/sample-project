let can = document.getElementById("can");

let con = can.getContext("2d");

//フィールドサイズ
const fieldCol = 10;
const fieldRow = 20;


//ブロック１つのサイズ（ピクセル）
const blockSize = 30;

//テトロミノのサイズ
const tetroSize = 4;


//スクリーンサイズ
const screenWidth = blockSize * fieldCol;
const screenHeight = blockSize * fieldRow;

can.width = screenWidth;
can.height = screenHeight;
can.style.border ="4px solid #696969";


//テトロミノの形
let tetro = [ 
    [0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0],
];

//テトロミノの座標
let tetro_x = 0;
let tetro_y = 0;

drawTetro();

//テトロミノ表示する
function drawTetro(){

    con.clearRect(0,0, screenWidth,screenHeight);

    for (let y = 0; y<tetroSize; y++){

        for (let x = 0; x<tetroSize; x++){
        
            if(tetro[y][x] ){

                let px =(tetro_x + x) * blockSize;
                let py =(tetro_y + y)  * blockSize;

                    con.fillStyle = "red";
                    con.fillRect(px,py, blockSize,blockSize);
                    con.strokeStyle="black";
                    con.strokeRect(px,py, blockSize,blockSize);
        } }
    }
}
document.onkeydown = function(e){
    //onkeydown keycode 検索
    switch(e.keyCode){

        case 37: //left
            tetro_x--;
            break;
        case 38: //top
            tetro_y--;
            break;
        case 39: //right
            tetro_x++;
            break;
        case 40: //bottom
            tetro_y++;
            break;
        case 32: //space
            break

    }
    drawTetro();
}
