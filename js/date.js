const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let date = new Date();
let weekday = `${days[date.getDay()]}`;
let fullDate = `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;

document.getElementById('date').textContent = `${weekday}, ${fullDate}`;