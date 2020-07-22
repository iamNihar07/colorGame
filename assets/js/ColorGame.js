//initial variable setup
var numOfSquares = 6;
var colors = [];
var pickedColor;

//all DOM selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

//initialize the game
init();

function init()
{
	setUpModeButtons(); //modes: easy and hard
	setUpSquares(); //squares depending on the mode
	reset();
}

function setUpModeButtons()
{
	for(var i=0;i<modeButtons.length;i++)
	{
		modeButtons[i].addEventListener("click", function()
		{	
			modeButtons[0].classList.remove("selectedButton");
			modeButtons[1].classList.remove("selectedButton");
			this.classList.add("selectedButton");
			if(this.textContent==="Easy")
			{
				numOfSquares=3;
			}
			else
			{
				numOfSquares=6;
			}
			reset(); //reset game on click of modes
		});
	}
}

function setUpSquares()
{
	for(var i=0;i<squares.length;i++)
	{	
		//add click listeners for squares
		squares[i].addEventListener("click", function()
		{
			//get color of clicked square
			var clickedColor = this.style.backgroundColor;
			//check if correct
			if(clickedColor === pickedColor)
			{
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor); //change all squares to correct color
				h1.style.backgroundColor = clickedColor; //change header h1 to correct correct
				resetButton.textContent = "Play Again?"
			}
			else
			{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset()
{
	colors = generateRandomColors(numOfSquares); //gets random colors array
	pickedColor = pickRandomColor(); //picks one color to be gussed from the colors array
	colorDisplay.textContent = pickedColor; //displays its RGB for guessing

	for(var i=0;i<squares.length;i++)
	{
		if(colors[i]) //i.e if rgb color exists
		{
			squares[i].style.display="block"; //make the square visible if it was invisible
			squares[i].style.backgroundColor = colors[i]; //apply the new color
		}
		else
		{
			squares[i].style.display="none"; //if color does not exist, do not show that square
		}
	}

	//reset init setup
	h1.style.backgroundColor = "steelblue"
	messageDisplay.textContent="";
	resetButton.textContent="New Colors";
}

resetButton.addEventListener("click", function()
{
	reset();
});

function changeColors(color) //to change all squares to guessed correct color
{
	for(var i=0;i<colors.length;i++)
	{
			squares[i].style.backgroundColor = color;
	}
}

function pickRandomColor() //the correct correct to be guessed
{
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) 
{
	var arr=[];
	for(var i=0;i<num;i++)
	{
		arr[i]="rgb("+randomColor()+", "+randomColor()
		+", "+randomColor()+")";
	}

	return arr;
}

function randomColor()
{
	return Math.floor(Math.random()*256);
}

/*easyBtn.addEventListener("click", function()
{
	easyBtn.classList.add("selectedButton");
	hardBtn.classList.remove("selectedButton");
	numOfSquares = 3;
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickRandomColor();
	colorDisplay.textContent = pickedColor;


	for(var i=0;i<squares.length;i++)
	{
		if(colors[i])
		{
			squares[i].style.backgroundColor = colors[i];
		}
		else
		{
			squares[i].style.display = "none"; 
		}
	}
});

hardBtn.addEventListener("click", function()
{
	easyBtn.classList.remove("selectedButton");
	hardBtn.classList.add("selectedButton");
	numOfSquares = 6;
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickRandomColor();
	colorDisplay.textContent = pickedColor;

	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block"; 
	}
});*/