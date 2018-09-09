namePrompt();
invert();
loadBackground();

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

//invert page text and images based on settings
function invert() {
	let invert = localStorage.getItem('toggle-invert');
	if(invert !== null && invert === 'true')
	{
		let ele = document.getElementsByTagName('img');
		let body = document.getElementsByTagName('body');
		body[0].classList.add('white');
		for(let i = 0; i < ele.length; i++)
		{
			//weather icons are from openweathermap api, easier to see the icons depending on page text colors, never invert search icon
			if(ele[i].id !== 'search-icon')
			{
				if(ele[i].id !== 'weather')
				{
					ele[i].classList.add('invert');
				}
				else
				{
					ele[i].classList.remove('invert');
				}
			}
		}
	}
}

//load the saved background url
function loadBackground() {
	if(localStorage.getItem('background') !== null)
	{
		let body = document.getElementsByTagName('body');
		body[0].style.backgroundImage = `url(${localStorage.getItem('background')})`;
	}
}