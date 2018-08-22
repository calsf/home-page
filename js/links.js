showLinks();
getLinks();

//shows input fields for adding a new link
function showLinkInputs() {
	const linkInputs = document.getElementById('link-input-div');
	let symbol = document.getElementById('add-icon');
	if(linkInputs.classList.contains('hide'))
	{
		linkInputs.classList.remove('hide');
		symbol.src="../img/hide.png"
	}
	else
	{
		linkInputs.classList.add('hide');
		symbol.src="../img/add.png"
	}

}

//looks for empty slot and adds a new link - CONDITION MISSING FOR WHEN ALL SLOTS ARE FULL
function addLink() {
	const linkName = document.getElementById('link-input-name');
	const url = document.getElementById('link-input-url');
	let i = 1;
	if(linkName.value !== "" && url !== "")
	{
		do
		{
			let data = localStorage.getItem(`link${i}`)
			if(data === null)
			{
				localStorage.setItem(`link${i}`, url.value);
				localStorage.setItem(`link${i}-name`, linkName.value);
				let linkEle = document.getElementById(`link${i}`);
				linkEle.href = url.value;
				linkEle.textContent = linkName.value;
				linkEle.parentNode.classList.remove('hide');
				i = 7;
				linkName.value = ('');
				url.value = ('');
			}
			else
			{
				i++;
			}

		} while(i < 7);
	}
}

//gets the stored link urls and link names from user's local storage
function getLinks() {
	let hasLink = false;
	let links = [
	document.getElementById('link1'),
	document.getElementById('link2'), 
	document.getElementById('link3'), 
	document.getElementById('link4'), 
	document.getElementById('link5'),
	document.getElementById('link6')];

	for(let i = 0; i < links.length; i++)
	{
		if(localStorage.getItem(`link${i+1}`) !== null)
		{
			links[i].href = localStorage.getItem(`link${i+1}`);
			links[i].textContent = localStorage.getItem(`link${i+1}-name`);
			links[i].parentNode.classList.remove('hide');
			hasLink = true;
		}
	}
	if(hasLink === false)
	{
		document.getElementById('no-links').classList.remove('hide');
	}
}

//show or hide links based on settings
function showLinks() {
	let show = localStorage.getItem('toggle-links');
	if(show !== null && show === 'false')
	{
		let ele = document.getElementById('quick-links-container');
		ele.classList.remove('link-container');
		ele.classList.add('hide');
	}
}