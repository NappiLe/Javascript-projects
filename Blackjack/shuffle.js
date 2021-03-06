const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = new Array;
//Create a deck
const getDeck = () => {


	for (let i = 0; i < suits.length; i++) {
		for (let u = 0; u < values.length; u++) {

			const card = {
				Value: values[u],
				Suit: suits[i]
			}
			deck.push(card);
		}
	}
	return deck;
}

//Render the deck
const renderDeck = () => {
	document.getElementById('deck').innerHTML = '';
	for (var i = 0; i < deck.length; i++) {
		var card = document.createElement("div");
		var value = document.createElement("div");
		var suit = document.createElement("div");
		card.className = "card";
		value.className = "value";
		suit.className = "suit " + deck[i].Suit;

		value.innerHTML = deck[i].Value;
		card.appendChild(value);
		card.appendChild(suit);

		document.getElementById("deck").appendChild(card);
	}
}


// Shuffe the deck
function shuffle() {

	for (var i = 0; i < 1000; i++) {
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
	renderDeck();
}


deck = getDeck();
shuffle();
renderDeck();
