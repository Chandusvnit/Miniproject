// Game constants
let inputDirr = {x : 0 , y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let score  =  0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x : 13 , y :13}
];

food = { x : 9 , y :8};

function collide(sarr){
    if(sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 16 || sarr[0].y <= 0 ){
        return true;
    }

    for (let i = 1; i < sarr.length; i++) {
        if(sarr[i].x ===  sarr[0].x  && sarr[i].y === sarr[0].y){
            return true;
        }
    }
    return false;
}

// Game wale function
function main(ctime) {
    window.requestAnimationFrame(main); 

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}


function gameEngine(){
    //1. updating snake and food
    if(collide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDirr = { x : 0  , y : 0};
        alert("Game over !!  , Press any key to play again...");
        snakeArr = [
            {x : 13 , y :13}
        ];
        musicSound.play();
        score = 0 ;
    }

    // if sanke has eaten food then ...  
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y ){
        foodSound.play();
        snakeArr.unshift({ x : snakeArr[0].x + inputDirr.x , y :snakeArr[0].y + inputDirr.y});
        let a = 2;
        let b = 14;
        food = {x : Math.round(a+(b-a)*Math.random()) , y : Math.round(a+(b-a)*Math.random())};
        score +=1;
        const score1 = document.querySelector('.scorecard');
        score1.innerHTML="Score : "+score;
    }
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    
    snakeArr[0].x += inputDirr.x;
    snakeArr[0].y += inputDirr.y;

    console.log(snakeArr[0].x , snakeArr[0].y);

    //2.1 display snake  
    const board =  document.querySelector('.board');
    board.innerHTML = "";
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index  ===  0 ){
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //2.2 display food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}


// starting ponit 
window.requestAnimationFrame(main);

window.addEventListener('keydown' , e=>{
    inputDirr = { x: 0 , y : 1};
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDirr.x = 0;
            inputDirr.y =-1;
            console.log(inputDirr);
            break;

        case "ArrowDown":
            inputDirr.x = 0;
            inputDirr.y =1;

            break;

        case "ArrowLeft":
            inputDirr.x = -1;
            inputDirr.y = 0 ;

            break;

        case "ArrowRight":
            inputDirr.x = 1;
            inputDirr.y = 0;
            break;
    
        default:
            break;
    }
})

