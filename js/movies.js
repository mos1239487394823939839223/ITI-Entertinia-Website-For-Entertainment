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
}

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
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

        const carouselContainer = document.getElementById('carouselContainerMovies');
        data.moviescarousel.forEach((item, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = index === 0 ? 'carousel-item active' : 'carousel-item';
            carouselItem.innerHTML = `<img src="${item.image}" class="d-block w-100 setHeight" alt="${item.id}">`;
            carouselContainer.appendChild(carouselItem);
        });

        const comedyContainer = document.getElementById('comedyContainer');
        const comedyData = data.movies.filter(item => item.Genre == "Comedy");
        comedyData.forEach(item => {
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
            comedyContainer.appendChild(featureBox);
        });

        const fantasyContainer = document.getElementById('fantasyContainer');
        const fantasyData = data.movies.filter(item => item.Genre == "Fantasy");
        fantasyData.forEach(item => {
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
            fantasyContainer.appendChild(featureBox);
        });

        const dramaContainer = document.getElementById('dramaContainer');
        const dramaData = data.movies.filter(item => item.Genre == "Drama");
        dramaData.forEach(item => {
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
            dramaContainer.appendChild(featureBox);
        });

        const actionContainer = document.getElementById('actionContainer');
        const actionData = data.movies.filter(item => item.Genre == "Action");
        actionData.forEach(item => {
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
            actionContainer.appendChild(featureBox);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));
