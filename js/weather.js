const KEY = key;
showWeather();
weatherPrompt();

//checks for a zip code, will display message if no zip code, if there is a zip code, it will get weather information
function weatherPrompt()
{
	let weather = document.getElementById("weather");
	let zip = localStorage.getItem('zip');
	nameCheck() ? weather.classList.add('hide') : null;
	
	let temp = document.getElementById('temp');
	nameCheck() ? null : temp.classList.remove('hide');
	zip === null ? temp.textContent = 'No current weather information. Click the cogwheel on your top right to setup.' : getWeather(KEY);
}

//gets weather information from openweathermap api
function getWeather(key) 
{
	let zip = localStorage.getItem('zip');
	fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${key}`)
	.then(response => response.json())
	.then(response =>{
		let tempEle = document.getElementById("temp");
		let weather = document.getElementById("weather");
		const newEle = document.createElement('span');
		newEle.innerHTML = `${response.main.temp.toFixed(0)} &#8457`;
		tempEle.append(newEle);
		tempEle.title = `High ${response.main.temp_max.toFixed(0)}F/Low ${response.main.temp_min.toFixed(0)}F`;
		weather.src = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
		weather.title = response.weather[0].description;
		if(!nameCheck())
		{
			tempEle.classList.remove('hide');
		}
	}).catch(err => {
		console.log(err);
		let tempEle = document.getElementById("temp");
		tempEle.textContent = 'Something went wrong. Make sure you have set a valid zip code for weather information.';
		weather.classList.add('hide');
	});
}

//checks for a stored name
function nameCheck() {
	let name = localStorage.getItem('name');
	return name === null;
}

//show or hide weather information based on settings
function showWeather() {
	let show = localStorage.getItem('toggle-weather');
	if(show !== null && show === 'false')
	{
		let ele = document.getElementById('weather-container');
		ele.classList.remove('center');
		ele.classList.add('hide');
	}
}