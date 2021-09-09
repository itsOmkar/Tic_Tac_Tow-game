// html elements

const statusDiv = document.querySelector('.status');
const resetdiv = document.querySelector('.reset'); 
const cellDivs = document.querySelectorAll('.game-cell');

// game constants 

const xSymbol = 'x';
const oSymbol = '○';

// game variables
let gameisLive = true;
let xIsNext = true;
let winner = null;

// functions 

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameisLive = false;
    winner = letter;

        if(winner === 'x'){
        statusDiv.innerHTML = `${letterToSymbol(winner)} has won!!`;
        }else{
            statusDiv.innerHTML = `<span>
            ${letterToSymbol(winner)} has won!! 
            </span>`;
        }

};


const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];

    // is theres a winner ?
    if(topLeft && topLeft === topMiddle && topLeft === topRight){
        // console.log(topLeft);
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');

    }else if(middleLeft && middleLeft === middleMiddle && middleLeft ===middleRight){
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');

    }else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');


    }else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft ){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');


    } else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');


    }else if(topRight && topRight === middleRight && topRight === bottomRight){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');


    }else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight ){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');


    }else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');

    }
    else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle & bottomRight){
        gameisLive = false;
        statusDiv.innerHTML = `Game is Tied!..`;

    }else{
        xIsNext= !xIsNext;
        if(xIsNext){
            statusDiv.innerHTML = `${xSymbol} is next`;
        }else{
            statusDiv.innerHTML = `<span>${oSymbol} is next`;
        }

    }
    


    
        
    

};

// event listeners
const handleReset = () =>{
    xIsNext = true;
    gameisLive = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    winner = null;
    for(const x of cellDivs){
        x.classList.remove('x');
        x.classList.remove('o');
        x.classList.remove('won');
    }
    
};

const handleCellClick = (e) => {
    
    const classList = e.target.classList;
    const location = e.target.classList[1];
    if(!gameisLive || classList[2] === 'x' || classList[2] === 'o'){
        return;
    }
    else{
        if(xIsNext){
        e.target.classList.add('x');
        checkGameStatus();
        }
        
    else{
        e.target.classList.add('o');
        checkGameStatus();

        }
    }

    
    
    
 };

resetdiv.addEventListener('click',handleReset);


for(const celldiv of cellDivs){
    celldiv.addEventListener('click',handleCellClick);
}
