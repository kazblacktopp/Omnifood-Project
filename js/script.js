'use strict';

//////////////////////////////////////////////////
// Change copyright date in Footer to current year

const yearEl = document.querySelector('.year');

const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//////////////////////////////////////////////////
// Animate mobile navigation

const sectionNavEl = document.querySelector('.section-navigation');
const mobileNavBtnEl = document.querySelector('.nav-btn-mobile');

mobileNavBtnEl.addEventListener('click', () => {
  sectionNavEl.classList.toggle('nav-open');
});

//////////////////////////////////////////////////
// Create smooth scroll effect for all browsers

const allLinksEl = document.querySelectorAll('a:link');

allLinksEl.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: 'smooth',
      });
    }

    // Close mobile navigation when link clicked
    if (link.classList.contains('main-nav-link'))
      sectionNavEl.classList.toggle('nav-open');
  });
});

//////////////////////////////////////////////////
// Create sticky navigation for all browsers

const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  entries => {
    const ent = entries[0];
    if (!ent.isIntersecting) document.body.classList.add('js-sticky');
    if (ent.isIntersecting) document.body.classList.remove('js-sticky');
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-64px',
  }
);
obs.observe(sectionHeroEl);

//////////////////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari browser versions

const checkFlexGap = () => {
  // Create flex container with flex gap set
  const flexEl = document.createElement('div');
  flexEl.style.display = 'flex';
  flexEl.style.flexDirection = 'column';
  flexEl.style.gap = '1px';

  // Create two child elements inside the flexEl
  flexEl.appendChild(document.createElement('div'));
  flexEl.appendChild(document.createElement('div'));

  // Append flexEl to DOM IOT read scrollHeight
  document.body.appendChild(flexEl);
  const isSupported = flexEl.scrollHeight === 1;
  flexEl.parentNode.removeChild(flexEl);

  return isSupported;
};

if (!checkFlexGap()) {
  document.body.classList.add('no-flex-gap');
}
