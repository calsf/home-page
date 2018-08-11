namePrompt();
document.getElementById('name-input').addEventListener("keyup", function(event) {
	if(event.keyCode === 13) 
	{
		enterName();
	}
})

function namePrompt()
{
	let greet = document.getElementById('greet-text');
	nameCheck() ? greet.textContent = "Hello, what is your name?" : showGreeting();
}


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

function enterName()
{
	const input = document.getElementById('name-input').value;
	let name = localStorage.getItem('name');
	localStorage.setItem('name', input);
	name = localStorage.getItem('name');
	namePrompt();
}

function nameCheck() {
	let name = localStorage.getItem('name');
	return name === null;
}