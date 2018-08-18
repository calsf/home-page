//displayed link urls
let links = [
document.getElementById('link1'),
document.getElementById('link2'),
document.getElementById('link3'),
document.getElementById('link4'),
document.getElementById('link5'),
document.getElementById('link6')];

//displayed link names
let linkNames = [
document.getElementById('link1-name'),
document.getElementById('link2-name'),
document.getElementById('link3-name'),
document.getElementById('link4-name'),
document.getElementById('link5-name'),
document.getElementById('link6-name')]
let name = localStorage.getItem('name');
let zip = localStorage.getItem('zip');
let currentName = document.getElementById('current-name');
let currentZip= document.getElementById('current-zip');

//showing stored information
name === null ? currentName.textContent = "Not set" : currentName.textContent = name;
zip === null ? currentZip.textContent = "Not set. Add zip code to get weather information." : currentZip.textContent = zip;
showStoredLinks();
setVisibility();

//used for changing name and zip settings
function changeSetting(setting)
{
	const input = document.getElementById(`${setting}-input`).value;
	if(input !== "")
	{
		localStorage.setItem(`${setting}`, input);
		let currentSetting = document.getElementById(`current-${setting}`);
		currentSetting.textContent = localStorage.getItem(setting);
		showNotification(`${setting.charAt(0).toUpperCase() + setting.substring(1, setting.length)} has been changed.`);
	}
	else
	{
		showNotification(`${setting.charAt(0).toUpperCase() + setting.substring(1, setting.length)} is empty. Please enter a ${setting}.`);
	}
}

//gets the link url and link names in users local storage
function showStoredLinks()
{
	let storedLinks = [
	localStorage.getItem('link1'),
	localStorage.getItem('link2'),
	localStorage.getItem('link3'),
	localStorage.getItem('link4'),
	localStorage.getItem('link5'),
	localStorage.getItem('link6')];

	let storedLinkNames = [
	localStorage.getItem('link1-name'),
	localStorage.getItem('link2-name'),
	localStorage.getItem('link3-name'),
	localStorage.getItem('link4-name'),
	localStorage.getItem('link5-name'),
	localStorage.getItem('link6-name')];

	for(let i = 0; i < links.length; i++)
	{
		if(storedLinks[i] === null && storedLinkNames[i] === null)
		{
			links[i].textContent = "Not set.";
			linkNames[i].textContent = "";
		}
		else
		{
			links[i].textContent = storedLinks[i];
			linkNames[i].textContent = storedLinkNames[i];
		}
	}
}


//removes link url and associated link name from local storage
function removeLink(link)
{
	localStorage.removeItem(link);
	localStorage.removeItem(`${link}-name`);
	showNotification('Link has been removed.');
	showStoredLinks();
}

//remove stored notepad data
function resetNotepad()
{
	localStorage.removeItem('notepad');
	showNotification('Notepad content has been reset.');
}

//show content when arrow is clicked
function showContent(content, event)
{
	let ele = document.getElementById(content);
	if(ele.classList.contains('hide'))
	{
		ele.classList.remove('hide');
		event.src="../img/arrow-down.png";
	}
	else
	{
		ele.classList.add('hide');
		event.src="../img/arrow-right.png";
	}
}

//toggle the visibility setting for certain elements by storing into localStorage when checkbox is clicked on
function toggleVisibility(element, event)
{
	const toToggle = document.getElementById(element);
	localStorage.setItem(element, event.checked);
}

//set the visibility checkboxes to true or false based on localStorage data
function setVisibility()
{
	let showNotepad = localStorage.getItem('toggle-notepad');
	showNotepad = convertToBool(showNotepad, 'toggle-notepad');

	let showSearch = localStorage.getItem('toggle-search');
	showSearch = convertToBool(showSearch, 'toggle-search');

	let showWeather = localStorage.getItem('toggle-weather');
	showWeather = convertToBool(showWeather, 'toggle-weather');

	let showLinks = localStorage.getItem('toggle-links');
	showLinks = convertToBool(showLinks, 'toggle-links');

	document.getElementById('toggle-notepad').checked = showNotepad;
	document.getElementById('toggle-search').checked = showSearch;
	document.getElementById('toggle-weather').checked = showWeather;
	document.getElementById('toggle-links').checked = showLinks;
}

//convert localStorage value to a boolean value
function convertToBool(item, storageName)
{
	if(item === null )
	{
		item = true;
		localStorage.setItem(storageName, true);
	}
	else if (item === 'true') 
	{
		item = true;
		
	}
	else
	{
		item = false;
	}
	return item;
}

//looks for empty slot and adds a new link
function addLink() {
	const linkName = document.getElementById('link-input-name');
	const url = document.getElementById('link-input-url');
	let isFull = true;
	let i = 1;
	if(linkName.value !== "" && url !== "")
	{
		do
		{
			let data = localStorage.getItem(`link${i}`)
			if(data === null)
			{
				isFull = false;
				localStorage.setItem(`link${i}`, url.value);
				localStorage.setItem(`link${i}-name`, linkName.value);
				let linkEle = document.getElementById(`link${i}`);
				let linkNameEle = document.getElementById(`link${i}-name`);
				linkEle.textContent = url.value;
				linkNameEle.textContent = linkName.value;
				i = 7;
				linkName.value = ('');
				url.value = ('');
				showNotification('New link has been added.');
			}
			else
			{
				i++;
			}

		} while(i < 7);

		if(isFull)
		{
			showNotification('Unable to add link. All link slots are full, please remove a link before continuing.');
		}
	}
	else
	{
		showNotification('Unable to add link. Please enter both a name and URL.');
	}
}

//show notification message
function showNotification(text) {
	let notif = document.getElementById('notification-msg');
	notif.textContent = text;
	if(!notif.classList.contains('fade-anim'))
	{
		notif.classList.add('fade-anim');
		setTimeout(()=> notif.classList.remove('fade-anim'), 5000);
	}
}