const KEY = key;
weatherPrompt();

function weatherPrompt()
{
	let weather = document.getElementById("weather");
	let zip = localStorage.getItem('zip');
	nameCheck() ? weather.classList.add('hide') : null;
	zip === null ? weather.textContent = 'It seems some settings are missing. Click the cogwheel on your top right to setup.' : getWeather(KEY);
}


function getWeather(key) 
{
	let zip = localStorage.getItem('zip');
	let tempEle = document.getElementById("temp");
	if(!nameCheck())
	{
		tempEle.classList.remove('hide');
	}
	
	fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${key}`)
	.then(response => response.json())
	.then(response =>{
		console.log(response);
		const temp = document.createTextNode(response.main.temp.toFixed(0));
		let weather = document.getElementById("weather");
		tempEle.prepend(temp);
		weather.textContent = response.weather[0].main;
	}).catch(err => {
		tempEle.classList.add('hide');
		weather.textContent = 'Something went wrong. Make sure you have set a valid zip code.'
	});
}

function nameCheck() {
	let name = localStorage.getItem('name');
	return name === null;
}