//落ちるスピード
let gameSpeed = 300;

//フィールドサイズ
const fieldCol = 10;
const fieldRow = 20;

//ブロック１つのサイズ（ピクセル）
const blockSize = 30;

//スクリーンサイズ
const screenWidth = blockSize * fieldCol;
const screenHeight = blockSize * fieldRow;

//テトロミノのサイズ
const tetroSize = 4;

let can = document.getElementById("can");
let con = can.getContext("2d");


//スクリーンの枠
can.width = screenWidth;
can.height = screenHeight;
can.style.border ="4px solid #696969";



//ドロップの色
const tetroColors = [
    "rgba(0,0,0,0.1)",             //空
    "#6CF",             //水色
    "#F92",             //オレンジ
    "#66F",             //青
    "#C5C",             //紫
    "#FD2",             //黄
    "#F44",             //赤
    "#5B5"                 //綠
];

//テトロミノのパターン
const tetroTypes =[
    [],              //0.空っぽ
    [               //1.I
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],
    [               //2.L
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,0,0],
    ],
    [               //3.J
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0],
    ],
    [               //4.T
        [0,1,0,0],
        [0,1,1,0],
        [0,1,0,0],
        [0,0,0,0],
    ],
    [               //5.O
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0],
    ],
    [               //6.Z
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0],
    ],
    [               //7.S
        [0,0,0,0],
        [0,1,1,0],
        [1,1,0,0],
        [0,0,0,0],
    ],

]

// 画像と効果音
let se1, se2, se3;
se1 = new Audio("se1.mp3");
se2 = new Audio("se2.mp3");
se3 = new Audio("se3.mp3");
se4 = new Audio("se4.mp3");

//テトロミノの出現する初期位置
const startX = fieldCol/2 - tetroSize/2;
const startY = 0;

//テトロミノ本体
let tetro;

//テトロミノの形
let tetro7;

//テトロミノの座標
let tetro_x = startX;
let tetro_y = startY;

//フィールドの中身
let field = [];

//game over
let over = false;

//消したライン数
let lineScore = 0;

// スコア
let score = 0;

//テトロミノのランダム
tetro7 = Math.floor( Math.random()*(tetroTypes.length-1) )+1;
tetro = tetroTypes[ tetro7 ];


//イニシャライズでスタート
init();
starting();
//表示
// drawAll();

// //落ちるスピード
// setInterval( dropTetro, gameSpeed);

//初期化
function init(){

    //フィールドのクリア
    for (let y = 0; y<fieldRow; y++){

        field[y] = [];
        for (let x = 0; x<fieldCol; x++){

            field [y][x] = 0;
        }
    }

    //最初のテトロの為のネクストを入れる
    // tetro_n = Math.floor(Math.random()*(tetroTypes.length-1))+1;

    //テトロをセットして描画開始！
    // setTetro();
    drawAll();
}


// function setTetro(){
    
//     //ネクストを現在のテトロにする
//     tetro7 = tetro_n;
//     tetro = tetroTypes[ tetro7 ];
//     tetro_n = Math.floor(Math.random()*(tetroTypes.length-1))+1;

//     //位置を初期位置にする
//     tetro_x = startX;
//     tetro_y = startY;
// }


//ブロック１つを描画する
function drawBlock(x,y,c){

    let px = x * blockSize;
    let py = y  * blockSize;

    con.fillStyle = tetroColors[c];
    con.fillRect(px,py, blockSize,blockSize);
    con.strokeStyle="black";
    con.lineWidth = 1;
    con.strokeRect(px,py, blockSize,blockSize);
}

//全てを描画する
function drawAll(){

    se1.pause();
    se1.play();
    // con.fillStyle = "black";
    //フィールド部分
    con.clearRect(0,0, screenWidth,screenHeight);

    for (let y = 0; y<fieldRow; y++){

        for (let x = 0; x<fieldCol; x++){

            if(field [y][x] !==0){

               drawBlock(x,y,field[y][x]);
        } }
    }
    
     //着地点を計算
     let plus = 0;
     while (checkMove(0,plus+1))plus++;

    //テトロミノ部分
    for (let y = 0; y<tetroSize; y++){

        for (let x = 0; x<tetroSize; x++){

            if(tetro [y][x] ==1){

                //予測位置
                drawBlock(tetro_x+x, tetro_y+y+plus, 0);
                //上のテトロ
                drawBlock(tetro_x+x, tetro_y+y, tetro7);
                
                //ネクストテトロ
        //         if (tetroTypes[tetro_n][y][x]) {
        //             drawBlock(13+x,4+y, tetro_n);
        // } 
    
            }
        
    }}
    
    drawInfo();
 }

function starting(){
    con.fillStyle = "black";
    con.fillRect(0, 0, screenWidth, screenHeight);
    
    let s = "CLICK SCREEN TO START!";
        con.font = "10px 'Press Start 2P'";
        let w = con.measureText(s).width;
        let x = screenWidth/2 - w/2;
        let y = screenHeight/2 + 5;
        con.lineWidth = 4;
        con.strokeText(s,x,y);
        con.fillStyle = "white";
        con.fillText(s,x,y);

    document.getElementById("can").onclick = function() {
        keyControl();
        drawAll();
        setInterval(dropTetro, gameSpeed);
    }
        
}

