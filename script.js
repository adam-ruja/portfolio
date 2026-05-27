const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Lazy-load videos below the fold
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      video.querySelectorAll('source').forEach(source => {
        if (source.dataset.src) {
          source.src = source.dataset.src;
        }
      });
      video.load();
      videoObserver.unobserve(video);
    }
  });
}, { rootMargin: '200px' });

document.querySelectorAll('video').forEach((video, i) => {
  if (i === 0) return; // hero-adjacent video loads immediately
  videoObserver.observe(video);
});
