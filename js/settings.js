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
setInvert();
setTransp();
addLoseFocus(links, linkNames); //add event listeners to link input fields

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

	let linkTitles = document.getElementsByClassName('link-title')

	for(let i = 0; i < links.length; i++)
	{
		if(storedLinks[i] === null && storedLinkNames[i] === null)
		{
			let remove = document.getElementById(`remove-link${i + 1}`);
			remove.disabled = true;
			remove.classList.add('disabled');
			linkTitles[i].textContent = `Link ${i+1} - Empty`;
		}
		else
		{
			linkTitles[i].textContent = `Link ${i+1} - ${localStorage.getItem(`link${i+1}-name`)}`;

		}
		linkNames[i].textContent = storedLinkNames[i]
		links[i].textContent = storedLinks[i];
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

//toggle the checkbox setting for certain elements by storing into localStorage when checkbox is clicked on
function toggleCheckbox(element, event)
{
	const toToggle = document.getElementById(element);
	localStorage.setItem(element, event.checked);
}

//set the visibility checkboxes to true or false based on localStorage data
function setVisibility()
{
	let showNotepad = localStorage.getItem('toggle-notepad');
	showNotepad = convertToBool(showNotepad, 'toggle-notepad', true);

	let showSearch = localStorage.getItem('toggle-search');
	showSearch = convertToBool(showSearch, 'toggle-search', true);

	let showWeather = localStorage.getItem('toggle-weather');
	showWeather = convertToBool(showWeather, 'toggle-weather', true);

	let showLinks = localStorage.getItem('toggle-links');
	showLinks = convertToBool(showLinks, 'toggle-links', true);

	let showDate = localStorage.getItem('toggle-date');
	showDate = convertToBool(showDate, 'toggle-date', true);

	document.getElementById('toggle-notepad').checked = showNotepad;
	document.getElementById('toggle-search').checked = showSearch;
	document.getElementById('toggle-weather').checked = showWeather;
	document.getElementById('toggle-links').checked = showLinks;
	document.getElementById('toggle-date').checked = showDate;
}

//set page color checkbox to true or false based on localStorage data
function setInvert()
{
	let invert = localStorage.getItem('toggle-invert');
	invert = convertToBool(invert, 'toggle-invert', false);
	document.getElementById('toggle-invert').checked = invert;
}

//set notepad transparency checkbox to true or false based on localStorage data
function setTransp()
{
	let transp = localStorage.getItem('toggle-transp');
	transp = convertToBool(transp, 'toggle-transp', false);
	document.getElementById('toggle-transp').checked = transp;
}

//convert localStorage value to a boolean value
function convertToBool(item, storageName, defaultVal)
{
	if(item === null )
	{
		item = defaultVal;
		localStorage.setItem(storageName, defaultVal);
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
				enableRemove(`link${i}`);
				i = 7;
				linkName.value = ('');
				url.value = ('');
				showNotification('New link has been added.');
				showStoredLinks();
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
	notif.classList.remove('hide');
	notif.textContent = text;
	if(!notif.classList.contains('fade-anim'))
	{
		notif.classList.add('fade-anim');
		setTimeout(()=> {
			notif.classList.remove('fade-anim');
			notif.classList.add('hide')}, 4000);
	}
}


//add event listener to link edit input fields, when they lose focus, it will set contentEditable to false
function addLoseFocus(links, linkNames) {
	for(let i = 0; i < links.length; i++)
	{
		links[i].addEventListener("blur", function() {
			links[i].contentEditable = "false";
			links[i].classList.remove('text-cursor');
		})
		linkNames[i].addEventListener("blur", function() {
			linkNames[i].contentEditable = "false";
			linkNames[i].classList.remove('text-cursor');
		})
	}
}


//edit the corresponding input field
function enableEdit(link)
{
	let toEdit = document.getElementById(`${link}`);
	toEdit.classList.add('text-cursor');
	toEdit.contentEditable = "true";
	toEdit.focus();
}


//confirms and saves changes to links
function confirmEdit(link)
{
	let url = document.getElementById(`${link}`);
	let name = document.getElementById(`${link}-name`);
	if(url.textContent !== "" && name.textContent !== "")
	{
		localStorage.setItem(`${link}`, url.textContent);
		localStorage.setItem(`${link}-name`, name.textContent);
		enableRemove(`${link}`);
		showNotification("Changes saved.");
		showStoredLinks();
	}
	else
	{
		showNotification("Unable to confirm changes. Please enter both a name and URL.")
	}

}

//checks for disabled remove button and reenables
function enableRemove(string)
{
	let remove = document.getElementById(`remove-${string}`);
	if (remove.classList.contains('disabled'))
	{
		remove.classList.remove('disabled');
		remove.disabled = false;
	}
}

//set and save background based on input
function setBackground()
{
	const bg = document.getElementById('bg-input').value;
	localStorage.setItem('background', bg);
	showNotification("Background has been set.");
}

//clear the current background
function clearBackground()
{
	localStorage.removeItem('background');
	showNotification("Background has been cleared.");
}