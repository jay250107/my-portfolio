
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. MOBILE NAVIGATION
    // =========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        function closeNavigation() {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        }

        function openNavigation() {
            navLinks.classList.add("is-open");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation");
        }

        function toggleNavigation(event) {
            event.preventDefault();
            event.stopPropagation();

            if (navLinks.classList.contains("is-open")) {
                closeNavigation();
            } else {
                openNavigation();
            }
        }

        menuToggle.addEventListener("click", toggleNavigation);

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeNavigation);
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                navLinks.classList.contains("is-open")
            ) {
                closeNavigation();
                menuToggle.focus();
            }
        });

        document.addEventListener("click", (event) => {
            if (
                navLinks.classList.contains("is-open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeNavigation();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                closeNavigation();
            }
        });
    }

    // =========================================
    // 2. CURRENT YEAR
    // =========================================

    document.querySelectorAll(".current-year, #current-year").forEach(
        (element) => {
            element.textContent = new Date().getFullYear();
        }
    );

    // =========================================
    // 3. LOCAL STORAGE HELPERS
    // =========================================

    function readSetting(key, fallback) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (error) {
            console.warn("Could not read saved setting:", error);
            return fallback;
        }
    }

    function saveSetting(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.warn("Could not save setting:", error);
        }
    }

    // =========================================
    // 4. ACCESSIBILITY SETTINGS
    // =========================================

    const textSizeInputs = document.querySelectorAll(
        'input[name="text-size"]'
    );

    const themeInputs = document.querySelectorAll(
        'input[name="colour-theme"]'
    );

    const readerToggle = document.querySelector("#reader-toggle");
    const resetButton = document.querySelector("#reset-settings");
    const settingsStatus = document.querySelector("#settings-status");

    // Announce changes to the settings status area.
    // When enhanced announcements are enabled, also use
    // a dedicated screen-reader announcement area.
    function announceSetting(message) {
        if (settingsStatus) {
            settingsStatus.textContent = message;
        }

        const readerEnabled =
            document.documentElement.dataset.readerSupport === "true";

        if (!readerEnabled) {
            return;
        }

        let announcement = document.getElementById(
            "reader-announcements"
        );

        if (!announcement) {
            announcement = document.createElement("div");
            announcement.id = "reader-announcements";
            announcement.setAttribute("role", "status");
            announcement.setAttribute("aria-live", "polite");
            announcement.setAttribute("aria-atomic", "true");

            Object.assign(announcement.style, {
                position: "absolute",
                width: "1px",
                height: "1px",
                padding: "0",
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: "0"
            });

            document.body.appendChild(announcement);
        }

        // Clear first so repeated messages can be announced.
        announcement.textContent = "";

        window.setTimeout(() => {
            announcement.textContent = message;
        }, 50);
    }

    // Text resizing.
    function applyTextSize(size) {
        const validSizes = ["normal", "large", "extra-large"];

        if (!validSizes.includes(size)) {
            size = "normal";
        }

        document.documentElement.dataset.textSize = size;

        textSizeInputs.forEach((input) => {
            input.checked = input.value === size;
        });

        saveSetting("portfolio-text-size", size);
    }

    // Light and dark mode.
    function applyTheme(theme) {
        if (!["light", "dark"].includes(theme)) {
            theme = "light";
        }

        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;

        themeInputs.forEach((input) => {
            input.checked = input.value === theme;
        });

        saveSetting("portfolio-theme", theme);
    }

    // Enhanced screen-reader announcements.
    function applyReaderSupport(enabled) {
        document.documentElement.dataset.readerSupport =
            String(enabled);

        if (readerToggle) {
            readerToggle.checked = enabled;
        }

        const filterStatus = document.querySelector("#filter-status");

        if (filterStatus) {
            if (enabled) {
                filterStatus.setAttribute("role", "status");
                filterStatus.setAttribute("aria-live", "polite");
                filterStatus.setAttribute("aria-atomic", "true");
            } else {
                filterStatus.removeAttribute("role");
                filterStatus.removeAttribute("aria-live");
                filterStatus.removeAttribute("aria-atomic");
            }
        }

        saveSetting("portfolio-reader-support", String(enabled));
    }

    // Load saved settings on every portfolio page.
    applyTextSize(readSetting("portfolio-text-size", "normal"));
    applyTheme(readSetting("portfolio-theme", "light"));

    applyReaderSupport(
        readSetting("portfolio-reader-support", "false") === "true"
    );

    // Listen for text-size changes.
    textSizeInputs.forEach((input) => {
        input.addEventListener("change", () => {
            if (input.checked) {
                applyTextSize(input.value);

                announceSetting(
                    "Text size changed to " + input.value + "."
                );
            }
        });
    });

    // Listen for theme changes.
    themeInputs.forEach((input) => {
        input.addEventListener("change", () => {
            if (input.checked) {
                applyTheme(input.value);

                announceSetting(
                    "Colour theme changed to " + input.value + " mode."
                );
            }
        });
    });

    // Listen for enhanced announcement changes.
    if (readerToggle) {
        readerToggle.addEventListener("change", () => {
            applyReaderSupport(readerToggle.checked);

            announceSetting(
                readerToggle.checked
                    ? "Enhanced announcements enabled."
                    : "Enhanced announcements disabled."
            );
        });
    }

    // Reset all accessibility settings.
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            applyTextSize("normal");
            applyTheme("light");
            applyReaderSupport(false);

            announceSetting("Accessibility settings have been reset.");
        });
    }

    // =========================================
    // 5. PROJECT FILTERS
    // =========================================

    const filterButtons = document.querySelectorAll(
        ".filter-btn, .filter-button"
    );

    const projectCards = document.querySelectorAll(
        ".project-card[data-category]"
    );

    const filterStatus = document.querySelector("#filter-status");
    const emptyState = document.querySelector("#empty-state");

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const filter = button.dataset.filter;
                let visibleCount = 0;

                filterButtons.forEach((item) => {
                    const selected = item === button;

                    item.classList.toggle("active", selected);
                    item.setAttribute("aria-pressed", String(selected));
                });

                projectCards.forEach((card) => {
                    const matches =
                        filter === "all" ||
                        card.dataset.category === filter;

                    card.hidden = !matches;

                    if (matches) {
                        visibleCount++;
                    }
                });

                const message =
                    `Showing ${visibleCount} project` +
                    `${visibleCount === 1 ? "" : "s"}.`;

                if (filterStatus) {
                    filterStatus.textContent = message;
                }

                if (emptyState) {
                    emptyState.hidden = visibleCount !== 0;
                }

                // Also announce filter changes when enhanced
                // announcements are enabled.
                if (
                    document.documentElement.dataset.readerSupport === "true"
                ) {
                    announceSetting(message);
                }
            });
        });
    }

    // =========================================
    // 6. CONTACT FORM VALIDATION
    // =========================================

    const contactForm = document.querySelector("#contact-form");
    const formStatus = document.querySelector("#form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            formStatus.textContent = "";

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();

                formStatus.textContent =
                    "Please correct the highlighted fields and try again.";

                return;
            }

            const nameField = contactForm.querySelector("#name");
            const emailField = contactForm.querySelector("#email");
            const subjectField = contactForm.querySelector("#subject");
            const messageField = contactForm.querySelector("#message");

            const requiredFields = [
                nameField,
                emailField,
                subjectField,
                messageField
            ];

            const incomplete = requiredFields.some((field) => {
                return !field || !field.value.trim();
            });

            if (incomplete) {
                formStatus.textContent =
                    "Please complete all fields before sending.";

                return;
            }

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const subject = subjectField.value.trim();
            const message = messageField.value.trim();

            // Replace this example address with your real email.
            const recipient = "alex@example.com";

            const body =
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                message;

            const mailto =
                "mailto:" + recipient +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            formStatus.textContent =
                "Opening your email application. Send the prepared email to complete your message.";

            window.location.href = mailto;
        });
    }

    // =========================================
    // 7. OPTIONAL IMAGE SLIDESHOW
    // =========================================

    const slideshowImage = document.querySelector("#web-slideshow-image");

    if (slideshowImage) {
        const slides = [
            {
                src: "Assets/images/web1.jpg",
                alt: "Web development project 1"
            },
            {
                src: "Assets/images/web2.jpg",
                alt: "Web development project 2"
            },
            {
                src: "Assets/images/web3.jpg",
                alt: "Web development project 3"
            }
        ];

        let currentSlide = 0;
        let slideshowTimer;

        const preloadedImages = slides.map((slide) => {
            const image = new Image();
            image.src = slide.src;
            return image;
        });

        function showNextSlide() {
            const nextSlide = (currentSlide + 1) % slides.length;
            const nextImage = preloadedImages[nextSlide];

            if (!nextImage.complete || nextImage.naturalWidth === 0) {
                currentSlide = nextSlide;
                slideshowTimer = window.setTimeout(showNextSlide, 3000);
                return;
            }

            slideshowImage.style.opacity = "0";

            window.setTimeout(() => {
                currentSlide = nextSlide;
                slideshowImage.src = slides[currentSlide].src;
                slideshowImage.alt = slides[currentSlide].alt;
                slideshowImage.style.opacity = "1";
            }, 200);

            slideshowTimer = window.setTimeout(showNextSlide, 2200);
        }

        const firstImage = preloadedImages[0];

        if (firstImage.complete && firstImage.naturalWidth > 0) {
            slideshowTimer = window.setTimeout(showNextSlide, 3000);
        } else {
            firstImage.addEventListener(
                "load",
                () => {
                    window.clearTimeout(slideshowTimer);

                    slideshowTimer = window.setTimeout(
                        showNextSlide,
                        3000
                    );
                },
                { once: true }
            );

            firstImage.addEventListener(
                "error",
                () => {
                    console.error(
                        "Could not load slideshow image:",
                        slides[0].src
                    );
                },
                { once: true }
            );
        }

        slides.forEach((slide, index) => {
            preloadedImages[index].addEventListener("error", () => {
                console.error(
                    "Could not load slideshow image:",
                    slide.src
                );
            });
        });
    }
});
