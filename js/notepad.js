loadNotepad();

/*when no text is highlighted and font size is changed, it encloses new text in a <font size = "7">
*when font-size is changed again, this event listener ends up getting the old text enclosed in the <font size = "7"> tag 
*and changes the text to the new font size despite not being highlighted
*/
document.getElementById('font-size').addEventListener("change", function(event) {
	document.execCommand("fontSize", false, "7");
    let fontElements = document.getElementsByTagName("font");
    for (let i = 0; i < fontElements.length; ++i) 
    {
        if (fontElements[i].size == "7") 
        {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = `${event.target.value}px`;
        }
    }
})

//as a bandaid fix for the issue in the "font-size" listener above, this should resolve the <font size="7"> tags that slip through
document.getElementById('notepad').addEventListener("input", function(event) {
	let fontElements = document.getElementsByTagName("font");
    for (let i = 0; i < fontElements.length; ++i) 
    {
        if (fontElements[i].size == "7") 
        {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = `${document.getElementById('font-size').value}px`;
        }
    }
})


function styleSelected(style)
{
	const text = document.getElementById('notepad')
	//const ele = document.getElementById(style);
	text.focus();
	//ele.classList.contains('editor-selected') ? ele.classList.remove('editor-selected') : ele.classList.add('editor-selected');
	document.execCommand(style);
}

//save current notepad data
function save()
{
	const text = document.getElementById('notepad').innerHTML;
	localStorage.setItem('notepad', text);
	alert("Current notepad text saved.");
}

//load any stored notepad data
function loadNotepad()
{
	let notepad = document.getElementById('notepad');
	let saved = localStorage.getItem('notepad');
	console.log(saved);
	if(saved != "")
	{
		notepad.innerHTML = saved;
	}
}