function drawInfo(){

    let w;
    con.fillStyle = "white";

    let s = "SCORE:";
        con.font = "12px 'Press Start 2P'";
        con.fillStyle = "white";
        con.fillText(s,5,20);
        s = "" + lineScore;
        w = con.measureText(s).width;
        con.fillText(s,90,20)

    // let n ="NEXT"
    //     con.font = "12px 'Press Start 2P'";
    //     con.fillStyle = "white";
    //     con.fillText(n,200,20);
    
    // let w;
    // con.fillStyle = "white";

    // let s = "NEXT"
    // con.fillText = (s, 410,120);

    // s = "SCORE";
    // con.fillText = (s, 410,300);
    // s = ""+score;
    // w = con.measureText(s).width;
    // con.fillText(s, 560-w,340);

    // s = "LINES";
    // w = con.measureText(s).width;
    // con.fillText(s, 410,400);
    // s = ""+lines;
    // w = con.measureText(s).width;
    // con.fillText(s, 560-w,440);
        

    if (over) {
        se1.pause();
        se4.pause();
        se4.play();
        let s = "GAME OVER";
        con.font = "26px 'Press Start 2P'";
        let w = con.measureText(s).width;
        let x = screenWidth/2 - w/2;
        let y = screenHeight/2 + 5;
        con.lineWidth = 4;
        con.strokeText(s,x,y);
        con.fillStyle = "white";
        con.fillText(s,x,y);

        let s2 = " CLICK SCREEN TO RETRY!"
        con.font = "10px 'Press Start 2P'";
        let y2 = screenHeight/2 + 30;
        con.strokeText(s2,x,y2);
        con.fillStyle = "white";
        con.fillText(s2,x,y2);

        document.getElementById("can").onclick = function() {
            location.reload();
        }}
}

//ブロックの衝突判定
function checkMove( mx, my ,newTetro){

    if (newTetro == undefined) newTetro = tetro;

        for (let y = 0; y<tetroSize; y++){

            for (let x = 0; x<tetroSize; x++){

                if (newTetro[y][x] ==1){
                    let nx = tetro_x + mx + x;
                    let ny = tetro_y + my + y;

                if (ny <0 ||
                    nx <0 ||
                    ny >= fieldRow ||
                    nx >= fieldCol ||
                    field[ny][nx] )
                    return false;
                }

            }}

        return true;
}

//テトロを回転させる
function rotate(){

    let newTetro = [];

    for (let y = 0; y<tetroSize; y++){

        newTetro[y] =[];
        for (let x = 0; x<tetroSize; x++){

            newTetro[y][x] = tetro[tetroSize-x-1][y];

             }}
    return newTetro;
}

//テトロを固定する
function fixTetro(){

    for (let y = 0; y<tetroSize; y++){

        for (let x = 0; x<tetroSize; x++){

            if( tetro[y][x]){
                field[tetro_y+y][tetro_x+x] =tetro7;
            }
        }}
}

//ラインが揃ったら消す
function checkLine(){

    let lineCount = 0;
    for (let y = 0; y<fieldRow; y++){

        let flag = true;

        for (let x = 0; x<fieldCol; x++){

            if(!field[y][x]){

                flag = false;
                break;
            }
         }
        if(flag){

            lineCount++;

            for(let ny = y; ny>0; ny--){

                for(let nx = 0; nx<fieldCol; nx++){
                    field[ny][nx] = field[ny-1][nx];
                }
            }
        }

        }

        if (lineCount) {
            se3.pause();
            se3.play();
            lineScore + lineCount;
            score += 100*(2**(lineCount-1));
            console.log(lineScore);
        }

        if (lineCount) {
            lineScore += (lineCount * 100);
        }
        if(lineCount >= 2) {
            lineScore += (lineCount * 150);
        }

}


//テトロが落ちる処理
function dropTetro(){

    if(over) return;

    if( checkMove(0 , 1)) tetro_y++;
    else{
        fixTetro();
        checkLine();

        tetro7 = Math.floor( Math.random()*(tetroTypes.length-1) )+1;
        tetro = tetroTypes[ tetro7 ];

        tetro_x = startX;
        tetro_y = startY;

        if(!checkMove(0,0)){
            over =true;
        }
    }

    drawAll(); 
}

function keyControl() {
//キーボードが押された時の処理
document.onkeydown = function(e){

    if(over) return;

    //onkeydown keycode 検索
    switch(e.keyCode){

        case 37: //left
            if( checkMove(-1 , 0)) tetro_x--;
            break;
        // case 38: //top
        //     if( checkMove(0 , -1)) tetro_y--;
        //     break;
        case 39: //right
            if( checkMove(1 , 0))  tetro_x++;
            break;
        case 40: //bottom
            if( checkMove(0 , 1)) tetro_y++;
            break;
        case 32: //space
            let newTetro = rotate();
            if( checkMove(0, 0, newTetro)) 
            
            tetro = newTetro;
            break;

    }
    drawAll();
}

}
