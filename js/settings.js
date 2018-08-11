

let name = localStorage.getItem('name');
let zip = localStorage.getItem('zip');
let currentName = document.getElementById('current-name');
let currentZip= document.getElementById('current-zip');
name === null ? currentName.textContent = "Not set" : currentName.textContent = name;
zip === null ? currentZip.textContent = "Not set. Add zip code to get weather information." : currentZip.textContent = zip;

function changeSetting(setting)
{
	const input = document.getElementById(`${setting}-input`).value;
	localStorage.setItem(`${setting}`, input);
	let currentSetting = document.getElementById(`current-${setting}`);
	currentSetting.textContent = localStorage.getItem(setting);
}