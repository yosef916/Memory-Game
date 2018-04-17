
 /* Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

//START:
$('#start').on('click', function() {
  $(this).hide();
	makeShuffle();
	inGame();
	timer();
});

//SHUFFLE CARDS & DRAW LIs:
let stopwatch = document.querySelector('time'), seconds = 0, minutes = 0, t;
let findMatchCards = [ ], diffCards = [ ], cardNum, moves = 0, win = 0;

function makeShuffle() {
	let symbols = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle'];
	const concat = symbols.concat(symbols);
	let shuffleSymbols = shuffle(concat);

	for (let i = 0; i < shuffleSymbols.length; i++) {
		let square = `<li class='card' icon-num='${i}'><i class='fa ${shuffleSymbols[i]}' icon='${shuffleSymbols[i]}'></i></li>`;
		$('.deck').append(square);
	}
}

//ADD CLASS match ONLY ON SIMILAR CARDS:
function similar() {
  if (findMatchCards.length == 2 ) {

  	if (findMatchCards[0] !== findMatchCards[1] ) {
    setTimeout(function () {      
       $('.card.open.show').removeClass('open show');         
    }, 400);
    findMatchCards = []; diffCards = [];
    moves++;
			$('.moves').text(moves);
  	} else {

	    if (diffCards[0] !== diffCards[1]) {
	      $(".card.open.show" ).addClass('match');
	      findMatchCards = [];
	      diffCards = [];
	      moves++;
	      win++;
				$('.moves').text(moves);
	    } else{
	      findMatchCards.pop();
	      diffCards.pop();
    	}
    }
  }
}

//PUSH CARD NAME & INDEX TO THE ARRAYS TO CHECH SIMILARITY:
function inGame() {
  $('.deck').on('click','li',function() {
    let chosen = $(this).children('i').attr('icon');
    cardIndex = $(this).attr('icon-num');
    this.classList.add('open', 'show');
    findMatchCards.push(chosen);
    diffCards.push(cardIndex);
    similar();
    end(); 
    rate();
  });
}

//TIMER:
//https://jsfiddle.net/Daniel_Hug/pvk6p/

function time() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  stopwatch.textContent = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
  (seconds > 9 ? seconds : '0' + seconds);

  timer();
};

function timer() {
  t = setTimeout(time, 1000);
};

//STARS RATE:
let stars = 0, modal, hidden = $('.fa-star');

function rate() {
	if (moves <= 10) {
		stars = 3;
 	} else if (moves >= 10 && moves < 18) {
  	stars = 2;
  	// console.log(hidden[0]);
  	$(hidden[0]).hide();
  } else if (moves > 20) {
  	stars = 1;
  	$(hidden[1]).hide();
  }
} 

//POPUP MODAL:
function end() {
	if ( win === 1 ) {
		modal = $('#myModal');
		modal.show();
		rate();
		allStars = $('#stars').html();
		$('.final-star').html(allStars);
		clearTimeout(t);
		$('#lastTime').text(stopwatch.textContent);
	}
}

//RESTART:
function restart() {
	$('.deck li').remove();
	$('#myModal').hide();
	$('#start').hide();
	hidden.each(function () { $( this ).show() });
	findMatchCards = []; diffCards = [];
	win = 0;
	moves = 0;
	$('.moves').text(moves);
	seconds = 0;
	minutes = 0;
	stopwatch.textContent = '00:00';
	makeShuffle();
	clearTimeout(t);
	timer();
}

$('.restart').on('click', function () {
	restart();
});

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