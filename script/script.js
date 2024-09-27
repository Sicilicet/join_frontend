/**
 * Loads the animated image.
 */
function loadImg() {
    let container = document.getElementById('logo-container');
    let img = document.getElementById('logo-img');
    img.classList.remove('frontImage');
    img.classList.add('imgResponsive');
    if (document.location.pathname.includes('index.html')) {
      img.src = 'assets/img/logo_blue.png';
      container.style.zIndex = '8';
      container.style.backgroundColor = 'white';
      document.getElementById('login-container').style.display = 'flex';
    }
  }


/**
 * Initializes the code on load.
 * @returns {Promise<void>}
 */
async function init() {
    await includeHTML();
    CheckIfLoggedInOrGuest();
    checkFocusOnSidenav();
    
}

/**
 * Check which page is active and sets corresponding class and image.
 */
function setActivePage(pageName, pageId, imgId, imgPathBlue, imgPathDefault){
    let responsive = window.innerWidth < 1000;
    // currentTodoId = '';
    if (document.location.pathname.includes(pageName)){
        let pageElement = document.getElementById(pageId);
        let imgElement = document.getElementById(imgId);
        if (pageElement && imgElement) {
            pageElement.classList.add('active');
            imgElement.src = responsive ? imgPathBlue : imgPathDefault;
        }
    }
}
function checkFocusOnSidenav(){
    setActivePage("contacts.html", 'contactsPage', 'contactsImg', 'assets/img/contacts_blue.png', "assets/img/nav-contact-icon.png");
    setActivePage("add_task.html", 'taskPage', 'taskImg', 'assets/img/addtask_blue.png', "assets/img/nav-add-task-icon.png");
    setActivePage("board.html", 'boardPage', 'boardImg', 'assets/img/board_blue.png', "assets/img/nav-board-icon.png");
    setActivePage("summary.html", 'summaryPage', 'summaryImg', 'assets/img/summary_blue.png', "assets/img/nav-summary-icon.png");
}


/**
 * Loads the animated image.
 */
function loadImg() {
    let container = document.getElementById('logo-container');
    let img = document.getElementById('logo-img');
    img.classList.remove('frontImage');
    img.classList.add('imgResponsive');
    if (document.location.pathname.includes("index.html")) {
        img.src = 'assets/img/logo_blue.png';
        container.style.zIndex = '8';
        container.style.backgroundColor = "white";
        document.getElementById('login-container').style.display = 'flex'; 
    }
}


/**
 * Include HTML function for usage of templates.
 * @returns {Promise<void>}
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * Desktop template, shows options on logged-in user/guest.
 */
function showNavDropDown(){
    let dropdown = document.getElementById('navbar-dropdown');
    
    if(dropdown.classList.contains('d-none')){
        dropdown.classList.remove('d-none');
    }else{
        dropdown.classList.add('d-none');
    }
    
}


/**
 * Checks if a user is logged in or else as a guest.
 */
async function CheckIfLoggedInOrGuest() {
    loggedInUser = localStorage.getItem('User');
    // console.log("loggedinuser", loggedInUser)
    if(document.location.pathname.includes("add_task.html") || document.location.pathname.includes("board.html") || document.location.pathname.includes("contacts.html") || document.location.pathname.includes("summary.html")){
        if (loggedInUser) {
            // loggedInUser = JSON.parse(decodeURIComponent(loggedInUserCookie.split('=')[1]));
            document.getElementById('user-initials').innerHTML = `<div>${returnInitials(loggedInUser)}</div>`;
            if (document.location.pathname.includes("summary.html")){
            document.getElementById('summary-headline').innerHTML = `${checkTimeOfDay()}, ${loggedInUser}`;
            }
        } else {
            document.getElementById('user-initials').innerHTML = '<div>G</div>';
            if (document.location.pathname.includes("summary.html")){
                document.getElementById('summary-headline').innerHTML = `${checkTimeOfDay()}`;
            }
        }
    }
    
}


/**
 * Gets current time and day and answers to it.
 * @returns {string} Greeting based on the time of day.
 */
function checkTimeOfDay() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();

    if (currentHour >= 6 && currentHour < 12) {
        return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Good Day';
    } else {
        return 'Good Evening';
    }
}


/**
 * Gets the initials of a name.
 * @param {string} name - The full name from which initials are extracted.
 * @returns {string} Initials of the given name.
 */
function returnInitials(name){
    let names = name.split(' ');
    let initials = '';

    for (let name of names) {
        initials += name.charAt(0).toUpperCase();
    }
    return initials;
}


/**
 * Logs out user and returns to index.
 */
async function logout() {
    const url = 'http://127.0.0.1:8000/logout/';
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') 
            },
        // credentials: 'include'
    }
    await fetch(url, requestOptions).then(response => {
        if(response.ok) {
            // console.log('ausgeloggt');
            loggedInUser = null;
            localStorage.removeItem('User');
            localStorage.removeItem('Token');
            window.location.href = 'index.html';
        } else {
            console.error('Logout fehlgeschlagen')
        }
    })
    .catch(error => console.error('fehler', error))
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


/**
 * Event listener for window resize, calls checkFocusOnSidenav.
 */
window.addEventListener('resize', function () {
    checkFocusOnSidenav();
});
