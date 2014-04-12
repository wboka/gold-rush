var bounds;
var coins = 6;
var playerPos;
var isPlaying = false;

$(document).ready(function () {
	setSize();	
	setBounds();
		
	$("#gameCanvas").on("keydown", function (e) {
		setPosition();
		
		switch(e.which) {
			case 37:
				moveLeft();
				break;
			case 38:
				moveUp();
				break;
			case 39:
				moveRight();
				break;
			case 40:
				moveDown();
				break;
			default:
				break;
		}
	});
	
	$("#goLeft").on("click", function () {
		moveLeft();
	});
	
	$("#goUp").on("click", function () {
		moveUp();
	});
	
	$("#goRight").on("click", function () {
		moveRight();
	});
	
	$("#goDown").on("click", function () {
		moveDown();
	});
	
	$("#leftMode").on("click", function () {		
		$("#rightMode, #leftMode").toggleClass("active");
		$(".actionButtons").removeClass("pull-right").addClass("pull-left");
	});
	
	$("#rightMode").on("click", function () {
		$("#rightMode, #leftMode").toggleClass("active");
		$(".actionButtons").removeClass("pull-left").addClass("pull-right");
	});

	$("#newRelaxedGame").on("click", function () {
		isPlaying = true;
		drawCoins(coins);
		$("#gameCanvas").focus();		
		resetPosition();
	});
		
	$("#newTimedGame").on("click", function () {
		$("#newGame").addClass("disabled");
		isPlaying = true;
		drawCoins(coins);
		$("#gameCanvas").focus();		
		resetPosition();
		startTimer(60);
	});
});

$(window).resize(function() {
	$("#gameCanvas").width("100%");
	setSize();
	setBounds();
	resetPosition();
});

function moveLeft() {
	if (isPlaying)
		if (!checkPosLeft())
			$("#playerToken").css({"marginLeft" : "-=30px"});	
}

function moveRight() {
	if (isPlaying)
		if (!checkPosRight())	
			$("#playerToken").css({"marginLeft" : "+=30px"});
}

function moveUp() {
	if (isPlaying)
		if (!checkPosTop())
			$("#playerToken").css({"marginTop" : "-=30px"});
}

function moveDown() {
	if (isPlaying)
		if (!checkPosBottom())
			$("#playerToken").css({"marginTop" : "+=30px"});
}

function resetPosition() {
	playerPos = $("#gameCanvas").position();
	$("#playerToken").offset(playerPos);
}

function setPosition(){
	playerPos = $("#playerToken").offset();
	playerPos.left = parseInt(playerPos.left, 10);
	playerPos.top = parseInt(playerPos.top, 10);
	playerPos.right = playerPos.left + $("#playerToken").width();
	playerPos.bottom = playerPos.top + $("#playerToken").height();
}

function checkPosLeft() {
	leftBound = (playerPos.left == bounds.left);
	return leftBound;
}

function checkPosRight() {
	rightBound = (playerPos.right >= bounds.right);
	return rightBound;
}

function checkPosTop() {
	topBound = (playerPos.top <= bounds.top);
	return topBound;
}

function checkPosBottom() {
	bottomBound = (playerPos.bottom == bounds.bottom);
	return bottomBound;
}

function setBounds() {
	bounds = $("#gameCanvas").position();
	bounds.left = parseInt(bounds.left, 10);
	bounds.top = parseInt(bounds.top, 10);
	bounds.right = bounds.left + $("#gameCanvas").width();
	bounds.bottom = bounds.top + $("#gameCanvas").height();
}

function setSize() {
	oldWidth = $("#gameCanvas").width();
	widthFactor = parseInt(oldWidth/30, 10);
	newWidth = widthFactor * 30;
	$("#gameCanvas").width(newWidth);
}

function startTimer(time) {
	var timer = setInterval(function(){
		$("#gameTimer").text(time--);

		if (time < 0) {
			$("#newGame").removeClass("disabled");
			isPlaying = false;
			clearInterval(timer);		
		}
	}, 1000);	
}

function drawCoins(numOfCoins) {
	removeCoins();
	j = -1;
	html = [];
	w = $("#gameCanvas").width() - 30;
	h = $("#gameCanvas").height() - 30;

	for (var i = 0; i < numOfCoins; i++) {		
		coinPosX = Math.floor(Math.random() * w) + 30;
		coinPosX = coinPosX - (coinPosX % 30);
		
		coinPosY = Math.floor(Math.random() * h) + 30;
		coinPosY = coinPosY - (coinPosY % 30);
		
		html[++j] = "<div class='coin' style='margin-left: ";
		html[++j] = coinPosX + "px; margin-top: " + coinPosY + "px;'>";
		html[++j] = "</div>";
	}

	html = html.join("");
	
	$("#gameCanvas").append(html);
}

function removeCoins() {
	$(".coin").remove();
}