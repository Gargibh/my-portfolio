// Scroll reveal for sections
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Redacted text: click to show a "classified" tooltip instead of the content
  document.querySelectorAll('.redact').forEach(el => {
    el.setAttribute('title', 'ACCESS DENIED — CLASSIFIED');
    el.addEventListener('click', () => {
      el.style.background = '#1a1a1a';
      setTimeout(() => { el.style.background = '#0a0a0a'; }, 350);
    });
  });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Folder tabs: wiggle into place as each one scrolls into view
  const tabs = document.querySelectorAll('.folder-tab');
  if (tabs.length && 'IntersectionObserver' in window && !reduceMotion) {
    const tabObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('wiggle-in');
          tabObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    tabs.forEach(tab => tabObserver.observe(tab));
  } else {
    tabs.forEach(tab => tab.classList.add('wiggle-in'));
  }

  // Mugshot: twist-and-snap into place, then the stamp thuds down a beat later
  const mugFrame = document.querySelector('.mug-frame');
  const stamp = document.querySelector('.stamp');
  if (mugFrame && 'IntersectionObserver' in window && !reduceMotion) {
    const mugObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('photo-in');
          setTimeout(() => {
            if (stamp) stamp.classList.add('stamp-in');
          }, 850);
          mugObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });
    mugObserver.observe(mugFrame);
  } else {
    if (mugFrame) mugFrame.classList.add('photo-in');
    if (stamp) stamp.classList.add('stamp-in');
  }
});


