"use strict";

const header = document.querySelector("h1");
const buttonFirstCard = document.querySelector("#firstCard");
const buttonSecondCard = document.querySelector("#secondCard");
const buttonThirdCard = document.querySelector("#thirdCard");
const buttonFourthCard = document.querySelector("#fourthCard");
const buttonFifthCard = document.querySelector("#fifthCard");

const buttons = [buttonFirstCard, buttonSecondCard, buttonThirdCard, buttonFourthCard, buttonFifthCard]

// Each card has a value, a suit, and a status of whether it's drawn or not
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.drawn = false;
    };

    toString() {
        return `${this.value} of ${this.suit}`;
    }
}

// Deck objects to hold cards drawn and undrawn
class Deck {
    // Puts in all cards when instantiated
    constructor() {
        this.cards = [];
        this.suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
        for (const suit of this.suits) {
            for (const value of this.values) {
                this.cards.push(new Card(value, suit));
            }
        }
    };

    recreateDeck() { 
        this.cards = [];
        for (let suit of this.suits) {
            for (let value of this.values) {
                this.cards.push(new Card(value, suit));
            }
        }
    };

    //Returns a random undrawn card and marks it as drawn
    drawCard() {
        const undrawnCards = [...this.cards].filter((potentialCard) => {
            return potentialCard.drawn === false
        }
        );

        const drawnCard = undrawnCards[Math.floor(Math.random() * undrawnCards.length)];
        drawnCard.drawn = true;

        return drawnCard;
    }

    toString() {
        return `${this.cards}`
    }
}



// The hand will hold 5 cards, for Deuces Wild
class Hand {
    constructor(drawDeck) {
        this.cards = [];
        this.drawDeck = drawDeck;
        this.deucesDeal();
    };

    clear() {
        this.cards = []
    };

    addCard(card) {
        this.cards.push(card);
    };

    getAllCards() {
        return this.cards;
    };

    deucesDeal() {
        for (let i = 0; i < 5; i++) {
            this.addCard(this.drawDeck.drawCard());
        }
    };

    // Redeals deck
    deucesRedeal() {
        this.clear();
        for (let i = 0; i < 5; i++) {
            this.addCard(this.drawDeck.drawCard());
        }
    };

    toString() {
        return `${this.cards}`;
    }
}

// The deuces wild game will hold a hand and manage other aspects of the web page
class deucesWildGame {
    constructor(buttons) {
        this.deck = new Deck();        
        this.hand = new Hand(this.deck);
        this.buttons = buttons;
        this.setButtonsToCards();
        this.listenForCardClicks();
    };

    // Update buttons to text values of cards
    setButtonsToCards() {
        for (let i = 0; i < 5; i++) {
            this.buttons[i].textContent = `${this.hand.getAllCards()[i]}`;
        }
    }

    // Needed in case I need a restart of the game function
    restartDeucesHand() {
        this.deck.recreateDeck();
        this.hand.deucesDeal();
        this.setButtonsToCards();
    }

    onClickButtonChange(evt) {
        evt.target.className = "selectedCard";
    }

    // Add onClick event listeners
    // Futture, need to remove event listeners for multiple games, event listener not removed
    listenForCardClicks() {
        for (const button of buttons) {
            button.addEventListener("click", this.onClickButtonChange);
        }
    }
}


let newGame = new deucesWildGame(buttons);
console.log(`${newGame.hand}`);


