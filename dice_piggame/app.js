/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
- After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var total = 0;
var score_0 = 0;
var score_1 = 0;
var activePlayer = 1;	// switching activePlayer 1, 2 

dice_p = document.querySelector('.dice');
dice_p.style.display = 'none';

document.getElementById("score-0").textContent = '0';
document.getElementById("score-1").textContent = '0';
c_0 = document.getElementById("current-0");
c_0.textContent = '0';
c_1 = document.getElementById("current-1");
c_1.textContent = '0';

restart();


// condition of active player at this moment
function activetoggle(){
	if (activePlayer ==1){
		document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.add('active');
		c_0.textContent = '0';
	} else {
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.player-0-panel').classList.add('active');
		c_1.textContent = '0';
	}
};

// situation when you click the hold button
document.querySelector(".btn-hold").addEventListener('click', 
	function hold(){
		if (activePlayer == 1){
			score_0 += total;
			document.getElementById("score-0").textContent = score_0;
			activetoggle();
			total = 0;
			winner();
		}
		else {
			score_1 += total;
			document.getElementById("score-1").textContent = score_1;
			activetoggle();
			total = 0;
			winner();
		}
		activePlayer == 1 ? activePlayer = 2 : activePlayer = 1;
	}
);

// roll the dice
document.querySelector(".btn-roll").addEventListener('click', function(){
	var dice_n = Math.floor(Math.random()*6)+1;
	dice_p.src = 'dice-' + dice_n +'.png';
	dice_p.style.display = 'block';

	if (dice_n == 1){
		total = 0;
		if (activePlayer == 1) {
			activetoggle();
		}
		else {
			activetoggle();
		}
		activePlayer == 1 ? activePlayer = 2 : activePlayer = 1;
	}
	else {
		total += dice_n;
		if (activePlayer == 1) {
			c_0.textContent = total;
		}
		else {
			c_1.textContent = total;
		}
		hold();		// 왜 이거 동작 잘되는데, 자꾸 TypeError 나는지 모르겠군
	}

});

// now, make end-points for deciding winner (100pts for winning)
function winner(){
	if (score_0 >= 100) {
		document.getElementById("name-0").textContent = "Winner!";
		document.querySelector('.player-0-panel').classList.add('active');
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.btn-roll').style.display = 'none';
		document.querySelector('.btn-hold').style.display = 'none';
		dice_p.style.display = 'none';
	}
	else if (score_1 >= 100) {
		document.getElementById("name-1").textContent = "Winner!";
		document.querySelector('.player-1-panel').classList.add('active');
		document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.btn-roll').style.display = 'none';
		document.querySelector('.btn-hold').style.display = 'none';
		dice_p.style.display = 'none';
	}
};

// activate 'new game' button to reset the game
function restart() {
	document.querySelector('.btn-new').addEventListener('click',
		function(){
			score_0 = 0;
			score_1 = 0;
			document.getElementById("score-0").textContent = score_0;
			document.getElementById("score-1").textContent = score_1;
			document.getElementById("name-0").textContent = "Player 1";
			document.getElementById("name-1").textContent = "Player 2";
			document.querySelector('.btn-roll').style.display = 'block';
			document.querySelector('.btn-hold').style.display = 'block';
			document.querySelector('.player-1-panel').classList.remove('active'); 	// activetoggle 함수 쓰면 될듯
			document.querySelector('.player-0-panel').classList.add('active');
			dice_p.style.display = 'block';
		}
	)
};

