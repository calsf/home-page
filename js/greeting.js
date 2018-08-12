namePrompt();

//add eventlistener for when user hits enter key to enter name
document.getElementById('name-input').addEventListener("keyup", function(event) {
	if(event.keyCode === 13) 
	{
		enterName();
	}
})

//shows a greeting message based on whether or not a name has been stored
function namePrompt()
{
	let greet = document.getElementById('greet-text');
	nameCheck() ? greet.textContent = "Hello, what is your name?" : showGreeting();
}


//greet message shown when a name has been stored
function showGreeting()
{
	const input = document.getElementById('name-input-div');
	let greet = document.getElementById('greet-text');
	let weather = document.getElementById("weather");
	let temp = document.getElementById("temp");
	let name = localStorage.getItem('name');
	let zip = localStorage.getItem('zip');
	input.classList.add('hide');
	greet.textContent = `Hello ${name}!`;
	weather.classList.remove('hide');
	if(zip !== null)
	{
		temp.classList.remove('hide');
	}
}

//enter and store name into local storage
function enterName()
{
	const input = document.getElementById('name-input').value;
	let name = localStorage.getItem('name');
	localStorage.setItem('name', input);
	name = localStorage.getItem('name');
	namePrompt();
}

//checks if a name is stored in local storage
function nameCheck() {
	let name = localStorage.getItem('name');
	return name === null;
}