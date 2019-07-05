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
	temp.classList.remove('hide');

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
	let greet = document.getElementById('greet-text');
	let date = document.getElementById('date');
	let temp = document.getElementById('temp');
	let link = document.getElementById('quick-links-container');
	let notepad = document.getElementById('notepad');

	let transp = localStorage.getItem('toggle-transp');
	
	//invert accordingly (change text color depending on if transparent notepad bg)
	if(invert !== null && invert === 'true')
	{
		if(transp === 'true')
		{
			notepad.classList.add('black');
		}
		else
		{
			notepad.classList.add('white');
		}
		greet.classList.add('black');
		greet.classList.add('white-outline');
		date.classList.add('black')
		date.classList.add('white-outline');
		temp.classList.add('black')
		temp.classList.add('white-outline');
		link.classList.add('black')
		link.classList.add('white-outline');

		let ele = document.getElementsByTagName('img');
		for(let i = 0; i < ele.length; i++)
		{
			//weather icons are from openweathermap api
			if(ele[i].id !== 'search-icon')
			{
				if(ele[i].id !== 'weather')
				{
					ele[i].classList.remove('invert');
				}
				else
				{
					ele[i].classList.add('invert');
				}
			}
		}
	}
	else
	{
		if(transp === 'true')
		{
			notepad.classList.add('white');
		}
		else
		{
			notepad.classList.add('black');

		}
		greet.classList.add('white');
		greet.classList.add('black-outline');
		date.classList.add('white')
		date.classList.add('black-outline');
		temp.classList.add('white')
		temp.classList.add('black-outline');
		link.classList.add('white')
		link.classList.add('black-outline');
		
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