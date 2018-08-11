const KEY = key;
weatherPrompt();

//checks for a zip code, will display message if no zip code, if there is a zip code, it will get weather information
function weatherPrompt()
{
	let weather = document.getElementById("weather");
	let zip = localStorage.getItem('zip');
	nameCheck() ? weather.classList.add('hide') : null;
	zip === null ? weather.textContent = 'It seems some settings are missing. Click the cogwheel on your top right to setup.' : getWeather(KEY);
}

//gets weather information from openweathermap api
function getWeather(key) 
{
	let zip = localStorage.getItem('zip');
	fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${key}`)
	.then(response => response.json())
	.then(response =>{
		console.log(response);
		const temp = document.createTextNode(response.main.temp.toFixed(0));
		let tempEle = document.getElementById("temp");
		let weather = document.getElementById("weather");
		tempEle.prepend(temp);
		weather.textContent = response.weather[0].main;
		if(!nameCheck())
		{
			tempEle.classList.remove('hide');
		}
	}).catch(err => {
		tempEle.classList.add('hide');
		weather.textContent = 'Something went wrong. Make sure you have set a valid zip code.'
	});
}

//checks for a stored name
function nameCheck() {
	let name = localStorage.getItem('name');
	return name === null;
}