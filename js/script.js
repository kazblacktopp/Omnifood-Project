"use strict";

// DOM element selectors

const year = document.querySelector(".year");
const allLinks = document.querySelectorAll("a:link");
const sectionHeroEl = document.querySelector(".section-hero");

//////////////////////////////////////////////////
// Change copyright date in Footer to current year

const currentYear = new Date().getFullYear();
year.textContent = currentYear;

//////////////////////////////////////////////////
// Create smooth scroll effect for all browsers

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

//////////////////////////////////////////////////
// Create nav menu for mobile devices

const sectionNavEl = document.querySelector(".section-navigation");
const mobileNavBtnEl = document.querySelector(".nav-list-mobile");

mobileNavBtnEl.addEventListener("click", () => {
  sectionNavEl.classList.toggle("nav-open");
  const navIsOpen = sectionNavEl.classList.contains("nav-open");
  if (navIsOpen) {
    document.querySelector(".main-nav-list").addEventListener("click", () => {
      sectionNavEl.classList.remove("nav-open");
    });
  }
});

//////////////////////////////////////////////////
// Create sticky navigation for non-mobile devices

const obs = new IntersectionObserver(
  (entries) => {
    const isIntersecting = entries[0].isIntersecting;

    if (!isIntersecting) document.body.classList.add("js-sticky");

    if (isIntersecting) document.body.classList.remove("js-sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-64px",
  }
);
obs.observe(sectionHeroEl);
