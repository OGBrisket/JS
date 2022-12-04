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
        this.buttonIDs = ["firstCard","secondCard","thirdCard","fourthCard","fifthCard"];
        this.submitButton = document.querySelector("#submitButton");
        this.cardsSubmitted = false;

        this.createNewGameButtons();
        this.setButtonsToCards();
        this.listenForCardClicks();
    };

    // We'll regenerate buttons in case multiple games are called. This will remove event listeners
    createNewGameButtons() {
        const buttonIDs = ["firstCard","secondCard","thirdCard","fourthCard","fifthCard"];

        for (let i=0; i<5; i++) {
            const newButton = document.createElement("button");
            const buttonElementParent = document.querySelector("#buttonParent");

            newButton.className = "unselectedCard";
            newButton.id = this.buttonIDs[i];

            buttonElementParent.replaceChild(newButton, this.buttons[i]);
            this.buttons[i] = newButton;
        }

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
        if (evt.target.className === "unselectedCard") {
            evt.target.className = "selectedCard";           
        } else {
            evt.target.className = "unselectedCard";
        }

    }

    // Add onClick event listeners
    // Futture, need to remove event listeners for multiple games, event listener not removed
    listenForCardClicks() {
        for (const button of buttons) {
            button.addEventListener("click", this.onClickButtonChange);
        };

        this.submitButton.addEventListener("click", this.onSubmitButtonClick)
    }

    onSubmitButtonClick(evt) {
        const selectedCards = document.querySelectorAll(".selectedCard");

        //Event listeners don't have access to the parent object, so I need to manually set it
        const self = newGame;

        for (const cardNode of selectedCards) {
            console.log(`${cardNode.id}`);
            console.log(`test`);

            const cardIndex = self.buttonIDs.indexOf(`${cardNode.id}`);
            console.log(`${cardIndex}`)
        }
        
        console.log(`${selectedCards}`);



        const submitLabel = document.createElement("label");
        submitLabel.textContent = "Great job!";
        evt.target.after(submitLabel);
        this.cardsSubmitted = true;
    }
}


let newGame = new deucesWildGame(buttons);
console.log(`${newGame.hand}`);