// Variables are defined here
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('../music/food.mp3')
const gameOverSound = new Audio('../music/gameover.mp3')
const moveSound = new Audio('../music/move.mp3')
const music = new Audio('../music/music.mp3')
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }], food = { x: 10, y: 8 }
let score = 0;

// Game functions
function main(ctime) {
    // console.log(ctime)
    window.requestAnimationFrame(main)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed)
        return
    lastPaintTime = ctime
    music.play()
    gameEngine()
}

function gameEngine() {
    // Part - 1 : Updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play()
        music.pause()
        inputDir = { x: 0, y: 0 }
        alert('Game Over!!!, Press any key to play again')
        snakeArr = [{ x: 13, y: 15 }]
        music.play()
        score = 0
    }
    // If snake has eaten the food then increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        let scoreBox = document.getElementById('scoreBox')
        score += 1;
        scoreBox.innerHTML = "Score: " + score
        if(score>highScoreValue){
            highScoreValue = score
            localStorage.setItem('highScore',JSON.stringify(highScoreValue))
            let highScore = localStorage.getItem('highScore');
            highScoreBox.innerHTML = "High Score : "+highScore
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 1;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    function isCollide(sArr) {
        // If the snake bumps into itself
        for (let i = 1; i < sArr.length; i++) {
            if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y)
                return true;
        }
        // If the snake bumps into the wall
        if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0)
            return true

    }

    // Part - 2 : Display the snake and food

    // Display the snake
    let board = document.getElementById('board')
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0)
            snakeElement.classList.add('head')
        else
            snakeElement.classList.add('snake')
        board.appendChild(snakeElement)
    })



    // Display the food
    let foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}



// Main logic from here
let highScore = localStorage.getItem('highScore');
if(highScore === null){
    highScoreValue = 0
    localStorage.setItem('highScore',JSON.stringify(highScoreValue))
}else{
    let highScoreBox = document.getElementById('highScoreBox')
    highScoreValue = JSON.parse(highScore)
    highScoreBox.innerHTML = "High Score : "+highScore
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 }
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp')
            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.play()
            break;
        case 'ArrowDown':
            console.log('ArrowDown')
            inputDir.x = 0;
            inputDir.y = 1;
            moveSound.play()
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft')
            inputDir.x = -1;
            inputDir.y = 0;
            moveSound.play()
            break;
        case 'ArrowRight':
            console.log('ArrowRight')
            inputDir.x = 1;
            inputDir.y = 0;
            moveSound.play()
            break;
        default:
            break
    }
})