
let can = document.getElementById("can");
let con = can.getContext("2d");

//ブロック１つのサイズ
const BLOCK_SIZE = 30;

//テトロミのサイズ
const TETRO_SIZE = 4;


con.fillStyle ="red";
con.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);

let tetro = [
    [0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0],
];

