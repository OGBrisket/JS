header = document.querySelector("h1")
buttonFirstCard = document.querySelector("#firstCard")
buttonSecondCard = document.querySelector("#secondCard")
buttonThirdCard = document.querySelector("#thirdCard")
buttonFourthCard = document.querySelector("#fourthCard")
buttonFifthCard = document.querySelector("#fifthCard")

buttons = [buttonFirstCard, buttonSecondCard, buttonThirdCard, buttonFourthCard, buttonFifthCard]

// Each card has a value, a suit, and a status of whether it's drawn or not
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.drawn = false;
    };

    toString() {
        return `${this.value} ${this.suit}`;
    }
}


// The hand will hold 5 cards, for Deuces Wild
class Hand {
    constructor() {
        this.cards = [];
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
        this.clear();
        for (let i = 0; i < 5; i++) {
            this.addCard(deck.drawCard());
        }
    };

    toString() {
        return `${this.cards}`;
    }
}

// The deuces wild game will hold a hand and manage other aspects of the web page
class deucesWildGame {
    constructor(newHand, buttons) {
        this.hand = newHand;
        this.buttons = buttons;
    };

    // Update buttons to text values of cards
    setButtonsToCards() {
        for (let i = 0; i < 5; i++) {
            this.buttons[i].textContent = `${this.hand.getAllCards()[i]}`;
        }
    }

    startDeucesHand() {
        deck.createDeck();
        this.hand.deucesDeal();
        this.setButtonsToCards();
    }
}


// Establish 52 card random since it will be used frequently
function getRandomCard() {
    return Math.floor(Math.random() * 52)
}

deck = {
    cards: [],
    suits: ["Spades", "Hearts", "Clubs", "Diamonds"],
    values: [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"],

    createDeck: function() { 
        this.cards = [];
        for (suit of this.suits) {
            for (value of this.values) {
                this.cards.push(new Card(value, suit));
            }
        }
    },

    drawCard: function() {
        undrawnCards = [...this.cards].filter((potentialCard) => {
            return potentialCard.drawn === false
        }
        );

        drawnCard = undrawnCards[Math.floor(Math.random() * undrawnCards.length)];
        drawnCard.drawn = true;

        return drawnCard;

        
    }
}



newGame = new deucesWildGame(new Hand(), buttons);
newGame.startDeucesHand();
console.log(`${newGame.hand}`)





//test
for (let i = 0; i < 10; i++) {
    deck.drawCard();
}
