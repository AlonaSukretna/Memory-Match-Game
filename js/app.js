/*
 * Create a list that holds all of your cards
 */
 // create cards array that holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//declare variables
const deck = document.getElementById("card-deck");
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");
let closeicon = document.querySelector(".close");
let modal = document.getElementById("popupwindow");
// array for opened cards
var openedCards = [];

//start function will shuffle cards and display each card in the pack on a game board
function start(){
   cards = shuffle(cards);
   for (var i= 0; i < cards.length; i++){
      [].forEach.call(cards, function(item){
         deck.appendChild(item);
      });
      cards[i].classList.remove("show", "open", "match", "disabled");
   }

   // reset moves
     moves = 0;
     counter.innerHTML = moves;
    // reset star rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }

   //reset timer
   sec=0;
   min=0;
   hour=0;
   var timer = document.querySelector(".timer");
   timer.innerHTML = "0 mins 0 secs";
   clearInterval(interval);
}

//shuffle the cards on load: when page is loaded, start the game
document.body.onload = start();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

  // set up the event listener for a card which listens for a click on the card and than runs the displayCard function
for (let i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", displayCard);
}


//function displayCard using .toggle() for display or hide the matched elements
var displayCard = function (){
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}
// add the card to a *list* of "open" cards
function cardOpen() {
  //added condition to avoid situation when you click the same card more than once, it counts that as a move
    if (openedCards.length > 0 && openedCards[0].id === this.id)
    {
      openedCards = [];
      return;
    }
    openedCards.push(this);
    var length = openedCards.length;
    if(length === 2){//2 cards selected
        moveCounter();//function below
        let type1 = openedCards[0].getElementsByTagName("i")[0].classList.toString();
        let type2 = openedCards[1].getElementsByTagName("i")[0].classList.toString();
        if(type1 === type2){ //if the cards do match
            matched();
        } else {//if the cards do not match
            unmatched();
        }
    }
}


//if the cards do match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}


//if the cards do not match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
},1000);//1sec
}

//hide cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add("disabled");
    });
}

//show cards and  lock the cards in the open position
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove("disabled");
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//counts a move on selecting two cards, increment the move counter and display it on the page
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
   //start timer
   if(moves == 1){
           sec = 0;
           min = 0;
           hour = 0;
           startTimer();
       }
   //add star rating depending on moves count
   if (moves > 8 && moves <= 14){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 15){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

//timer
var sec=0, min=0, hour=0;
var timer =  document.querySelector(".timer");
var interval;
function startTimer(){//added to moveCounter to start on a first move and to start function
    interval = setInterval(function(){
        timer.innerHTML = min+"mins "+sec+"secs";
        sec++;
        if(sec == 60){
            min++;
            sec = 0;
        }
        if(min == 60){
            hour++;
            min = 0;
        }
    },1000);
}

//When a user wins the game, a modal appears to congratulate the player and ask if they want to play again.
//It should also tell the user how much time it took to win the game, and what the star rating was.
function congrats(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
    //show congratulations modal
    modal.classList.add("show");
    modal.classList.remove("hidden");
    //declare star rating variable
    var starRating = document.querySelector(".score-panel-stars").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeicon on modal
    closeModal();//function below
    };
}

//close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        modal.classList.add("hidden");
        start();
    });
}
//for player to play Again
function playAgain(){
    modal.classList.remove("show");
    modal.classList.add("hidden");
    start();
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congrats);
};
