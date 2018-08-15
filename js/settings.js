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

//used for changing name and zip settings
function changeSetting(setting)
{
	const input = document.getElementById(`${setting}-input`).value;
	if(input !== "")
	{
		localStorage.setItem(`${setting}`, input);
		let currentSetting = document.getElementById(`current-${setting}`);
		currentSetting.textContent = localStorage.getItem(setting);
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
	showStoredLinks();
}

//remove stored notepad data
function resetNotepad()
{
	localStorage.removeItem('notepad');
}

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