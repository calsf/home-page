loadNotepad();

//font-size is buggy, only works correctly for highlighted text
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