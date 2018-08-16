showNotepad();

//add event listener for the google search input element when user hits enter, submitting the form
document.getElementById("search").addEventListener("keyup", function(event){
	if(keyCode === 13)
	{
		event.form.submit();
	}
})

//show or hide search bar based on settings
function showNotepad() {
	let show = localStorage.getItem('toggle-search');
	if(show !== null && show === 'false')
	{
		let ele = document.getElementById('search-bar');
		ele.classList.add('hide');
	}
}