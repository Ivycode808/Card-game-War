//need variables to represent the card value and suit; should be constant if anything
const SUIT = ["♣", "♦", "♥", "♠"]
const VALUE = ["A","2", "3", "4", "5", "6", "7", "8","9", "10", "J", "Q", "K"]




//we need an Constructor to handle the decks; helps to give flexible code and ecapculate possible other decks
//think one size fits all machine
export default class Deck {
    constructor (cards = newDeckCombo()){
        this.cards = cards
    }
get numOfCards (){
    return this.cards.length
}
pop (){
    return this.cards.shift()

}
push (card){
    this.cards.push(card)
}
// we need have some shuffle and it needs to be random 
    shuffle(){
        for (let i = this.numOfCards -1; i > 0 ; i--){
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
} 
// class for each of cards; need the value and suits of cards

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
    get color(){
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
    }
     getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suit
        cardDiv.classList.add('card', this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}
//need a function to combine the suits and value to create a new deck
//loop through the suits and value to create an array
function newDeckCombo(){
return SUIT.flatMap(suit => {
    return VALUE.map(value => {
        return new Card(value, suit)
    })
})
}