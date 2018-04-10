
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

function makeShuffle() {
	let symbols = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle'];
	const concat = symbols.concat(symbols);
	let shuffleSymbols = shuffle(concat);
	// console.log(shuffleSymbols);
	for (let i=0; i < shuffleSymbols.length; i++){
		// console.log(i + ' - ' + shuffleSymbols[i]);
		let square = `<li class="card"><i class="fa ${shuffleSymbols[i]}" icon="${shuffleSymbols[i]}"></i></li>`;
		$(".deck").append(square);
	}
}
makeShuffle();

let findMatchCards = []; let moves = 0; let win = 0;
function showCards() {	
	$('#call').on('click', 'li', function() {
		$(this).addClass("open show");
		let value = $(this).children('i').attr("icon");
		findMatchCards.push(value);

		if (findMatchCards.length === 2) {
			moves++;
			$('#shift').html(moves);
			
			if ( findMatchCards[0] === findMatchCards[1] ) {
				$("#call li.open.show").addClass('match');

				win++;
				if (win === 8) {
					console.log('complete');
				}

			} else {
				setTimeout(function wait() {
 					$("#call li").removeClass("open show");
 				}, 500);
			}
			findMatchCards = [];
		}
	});
}
showCards()

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