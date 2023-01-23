import Deck from './deck.js'

const CARD_VALUE_MAP = {
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10": 10, 
    "J" : 11,
    "Q" : 12,
    "K" : 13,
    "A" : 14
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const playerDeckElement = document.querySelector('.player-deck')
const computerDeckElement = document.querySelector('.computer-deck')
const texter = document.querySelector('.text')

let playerDeck, computerDeck, inRound, stop


document.addEventListener('click',() => {
 if (stop) {
    startGame()
    return
 }
 if (inRound) {
    cleanUpGame()
 } else {
    flipTheCards()
 }
} )

startGame()
function startGame() {
    const deck = new Deck()
deck.shuffle()
//creating a midpoint for the cards
const midpointdeck = Math.ceil(deck.numOfCards / 2)
playerDeck = new Deck(deck.cards.slice(0, midpointdeck))
computerDeck = new Deck(deck.cards.slice(midpointdeck, deck.numOfCards))
inRound = false;
stop = false;
cleanUpGame()

}
function cleanUpGame() {
    inRound = false;
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    texter.innerText = ""

    updateDeck()

}
function flipTheCards(){
    inRound = true;

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeck()
    
    if(winnerTakesAll(playerCard, computerCard)){
        texter.innerText = "You Win Honey!"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (winnerTakesAll(computerCard, playerCard)){
        texter.innerText = "Computer Takes All Wins!"
        computerDeck.push(computerCard)
        computerDeck.push(playerCard)
    }else {
        texter.innerText = "Draw, Nobody gets it!"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }

    if (gameIsOver(playerDeck)){
        texter.innerText = "Game over you lost!!"
        stop = true
    } else if (gameIsOver(computerDeck)){
        texter.innerText = "You Won, thank God!"
        stop = true
    }

}
function updateDeck() {
computerDeckElement.innerText = computerDeck.numOfCards
playerDeckElement.innerText = playerDeck.numOfCards
}
function winnerTakesAll(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}
function gameIsOver(deck){
    return deck.numOfCards === 0
}