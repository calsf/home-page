showNotepad();
loadNotepad();
setTransparency();

//when focused on notepad, prevent default tab event and indent instead
document.getElementById('notepad').addEventListener("keydown", function(event){
	if(event.keyCode === 9)
	{
		event.preventDefault();
		let rangeZero = window.getSelection().getRangeAt(0);
		const newEle = document.createElement('span');
		const tab = document.createTextNode('\t');
  		newEle.appendChild(tab);
  		newEle.classList.add('white-space');
		rangeZero.insertNode(newEle);
		rangeZero.setStartAfter(newEle);
	}
})

//warns user before leaving or reloading page if the notepad contents have been changed and unsaved
window.onbeforeunload = function() {
	if(document.getElementById('notepad').innerHTML !== localStorage.getItem('notepad'))
	{
	  return "There are unsaved changes to notepad.";
	}
};

/*when no text is highlighted and font size is changed, it encloses new text in a <font size = "7">
*when font-size is changed again, this event listener ends up getting the old text enclosed in the <font size = "7"> tag 
*and changes the text to the new font size despite not being highlighted
*/
document.getElementById('font-size').addEventListener("change", function(event) {
	document.getElementById('notepad').focus();
	document.execCommand("fontSize", false, "7");
    replaceFontSize(`${event.target.value}px`);
})

//as a bandaid fix for the issue in the "font-size" listener above, this should resolve the <font size="7"> tags that slip through
document.getElementById('notepad').addEventListener("input", function(event) {
    replaceFontSize(`${document.getElementById('font-size').value}px`);
})

//remove any font tags with size equal to 7
function replaceFontSize(fontSize)
{
	let fontElements = document.getElementsByTagName("font");
	for (let i = 0; i < fontElements.length; ++i) 
    {
        if (fontElements[i].size == "7") 
        {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = fontSize;
        }
    }
}

function styleSelected(style)
{
	const text = document.getElementById('notepad')
	text.focus();
	document.execCommand(style);
}

//save current notepad data and show notification message that it has been saved
function save()
{
	const text = document.getElementById('notepad').innerHTML;
	localStorage.setItem('notepad', text);
	showNotification("Notepad contents have been saved.");
}

//load any stored notepad data
function loadNotepad()
{
	let notepad = document.getElementById('notepad');
	let saved = localStorage.getItem('notepad');
	if(saved !== null && saved !== "")
	{
		notepad.innerHTML = saved;
	}
	else
	{
		notepad.textContent = "Looks like your notepad is empty. Type anything here and save it to view later.";
	}
}

//show or hide notepad based on settings
function showNotepad() {
	let show = localStorage.getItem('toggle-notepad');
	if(show !== null && show === 'false')
	{
		let ele = document.getElementById('full-notepad');
		ele.classList.remove('notepad-div');
		ele.classList.add('hide');
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

//set transparency of notepad based on transparency settings and inverted settings
function setTransparency()
{
	const isTransp = localStorage.getItem('toggle-transp');
	if(isTransp !== null && isTransp === 'false')
	{
		const invert = localStorage.getItem('toggle-invert');
		let notepad = document.getElementById('notepad');
		invert !== null && invert === 'true'? notepad.classList.add('black-fill') : notepad.classList.add('white-fill');
	}
}