const albums = document.getElementsByClassName('album');
const albumArr = Array.from(albums); 
const scoreBoard = document.getElementById('score-board');
const turnCounter = document.getElementById('turn-counter');
const playAgain = document.getElementById('play-again');
const images = ['https://www.dropbox.com/s/kxy5i8jg4v259ja/blondeonblonde.jpeg?raw=1', 'https://www.dropbox.com/s/kxy5i8jg4v259ja/blondeonblonde.jpeg?raw=1', "https://www.dropbox.com/s/72sedmjvsj7l9e4/elephant.jpg?raw=1", "https://www.dropbox.com/s/72sedmjvsj7l9e4/elephant.jpg?raw=1", "https://www.dropbox.com/s/4mpf9hrly8beelq/abbeyroad.jpg?raw=1", "https://www.dropbox.com/s/4mpf9hrly8beelq/abbeyroad.jpg?raw=1", "https://www.dropbox.com/s/lc2rqwx5fh46210/londoncalling.jpg?raw=1", "https://www.dropbox.com/s/lc2rqwx5fh46210/londoncalling.jpg?raw=1", "https://www.dropbox.com/s/3h23wwfk4wrres3/thequeenisdead.jpg?raw=1", "https://www.dropbox.com/s/3h23wwfk4wrres3/thequeenisdead.jpg?raw=1", "https://www.dropbox.com/s/wzx7tc32ve7adv4/borntorun.jpg?raw=1", "https://www.dropbox.com/s/wzx7tc32ve7adv4/borntorun.jpg?raw=1", "https://www.dropbox.com/s/s328mf0r2kyhp8e/darkside.jpg?raw=1", "https://www.dropbox.com/s/s328mf0r2kyhp8e/darkside.jpg?raw=1", "https://www.dropbox.com/s/n2ljs87biy3o9tb/definitelymaybe.jpg?raw=1", "https://www.dropbox.com/s/n2ljs87biy3o9tb/definitelymaybe.jpg?raw=1" ];

const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const ten = document.getElementById('ten');
const eleven = document.getElementById('eleven');
const twelve = document.getElementById('twelve');
const thirteen = document.getElementById('thirteen');
const fourteen = document.getElementById('fourteen');
const fifteen = document.getElementById('fifteen');
const sixteen = document.getElementById('sixteen');
let randomizedImages;
let score = 0;
let clicks = 0;
let attempts = 10;

startGame();


// albumArr.forEach(function(album){
//      album.addEventListener('click', myEventListener);
// });

function startGame(){
    albumArr.forEach(function(album){
        album.addEventListener('click', myEventListener);
        album.firstChild.style.display = 'none';
    })

    randomizedImages = imageShuffle(images);
    matchImageToId();
    score = 0;
    clicks = 0;
    let clickOne = '';
    let clickTwo = '';
    let buttonOne = '';
    let buttonTwo = '';
    attempts = 10;
    turnCounter.innerHTML = `<h4>Turn Counter :  ${attempts}</h4>`;
    scoreBoard.innerHTML = `
            <h4>Score : 0${score}</h4>
    `
}

function matchImageToId(){
    one.firstChild.src = randomizedImages[0];
    two.firstChild.src = randomizedImages[1];
    three.firstChild.src = randomizedImages[2];
    four.firstChild.src = randomizedImages[3];
    five.firstChild.src = randomizedImages[4];
    six.firstChild.src = randomizedImages[5];
    seven.firstChild.src = randomizedImages[6];
    eight.firstChild.src = randomizedImages[7];
    nine.firstChild.src = randomizedImages[8];
    ten.firstChild.src = randomizedImages[9];
    eleven.firstChild.src = randomizedImages[10];
    twelve.firstChild.src = randomizedImages[11];
    thirteen.firstChild.src = randomizedImages[12];
    fourteen.firstChild.src = randomizedImages[13];
    fifteen.firstChild.src = randomizedImages[14];
    sixteen.firstChild.src = randomizedImages[15];
}


function imageShuffle(array){
       for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    } return array;
}

function myEventListener(e){
    if (clicks < 1) { 
            clicks += 1;
            this.firstChild.style.display = "block";
            clickOne = this.firstChild;
            console.log(clickOne.parentNode.id);
        } else if (clicks < 2) {
            this.firstChild.style.display = "block";
            clickTwo = this.firstChild;
            clicks += 1;
            console.log(clickTwo);
            if (clicks == 2) {
                setTimeout(checkImages, 500);
            }
        }
}


function checkImages(){
    if (clicks === 2){
        if((clickOne.src === clickTwo.src) && (clickOne.parentNode.id !== clickTwo.parentNode.id)){
            buttonOne = clickOne.parentNode;
            buttonTwo = clickTwo.parentNode;
            buttonOne.removeEventListener('click', myEventListener);
            buttonTwo.removeEventListener('click', myEventListener);
            clicks = 0;
            score += 1;
            updateScore();
            checkTurns();
        } else {
            clickOne.style.display = 'none';
            clickTwo.style.display = 'none';
            clicks = 0;
            attempts -= 1;
            checkTurns();
        }
    }
}

function updateScore(){
    if (score < 8) {
    scoreBoard.innerHTML = `
            <h4>Score : 0${score}</h4>
    `
    } else {
        scoreBoard.innerHTML = `<h4>Well done, you got them all!</h4>`
    }
}

function checkTurns(){
    if (attempts == 0){
        turnCounter.innerHTML = `<h4>GAME OVER!</h4>`;
        scoreBoard.innerHTML = `
            <h4>Final Score : 0${score}</h4>
    `
        albumArr.forEach(function(album){
         album.removeEventListener('click', myEventListener);
        });
    } else {
        turnCounter.innerHTML = `<h4>Turn Counter :  ${attempts}</h4>

        `
    }
}

// restart game with reset button
playAgain.addEventListener('click', startGame);

