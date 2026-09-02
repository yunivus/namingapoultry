/* =========================================================
   NAMINGA POULTRY
   MAIN JAVASCRIPT
========================================================= */

/* =========================================================
   1. SELECT ELEMENTS
========================================================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const navLinks = document.querySelectorAll(".nav-link");

const currentYear = document.getElementById("currentYear");

/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

/* =========================================================
   3. CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mainNav) {
      mainNav.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-label", "Open navigation menu");

      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

/* =========================================================
   4. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {
  if (!mainNav || !menuToggle) {
    return;
  }

  const clickedInsideMenu = mainNav.contains(event.target);

  const clickedMenuButton = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    mainNav.classList.remove("open");

    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.setAttribute("aria-expanded", "false");
  }
});

/* =========================================================
   5. HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {
  if (!header) {
    return;
  }

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();

/* =========================================================
   6. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 150;

  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const linkTarget = link.getAttribute("href");

    if (linkTarget === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();

/* =========================================================
   7. SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;

    const targetPosition = target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,

      behavior: "smooth",
    });
  });
});

/* =========================================================
   8. CURRENT YEAR
========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   9. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
  ".feature-card, " +
    ".product-card, " +
    ".bird-card, " +
    ".why-item, " +
    ".gallery-image, " +
    ".group-card",
);

revealElements.forEach((element) => {
  element.style.opacity = "0";

  element.style.transform = "translateY(25px)";

  element.style.transition = "opacity 0.7s ease, " + "transform 0.7s ease";
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";

        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   10. STAGGER PRODUCT ANIMATION
========================================================= */

const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 100}ms`;
});

/* =========================================================
   11. STAGGER WHY-CHOOSE-US ANIMATION
========================================================= */

const whyItems = document.querySelectorAll(".why-item");

whyItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 100}ms`;
});

/* =========================================================
   12. ESCAPE KEY CLOSES MOBILE MENU
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (mainNav) {
      mainNav.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-label", "Open navigation menu");

      menuToggle.setAttribute("aria-expanded", "false");
    }
  }
});

/* =========================================================
   13. DETECT QUALITY SECTION
========================================================= */

/*
   Your HTML currently has:

   <section class="why-section">

   We need this section to work with:

   #quality

   This automatically adds the ID if it
   hasn't already been added in HTML.
*/

const qualitySection = document.querySelector(".why-section");

if (qualitySection && !qualitySection.id) {
  qualitySection.id = "quality";
}

/* =========================================================
   14. PREVENT BROKEN IMAGE EXPERIENCE
========================================================= */

const images = document.querySelectorAll("img");

images.forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-error");
  });
});

/* =========================================================
   15. PAGE LOADED
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});
