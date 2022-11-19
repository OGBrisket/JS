header = document.querySelector("h1")

header.textContent = `test`
console.log("test")

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.drawn = false;
    }
}

deck = {
    cards: [],
    suits: ["Spades", "Hearts", "Clubs", "Diamonds"],
    values: [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"],

    createDeck: function() {
        for (suit of this.suits) {
            for (value of this.values) {
                this.cards.push(new Card(value, suit));
            }
        }
    },

    drawCard: function() {
        undrawnCards = [...cards].filter(potentialCard => {
            return potentialCard.drawn = false;
        }
        )
    }
}

deck.createDeck();

for (eachCard of deck.cards) {
    console.log(eachCard.value + " " + eachCard.suit)
}
