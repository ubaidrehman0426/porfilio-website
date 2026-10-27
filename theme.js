(() => {
    const storageKey = "portfolio-theme";
    const applyTheme = theme => {
        document.documentElement.dataset.theme = theme;
        document.querySelector('meta[name="theme-color"]')?.setAttribute(
            "content",
            theme === "light" ? "#f4f7f6" : "#000000"
        );
    };

    let savedTheme = null;
    try {
        savedTheme = window.localStorage.getItem(storageKey);
    } catch (error) {
        console.error("Unable to read the saved theme preference.", error);
    }

    applyTheme(savedTheme === "light" ? "light" : "dark");

    document.addEventListener("DOMContentLoaded", () => {
        const toggles = document.querySelectorAll(".theme-toggle");
        if (toggles.length === 0) {
            return;
        }

        const updateToggle = theme => {
            const nextTheme = theme === "light" ? "dark" : "light";
            const label = `Switch to ${nextTheme} mode`;
            toggles.forEach(toggle => {
                toggle.setAttribute("aria-label", label);
                toggle.setAttribute("title", label);
                const textLabel = toggle.querySelector(".theme-toggle-label");
                if (textLabel) {
                    textLabel.textContent = label;
                }
            });
        };

        updateToggle(document.documentElement.dataset.theme);
        toggles.forEach(toggle => toggle.addEventListener("click", () => {
            const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
            applyTheme(theme);
            updateToggle(theme);
            try {
                window.localStorage.setItem(storageKey, theme);
            } catch (error) {
                console.error("Unable to save the theme preference.", error);
            }
        }));
    }, { once: true });
})();
