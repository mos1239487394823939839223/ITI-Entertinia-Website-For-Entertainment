/* document.addEventListener('DOMContentLoaded', function () {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const body = document.body;


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        darkModeSwitch.checked = true;
    } else {
        body.setAttribute('data-theme', 'light');
        darkModeSwitch.checked = false;
    }


    darkModeSwitch.addEventListener('change', function () {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.setAttribute('data-theme', 'dark');
    darkModeSwitch.checked = true;
    localStorage.setItem('theme', 'dark');
} */

/* document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'home'; 

    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}); */
/* const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'home';

navLinks.forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
}); */

fetch('js/database.json')
    .then(response => response.json())
    .then(data => {

        const carouselContainer = document.getElementById('carouselContainerSport');
        data.sportscarousel.forEach((item, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = index === 0 ? 'carousel-item active' : 'carousel-item';
            carouselItem.innerHTML = `<img src="${item.image}" class="d-block w-100 setHeight" alt="${item.id}">`;
            carouselContainer.appendChild(carouselItem);
        });

        const footballContainer = document.getElementById('footballContainer');
        const footballData = data.sports.filter(item => item.id.startsWith('F'));
        footballData.forEach(item => {
            const featureBox = document.createElement('div');
            featureBox.className = 'col-md-6 col-lg-3 editCard';
            featureBox.innerHTML = `
                <div class="box">
                    <a href="${item.url}" class="anchorCard">
                        <img class="img-fluid setImageHeight" src="${item.src}" alt="${item.name}">
                        <h4 class="p-3">${item.name}</h4>
                        <p class="p-3">${item.description}</p>
                    </a>
                </div>
                `;
            footballContainer.appendChild(featureBox);
        });

        const tennisContainer = document.getElementById('tennisContainer');
        const tennisData = data.sports.filter(item => item.id.startsWith('T'));
        tennisData.forEach(item => {
            const featureBox = document.createElement('div');
            featureBox.className = 'col-md-6 col-lg-3 editCard';
            featureBox.innerHTML = `
               <div class="box">
                    <a href="${item.url}" class="anchorCard">
                        <img class="img-fluid setImageHeight" src="${item.src}" alt="${item.name}">
                        <h4 class="p-3">${item.name}</h4>
                        <p class="p-3">${item.description}</p>
                    </a>    
                </div>
                `;
            tennisContainer.appendChild(featureBox);
        });

        const basketballContainer = document.getElementById('basketballContainer');
        const basketballData = data.sports.filter(item => item.id.startsWith('B'));
        basketballData.forEach(item => {
            const featureBox = document.createElement('div');
            featureBox.className = 'col-md-6 col-lg-3 editCard';
            featureBox.innerHTML = `
                <div class="box">
                    <a href="${item.url}" class="anchorCard">
                        <img class="img-fluid setImageHeight" src="${item.src}" alt="${item.name}">
                        <h4 class="p-3">${item.name}</h4>
                        <p class="p-3">${item.description}</p>
                    </a>
                </div>
                `;
            basketballContainer.appendChild(featureBox);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));
