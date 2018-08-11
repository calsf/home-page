getLinks()

//shows input fields for adding a new link
function showLinkInputs() {
	const linkInputs = document.getElementById('link-input-div');
	let symbol = document.getElementById('show-link');
	if(linkInputs.classList.contains('hide'))
	{
		linkInputs.classList.remove('hide');
		symbol.textContent = "=";
	}
	else
	{
		linkInputs.classList.add('hide');
		symbol.textContent = "+";
	}

}

//looks for empty slot and adds a new link - CONDITION MISSING FOR WHEN ALL SLOTS ARE FULL
function addLink() {
	const linkName = document.getElementById('link-input-name').value;
	const url = document.getElementById('link-input-url').value;
	let i = 1;

	do
	{
		let data = localStorage.getItem(`link${i}`)
		if(data === null)
		{
			localStorage.setItem(`link${i}`, url);
			localStorage.setItem(`link${i}-name`, linkName);
			let linkEle = document.getElementById(`link${i}`);
			linkEle.href = url;
			linkEle.textContent = linkName;
			linkEle.parentNode.classList.remove('hide');
			i = 6;
		}
		else
		{
			i++;
		}

	} while(i < 6);

}

//gets the stored link urls and link names from user's local storage
function getLinks() {
	let links = [
	document.getElementById('link1'),
	document.getElementById('link2'), 
	document.getElementById('link3'), 
	document.getElementById('link4'), 
	document.getElementById('link5'),
	document.getElementById('link6')]

	for(let i = 0; i < links.length; i++)
	{
		if(localStorage.getItem(`link${i+1}`) !== null)
		{
			links[i].href = localStorage.getItem(`link${i+1}`);
			links[i].textContent = localStorage.getItem(`link${i+1}-name`);
			links[i].parentNode.classList.remove('hide');
		}

	}
}