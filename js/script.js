const ada_text = document.getElementById('ada-text');
const time = document.getElementById('time');
const more_btn = document.getElementById('more-btn');
const more_container = document.getElementById('more-container');
const year_day = document.getElementById('yearday');
const day = document.getElementById('day');
const week = document.getElementById('week');
const textElements = document.querySelectorAll('.text');
const CURRENTLY = document.getElementById('CURRENTLY');
const time_img = document.getElementById('time-img');
let isHidden = false;
more_btn.addEventListener('click', function () {
    if (isHidden) {
        more_container.style.display = 'none';
        more_btn.innerHTML = 'MORE <img src="./assets/desktop/icon-arrow-down.svg" alt="icon-arrow-down">';
        ada_text.style.display = 'block';
        isHidden = false;
    }
    else {
        ada_text.style.display = 'none';
        more_btn.innerHTML = 'LESS <img src="./assets/desktop/icon-arrow-up.svg" alt="icon-arrow-up">';
        more_container.style.display = 'flex';
        isHidden = true;
    }
});    
const currentDate = new Date();
function updateTime()
{
    let startTime = new Date(currentDate.getFullYear(), 0, 0);
    let diff = (currentDate - startTime) + ((currentDate.getTimezoneOffset() - currentDate.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    let dayOfYear = Math.floor(diff / oneDay);
    year_day.textContent = dayOfYear;
    const londonDate = new Date(currentDate.toLocaleString('en-GB', { timeZone: 'Europe/London' }));//for testing light
    // const londonDate = new Date(currentDate.toLocaleString('en-GB', { timeZone: 'Asia/Tokyo' })); //for testing dark
    const hours = londonDate.getHours();
    const minutes = londonDate.getMinutes();
    time.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const language = 'en-us';
    const options = {  weekday: 'long' };
    const today = new Date().toLocaleString(language, options)
    day.textContent = today;
    if(hours >= 6 && hours < 18)
    {
        document.body.style.backgroundImage = 'url(../assets/desktop/bg-image-daytime.jpg)';console.log("is light");
        textElements.forEach(text => 
        {
            text.style.color = '#303030';
        });
        more_container.classList.add('light');
        time_img.src = './assets/desktop/icon-sun.svg';
    }
    else
    {
        document.body.style.backgroundImage = 'url(../assets/desktop/bg-image-nighttime.jpg)';
        console.log("is dark");
        textElements.forEach(text => 
        {
            text.style.color = '#fff';
        });    
        more_container.classList.add('black-panel');
        more_container.classList.add('dark');
        CURRENTLY.innerHTML = "GOOD EVENING, IT'S CURRENTLY";
        time_img.src = './assets/desktop/icon-moon.svg';
    }
}
updateTime();
setInterval(updateTime, 60000);
function getWeekOfYear(date)
{
    let start = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - start) / 86400000) + start.getDay() + 1) / 7);
}
const weekOfYear = getWeekOfYear(currentDate);
week.innerHTML = weekOfYear;