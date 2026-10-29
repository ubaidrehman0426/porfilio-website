(() => {
    "use strict";

    const storageKey = "portfolio-theme";

    const applyTheme = (theme) => {
        document.documentElement.dataset.theme = theme;

        const themeColorMeta = document.querySelector(
            'meta[name="theme-color"]'
        );

        if (themeColorMeta) {
            themeColorMeta.setAttribute(
                "content",
                theme === "light" ? "#f4f7f6" : "#000000"
            );
        }
    };

    // Load the saved theme preference.
    let savedTheme = "dark";

    try {
        const storedTheme = window.localStorage.getItem(storageKey);

        if (storedTheme === "light" || storedTheme === "dark") {
            savedTheme = storedTheme;
        }
    } catch (error) {
        console.error(
            "Unable to read the saved theme preference.",
            error
        );
    }

    // Apply the initial theme.
    applyTheme(savedTheme);

    const initializeThemeToggle = () => {
        const toggles = document.querySelectorAll(".theme-toggle");

        if (!toggles.length) {
            return;
        }

        const updateToggle = (theme) => {
            const nextTheme = theme === "light" ? "dark" : "light";
            const label = `Switch to ${nextTheme} mode`;

            toggles.forEach((toggle) => {
                toggle.setAttribute("aria-label", label);
                toggle.setAttribute("title", label);

                const textLabel = toggle.querySelector(
                    ".theme-toggle-label"
                );

                if (textLabel) {
                    textLabel.textContent = label;
                }
            });
        };

        updateToggle(document.documentElement.dataset.theme);

        toggles.forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const currentTheme =
                    document.documentElement.dataset.theme;

                const nextTheme =
                    currentTheme === "light" ? "dark" : "light";

                applyTheme(nextTheme);
                updateToggle(nextTheme);

                try {
                    window.localStorage.setItem(
                        storageKey,
                        nextTheme
                    );
                } catch (error) {
                    console.error(
                        "Unable to save the theme preference.",
                        error
                    );
                }
            });
        });
    };

    // Support scripts loaded before or after DOMContentLoaded.
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeThemeToggle, { once: true }
        );
    } else {
        initializeThemeToggle();
    }
})();