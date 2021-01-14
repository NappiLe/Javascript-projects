const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();
let currentPlayer = 0;
let players = new Array();

//Create a deck
const createDeck = () => {
    deck = new Array();
    for (let i = 0; i < suits.length; i++) {
        for (let u = 0; u < values.length; u++) {
            let weight = parseInt(values[u]);
            if (values[u] == "K" || values[u] == "Q" || values[u] == "J") {
                weight = 10;
            } else if (values[u] == "A") {
                weight = 11;
            } else {
                weight = weight;
            }

            let card = {
                Suit: suits[i],
                Value: values[u],
                Weight: weight
            }

            deck.push(card);
        }
    }
    return deck;
}


//Shuffle the deck
const shuffleDeck = () => {
    for (let i = 0; i < 1000; i++) {
        const random1 = Math.floor(Math.random() * deck.length);
        const random2 = Math.floor(Math.random() * deck.length);

        let tmp = deck[random1];
        deck[random1] = deck[random2];
        deck[random2] = tmp;
    }
}

//Create players
const createPlayers = num => {
    players = new Array();
    for (let i = 1; i <= num; i++) {
        const cardOnHand = new Array();
        const player = {
            Name: `Player ${i}`,
            ID: `${i}`,
            Points: 0,
            Hand: cardOnHand
        }
        players.push(player);
    }
}

//Create UI logic
const createPlayersUI = () => {
    document.getElementById("players").innerHTML = "";
    for (let i = 0; i < players.length; i++) {
        let div_player = document.createElement("div");
        let div_playerID = document.createElement("div");
        let div_hand = document.createElement("div");
        let div_points = document.createElement("div");

        div_player.className = "player";
        div_points.className = "points";
        div_player.id = `player_${i}`;
        div_points.id = `point_${i}`;
        div_hand.id = `hand_${i}`;

        div_playerID.innerHTML = `Player ${players[i].ID}`;
        div_player.appendChild(div_playerID);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);

        document.getElementById("players").appendChild(div_player);
        document.getElementById(`hand_${i}`).style.display = "flex";
        document.getElementById(`hand_${i}`).style.justifyContent = "center";
    }
}

//Divide the card to each player
//2 cards for each
const dealHands = () => {
    for (let i = 0; i < 2; i++) {
        for (let u = 0; u < players.length; u++) {
            let card = deck.pop();
            players[u].Hand.push(card);
            renderCard(card, u);
            updatePoints();
        }
    }
    updateDeck();
}

//Render the cards
const renderCard = (card, player) => {
    const hand = document.getElementById(`hand_${player}`);
    hand.appendChild(getCardUI(card));
}

const getCardUI = (card) => {

    const div_card = document.createElement('div');
    const div_suit = document.createElement('div');
    const div_value = document.createElement('div');

    div_card.className = 'card';
    div_value.className = 'value';
    div_value.innerHTML = card.Value;


    div_suit.className = `suit ${card.Suit.toLowerCase()}`;
    div_card.appendChild(div_suit);
    div_card.appendChild(div_value);

    return div_card;
}

//Start the game
const start = () => {
    document.querySelector(".hit").disabled = false;
    document.querySelector(".stand").disabled = false;
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById("status").style.display = "none";
    //deal 2 cards to each player
    currentPlayer = 0;
    createDeck();
    shuffleDeck();
    createPlayers(2);
    createPlayersUI();
    dealHands();

    document.getElementById(`player_${currentPlayer}`).classList.add("active");
}

//Update point
const getPoints = (player) => {
    let points = 0;
    for (let i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

const updatePoints = () => {
    for (let i = 0; i < players.length; i++) {
        getPoints(i);
        document.getElementById(`point_${i}`).innerHTML = `Points: ${players[i].Points}`;
    }
}

//Update deck
const updateDeck = () => {
    document.querySelector(".number").innerHTML = deck.length;
}

//Player withdraw the next cards
const hitMe = () => {
    let card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    check();
}

//Check score
const check = () => {
    if (players[currentPlayer].Points > 21) {
        document.querySelector(".hit").disabled = true;
        document.querySelector(".stand").disabled = true;
        document.getElementById("status").style.display = "inline-block";
        document.getElementById("status").innerHTML = `Player ${players[currentPlayer].ID} has LOST`;
    }
}

//Change other's turn
const stay = () => {
    if (currentPlayer != players.length - 1) {
        document.getElementById(`player_${currentPlayer}`).classList.remove("active");
        currentPlayer = +1;
        document.getElementById(`player_${currentPlayer}`).classList.add("active");
    } else {
        end();
    }
}

const end = () => {
    let winner;
    let score = 0;
    for (let i = 0; i < players.length; i++) {
        if (players[i].Points < 22 && players[i].Points > score) {
            winner = i;
        }
        score = players[i].Points
    }
    document.getElementById("status").innerHTML = "Winner: Player" + players[winner].ID;
    document.getElementById("status").style.display = "inline-block";
}
