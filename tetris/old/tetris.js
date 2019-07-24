//落ちるスピード
const dropSpeed = 500;

//フィールドサイズ (ブロックいくつ分か)
const fieldCol = 10;
const fieldRow = 20;

// ブロック一つのサイズ（ピクセル）
const blockSize = 25;

//キャンバスのサイズ
const screenW = blockSize * fieldCol;
const screenH = blockSize * fieldRow;

//テトロミノのサイズ
const tetroSize = 4;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

can.width = screenW + 100;


//スクリーンの枠
canvas.width  = screenW;
canvas.height = screenH;
//canvas.style.border = "1px solid grey";

const tetroColors = [
    "rgb(153,153,153,0.5)",  //0影の色
    "#06c",                  //1青
    "#f96",                  //2オレンジ
    "#0cf",                  //3水色
    "#c69",                  //4紫
    "#fc6",                  //5黄色
    "#f69",                  //6ピンク
    "#6c9"                   //7緑
];

const tetroTypes = [
    [], //0.空っぽ

    [              // 1.I
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [             // 2.L
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [             // 3.J
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [             // 4.T
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    [             // 5.0
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [             // 6.z
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [             // 7.S
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ]

];

// 画像と効果音
// let se1, se2, se3;
// se1 = new Audio("se1.mp3");
// se2 = new Audio("se2.mp3");
// se3 = new Audio("se3.mp3");
// se4 = new Audio("se4.mp3");

// 初期位置
const startX = fieldCol/2 - tetroSize/2;
const startY = 0;

// テトロミノ本体
let tetro;

//　テトロミノの形
let tetroNum;

// テトロミノの座標 動いてるやつ
let gridX = startX;
let gridY = startY;

// フィールド本体
let field = [];

// ゲームオーバーフラグ
let over = false;

//消したライン数
let lineScore = 0;

// スコア
let score = 0;

tetroNum = Math.floor(Math.random()*(tetroTypes.length-1) )+1;
tetro = tetroTypes[tetroNum]; //[]内は何番目のtetroTypesか数字をだす

init();
opening();
//drawAll();

//setInterval(dropTetro, dropSpeed);

// フィールド初期化 ２次元配列でつくり、全てに0を入れる
function init() {
    for (let y=0; y < fieldRow; y++) {
        field[y] = []; //yが進むごとに、この行は配列ですよ、とすると二次元配列になる。
        for (let x=0; x < fieldCol; x++) {
            field[y][x] = 0; //ここで二次元配列として使える！
        }
    }
    // テスト
    //field[5][8] =1;
    //field[19][9] =1;
}

//ブロック一つを描画する
function drawBlock(x,y,c) {
    let posX = x * blockSize; //位置設定
    let posY = y * blockSize; // 固定

    context.fillStyle = tetroColors[c];
    context.fillRect(posX, posY, blockSize, blockSize);
    //context.strokeStyle = "white";
    //context.strokeRect(posX, posY, blockSize, blockSize);
  }

// フィールド表示
function drawAll() {

    se1.pause();
    se1.play();
    context.fillStyle = "black";
    context.fillRect(0, 0, screenW, screenH);

    //drawField
    for (let y=0; y < fieldRow; y++) {
        for (let x=0; x < fieldCol; x++) {
            if (field[y][x] !== 0) {
                drawBlock(x,y,field[y][x]); //すでにあるテトロミノの描写！！
            }
        }
    }

    //着地点を計算
    let plus = 0;
    while (checkMove(0,plus+1))plus++;

    //drawTetro
    for (let y=0; y < tetroSize; y++ ) {
        for (let x=0; x < tetroSize; x++ ) {
            if (tetro[y][x] == 1) {
                //着地点
                drawBlock(gridX+x, gridY+y+plus, 0);
                //本体
                drawBlock(gridX+x, gridY+y, tetroNum); //今動いてるテトロミノの描写！！
            }
            if (tetroTypes[tetroNum][y][x]) {
                drawBlock()
            }
        }
    }
    drawInfo();
}

function opening() {
    context.fillStyle = "black";
    context.fillRect(0, 0, screenW, screenH);
    
    let s = "CLICK SCREEN TO START!";
        context.font = "10px 'Press Start 2P'";
        let w = context.measureText(s).width;
        let x = screenW/2 - w/2;
        let y = screenH/2 + 5;
        context.lineWidth = 4;
        context.strokeText(s,x,y);
        context.fillStyle = "white";
        context.fillText(s,x,y);

    document.getElementById("canvas").onclick = function() {
        keyControl();
        drawAll();
        setInterval(dropTetro, dropSpeed);
    }
        
}

function drawInfo() {
    let w;
    context.fillStyle = "white";

    let s = "SCORE:";
        context.font = "12px 'Press Start 2P'";
        context.fillStyle = "white";
        context.fillText(s,5,20);
        s = "" + lineScore;
        w = context.measureText(s).width;
        context.fillText(s,90,20)

    if (over) {
        se1.pause();
        se4.pause();
        se4.play();
        let s = "GAME OVER";
        context.font = "26px 'Press Start 2P'";
        let w = context.measureText(s).width;
        let x = screenW/2 - w/2;
        let y = screenH/2 + 5;
        context.lineWidth = 4;
        context.strokeText(s,x,y);
        context.fillStyle = "white";
        context.fillText(s,x,y);

        let s2 = " CLICK SCREEN TO RETRY!"
        context.font = "10px 'Press Start 2P'";
        let y2 = screenH/2 + 30;
        context.strokeText(s2,x,y2);
        context.fillStyle = "white";
        context.fillText(s2,x,y2);

        document.getElementById("canvas").onclick = function() {
            location.reload();
        }
    }
}

// ブロックの衝突判定
function checkMove (moveX, moveY, newTetro) {

    if (newTetro == undefined) newTetro = tetro;

    for (let y=0; y < tetroSize; y++) {
        for (let x=0; x < tetroSize; x++) {
            if (newTetro[y][x] == 1) {

                let newX = gridX + moveX + x; //新しい座標
                let newY = gridY + moveY + y;

                if (newY < 0 || newX < 0 || //画面外に出た時
                    newY >= fieldRow || newX >= fieldCol ||
                    field[newY][newX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

//　てトロの回転
function rotate() {
    let newTetro = []; //一時配列として定義

    for (let y=0; y < tetroSize; y++) {
        newTetro[y] = [];
        for (let x=0; x < tetroSize; x++) {
            newTetro[y][x] = tetro[tetroSize - x -1][y]; //ここ分からん
        }
    }
    return newTetro;
}

function fixTetro() {

    for (let y=0; y < tetroSize; y++) {
        for (let x=0; x < tetroSize; x++) {
            if (tetro[y][x]) {
                field[gridY + y][gridX + x] = tetroNum; //フィールドにテトリミノをコピー
            }
        }
    }
}

// ラインが揃ったかチェックして消す
function checkLine() {
    let lineCount = 0;

    for(let y=0; y<fieldRow; y++) {
        let flag = true; //各ラインにflagを持たせ、初めはtrueとしておく

        for(let x=0; x<fieldCol; x++) {
            if ( !field[y][x]) { //もし0が含まれていたら
                flag = false;    // そのflag全体をfalseに変えて、
                break;           //ループを抜ける
            }
        }
        if (flag) {
            lineCount++;

            for(let nY = y; nY>0; nY--) { //yが0に到達するまで−１し続けてそれをnYとする
                for (let nX = 0; nX < fieldCol; nX++) {
                    field[nY][nX] = field[nY-1][nX];
                }
            }
        }
        if (lineCount) {
            se3.pause();
            se3.play();
            lineScore + lineCount;
            score += 100*(2**(lineCount-1));
        }
    }

    if (lineCount) {
        lineScore += (lineCount * 100);
    }
    if(lineCount >= 2) {
        lineScore += (lineCount * 150);
    }

}

function dropTetro() {

    if(over) return;
    
    if(checkMove(0, 1))
        gridY++;
    else {
        fixTetro();
        checkLine();

        tetroNum = Math.floor(Math.random()*(tetroTypes.length-1) )+1;
        tetro = tetroTypes[tetroNum]; //[]内は何番目のtetroTypesか数字をだす

        gridX = startX;
        gridY = startY;

        if ( !checkMove(0,0)) {
            over = true;
        }
    }
    drawAll();
}


//　移動
function keyControl() {

    document.onkeydown = function(e) {

        if (over) return;

        switch(e.keyCode) {
        case 37: // 左
            if (checkMove(-1, 0))
            gridX--;
            break;
        case 38: // 上
            if (checkMove(0, -1))
            gridY--;
            break;
        case 39: // 右
            if (checkMove(1, 0))
            gridX++;
            break;
        case 40: // 下
            while (checkMove(0, 1))
            gridY++;
            se2.pause();
            se2.play();
            break;
        case 32: // スペース
            let newTetro = rotate();
            if (checkMove(0, 0, newTetro)) {
                tetro = newTetro;
            } //今現在の位置（0,0）からみて新しい位置(newTetro)は大丈夫なのか
            break;
        }

        drawAll();

    }
    
}