showNotepad();

//show or hide search bar based on settings
function showNotepad() {
	let show = localStorage.getItem('toggle-search');
	if(show !== null && show === 'false')
	{
		let ele = document.getElementById('search-bar');
		ele.classList.add('hide');
	}
}

//submit the form data
function submitForm(){
	document.getElementById("search").form.submit();
}