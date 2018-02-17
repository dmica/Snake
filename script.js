$(document).ready(function(){
	//Canvas 
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	//Save the cell width in a variable 
	var cw = 10;
	var d;
	var food;
	var score;
	
	//Create the snake 
	//An array of cells to make up the snake
	var snake_array; 
	
	function init()
	{
		d = "right"; //default direction
		create_snake(); //create a snake
		create_food(); //create snake food
		score = 0; //display the score
		
		//Move the snake using a timer which will trigger the paint function
		//Every 40ms
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 40);
	}
	init();
	
	function create_snake()
	{
		var length = 10; //Length of the snake
		snake_array = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			snake_array.push({x: i, y:i});
		}
	}
	
	//Create the food now
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
		//Create a cell with x/y between 
	}
	
	//Paint the snake  
	function paint()
	{
		//avoid the snake trail and paint the BG on every frame
		//paint the canvas 
		ctx.fillStyle = "pink";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		//The movement code for the snake
		//Pop out the tail cell and place it infront of the head cell
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		//These were the position of the head cell.
		//increment it to get the new head position
		//direction based movement
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
		
		//restart the game if the snake hits the wall
		//code for body collision
		//if the head of the snake bumps into its body, the game will restart
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			//restart game
			init();
			return;
		}
		
		//code to make the snake eat the food
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			//Create new food
			create_food();
		}
		else
		{
			var tail = snake_array.pop(); //pops out the last cell
			tail.x = nx; tail.y = ny;
		}
		//The snake can now eat the food.
		
		snake_array.unshift(tail); //puts back the tail as the first cell
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			//Paint 10px wide cells
			paint_cell(c.x, c.y);
		}
		
		//Paint the food
		paint_cell(food.x, food.y);
		//Paint the score
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, h-5);
	}
	
	//paint cells
	function paint_cell(x, y)
	{
		ctx.fillStyle = "red";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	function check_collision(x, y, array)
	{
		//check if the provided x/y coordinates exist in an array of cells or not
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	//Add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//Add another clause to prevent reverse gear
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
		//The snake is now keyboard controllable
	})
	
	
	
	
	
	
	
})