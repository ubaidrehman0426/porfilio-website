const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
const navBackdrop = document.querySelector(".nav-backdrop");
const navDropdowns = document.querySelectorAll(".nav-dropdown details");

const closeMenu = () => {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation");
    navList.classList.remove("open");
    document.body.classList.remove("open");
};

hamburger.addEventListener("click", () => {
    const isOpen = hamburger.getAttribute("aria-expanded") !== "true";
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navList.classList.toggle("open", isOpen);
    document.body.classList.toggle("open", isOpen);
});

navDropdowns.forEach(dropdown => dropdown.addEventListener("toggle", () => {
    if (dropdown.open) {
        navDropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.removeAttribute("open");
            }
        });
    }
}));

navBackdrop.addEventListener("click", () => {
    navDropdowns.forEach(dropdown => dropdown.removeAttribute("open"));
    closeMenu();
});

navList.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
        closeMenu();
        navDropdowns.forEach(dropdown => dropdown.removeAttribute("open"));
    }
}));
