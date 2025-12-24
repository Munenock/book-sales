

// Fetch from local JSON file
async function fetchBooks() {
    try {
        const response = await fetch('books.json');
        const books = await response.json();
        loadBooks(books);
    } catch (error) {
        console.error('Error loading books:', error);
    }
}
async function fetchTestimonials() {
    try {
        const response = await fetch('testimonials.json');
        const testimonials = await response.json();
        loadTestimonials(testimonials);
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}
async function fetchEvents() {
    try {
        const response = await fetch('events.json');
        const events = await response.json();
        loadEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}
// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Load books
    fetchBooks();
    fetchEvents();
    fetchTestimonials();
    initiateSlider();
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });
    // Function to load events from JSON/array


    // When using with JSON file


    // When using JavaScript array directly


    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        // In a real implementation, you would send this to a server
        alert(`Thank you for subscribing with ${email}.`);
        this.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add header shadow on scroll
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});
function loadEvents(eventsData) {
    const eventsList = document.querySelector('.events-list');
    if (!eventsList) return;

    eventsList.innerHTML = '';
    eventsData.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';

        eventItem.innerHTML = `
            <div class="event-date">
                <span class="day">${event.day}</span>
                <span class="month">${event.month}</span>
            </div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <p><i class="${event.locationIcon}"></i> ${event.location}</p>
                <p>${event.description}</p>
                <a href="${event.buttonLink}" class="btn" >${event.buttonText}</a>
            </div>
        `;
        eventsList.appendChild(eventItem);
    });
}
function loadBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    // alert(9)
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        // Create badges HTML
        let badgesHtml = '';
        book.badges.forEach(badge => {
            const badgeClass = badge.toLowerCase().includes('bestseller') || badge.toLowerCase().includes('award')
                ? 'bestseller'
                : badge.toLowerCase().includes('new') ? 'new' : '';
            badgesHtml += `<span class="badge ${badgeClass}">${badge}</span>`;
        });

        bookCard.innerHTML = `
                    <div class="book-cover">
                        <img src="${book.cover}" alt="${book.title}">
                    </div>
                    <div class="book-info">
                        <h3 class="book-title">${book.title}</h3>
                        <div class="book-badges">${badgesHtml}</div>
                        <p class="book-description">${book.description}</p>
                        <div class="book-price">${book.price}</div>
                        <div class="buy-options">
                            <a href="${book.amazonLink}" class="btn" target="_blank">Buy on <i class="fab fa-amazon"></i></a>
                            <a href="${book.signedLink}" class="btn btn-accent">Signed Copy</a>
                        </div>
                    </div>
                `;

        booksGrid.appendChild(bookCard);
    });
}
// Function to load testimonials
function loadTestimonials(testimonialsData) {
    const testimonialsContainer = document.querySelector('.testimonials-slider');
    if (!testimonialsContainer) return;
    // alert(9)
    // Clear existing testimonials except the slider controls
    const existingTestimonials = testimonialsContainer.querySelectorAll('.testimonial');
    existingTestimonials.forEach(testimonial => testimonial.remove());

    // Add new testimonials
    testimonialsData.forEach((testimonial, index) => {
        let testimonialDiv = document.createElement('div');
        testimonialDiv.className = `testimonial ${index === 0 ? 'active' : ''}`;
        testimonialDiv.id = `testimonial${index + 1}`;
        testimonialDiv.innerHTML = `
            <div class="testimonial-text">
                "${testimonial.text || testimonial.quote}"
            </div>
            <div class="testimonial-author">${testimonial.author}</div>
            <div class="testimonial-source">${testimonial.source}</div>
            
        `;
        testimonialsContainer.insertBefore(testimonialDiv, testimonialsContainer.querySelector('.slider-controls'));
    });


}
function initiateSlider() {
    var index = 0;
    const controlButtons = document.querySelectorAll(".slider")
    function slide(slideButton) {
        const testimonialDiv = document.querySelectorAll(".testimonial")
        console.log(slideButton)
        console.log(testimonialDiv[0])
        testimonialDiv.forEach((testimonial, index) => {
            testimonial.classList.remove('active')
        })

        if (slideButton.classList.contains('next')) {
            if (index < testimonialDiv.length - 1) { index = index + 1 } else { index = 0 }
            testimonialDiv[index].classList.add('active')
        } else if (slideButton.classList.contains('prev')) {
            if (index > 0) { index = index - 1 } else { index = testimonialDiv.length - 1 }

            testimonialDiv[index].classList.add('active')

        }
    }
    controlButtons.forEach((e) => e.addEventListener('click', (e) => slide(e.target)))
    setInterval(() => {
        slide(document.querySelector('.next '))
    }, 4000)
}




// Simple book sale counter for demonstration
function updateSaleCounters() {
    // This would normally come from a backend
    const saleCounters = document.querySelectorAll('.sale-counter');
    const totalSales = 12478; // Example number

    saleCounters.forEach(counter => {
        counter.textContent = totalSales.toLocaleString();
    });
}

// Call any initialization functions
updateSaleCounters()