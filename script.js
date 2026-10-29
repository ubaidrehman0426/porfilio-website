const hidePreloader = () => {
    const preloader = document.querySelector(".preloader");

    document.body.classList.remove("is-loading");
    preloader.classList.add("is-loaded");
    preloader.setAttribute("aria-hidden", "true");
    preloader.inert = true;
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hidePreloader, { once: true });
} else {
    hidePreloader();
}


const date = document.getElementById('date')
const setCurrentYear = () => {
    const currentYear = new Date().getFullYear()
    date.textContent = currentYear
}
setCurrentYear()

// hamburger menu
const hamburger = document.querySelector('.hamburger')
const navList = document.querySelector('.nav-list')
const navLinks = document.querySelectorAll('.nav-list a')
const navDropdowns = document.querySelectorAll('.nav-dropdown details')
const navBackdrop = document.querySelector('.nav-backdrop')

const toggleMobileMenu = () => {
    hamburger.classList.toggle('open')
    navList.classList.toggle('open')
    document.body.classList.toggle('open')
}

const closeMobileMenu = () => {
    hamburger.classList.remove('open')
    navList.classList.remove('open')
    document.body.classList.remove('open')
}

navDropdowns.forEach(dropdown => dropdown.addEventListener('toggle', () => {
    if (dropdown.open) {
        navDropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.removeAttribute('open')
            }
        })
    }
}))

navBackdrop.addEventListener('click', () => {
    navDropdowns.forEach(dropdown => dropdown.removeAttribute('open'))
})

navLinks.forEach(link => link.addEventListener('click', () => {
    if (link.closest('details')) {
        link.closest('details').removeAttribute('open')
    }
    if (window.matchMedia('(max-width: 900px)').matches) {
        closeMobileMenu()
        navDropdowns.forEach(dropdown => dropdown.removeAttribute('open'))
    }
}))


const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

hamburger.addEventListener('click', toggleMobileMenu)

const testimonialCards = [...document.querySelectorAll('.testimonial-card')]

const setTestimonialFlipped = (card, isFlipped) => {
    const front = card.querySelector('.testimonial-front')
    const back = card.querySelector('.testimonial-back')

    card.classList.toggle('is-flipped', isFlipped)
    card.setAttribute('aria-expanded', String(isFlipped))
    card.setAttribute(
        'aria-label',
        isFlipped ?
        'Demo client details. Press Enter or Space to view sample review.' :
        'Sample review. Press Enter or Space to view demo client details.'
    )
    front.inert = isFlipped
    front.setAttribute('aria-hidden', String(isFlipped))
    back.inert = !isFlipped
    back.setAttribute('aria-hidden', String(!isFlipped))
}

testimonialCards.forEach(card => {
    setTestimonialFlipped(card, card.classList.contains('is-flipped'))

    const toggleTestimonial = () => {
        const showClient = !card.classList.contains('is-flipped')
        testimonialCards.forEach(otherCard => {
            const isFlipped = otherCard === card ? showClient : true
            setTestimonialFlipped(otherCard, isFlipped)
        })
    }

    card.addEventListener('click', event => {
        if (!event.target.closest('a')) {
            toggleTestimonial()
        }
    })

    card.addEventListener('keydown', event => {
        if (event.target === card && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            toggleTestimonial()
        }
    })

    document.addEventListener("DOMContentLoaded", function() {
        new Swiper(".karachiSwiper", {
            loop: true,
            speed: 800,
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            pagination: {
                el: ".karachiSwiper .swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".karachiSwiper .karachi-next",
                prevEl: ".karachiSwiper .karachi-prev"
            }
        });
    });

})


// initialize aos (library for scroll animation)
AOS.init()