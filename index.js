// Game Constants & Variables
let giveIn = {x: 0, y: 0}; 
const eatMu = new Audio('music/food.mp3');
const overMusic = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 19;
let score = 0;
let end = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(begin) {
    window.requestAnimationFrame(main);
    // console.log(begin)
    if((begin - end)/1000 < 1/speed){
        return;
    }
    end = begin;
    gamePower();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gamePower(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        overMusic.play();
        musicSound.pause();
        giveIn =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        eatMu.play();
        score += 1;
        if(score>userscore){
            userscore = score;
            localStorage.setItem("hismarks", JSON.stringify(userscore));
            hiMARKIT.innerHTML = "hismarks: " + userscore;
        }
        MARKIT.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + giveIn.x, y: snakeArr[0].y + giveIn.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += giveIn.x;
    snakeArr[0].y += giveIn.y;

    // Part 2: Display the snake and Food
    // Display the snake
    note.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        note.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    note.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hismarks = localStorage.getItem("hismarks");
if(hismarks === null){
    userscore = 0;
    localStorage.setItem("hismarks", JSON.stringify(userscore))
}
else{
    userscore = JSON.parse(hismarks);
    hiMARKIT.innerHTML = "hismarks: " + hismarks;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    giveIn = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            giveIn.x = 0;
            giveIn.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            giveIn.x = 0;
            giveIn.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            giveIn.x = -1;
            giveIn.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            giveIn.x = 1;
            giveIn.y = 0;
            break;
        default:
            break;
    }

});