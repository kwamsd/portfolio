function openModal(videoUrl, title) {
  const modal = document.getElementById('video-modal');
  document.getElementById('modal-video').src = videoUrl;
  document.getElementById('modal-title').textContent = title;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const modal = document.getElementById('video-modal');
  document.getElementById('modal-video').pause();
  document.getElementById('modal-video').src = "";
  modal.style.display = 'none';
  document.body.style.overflow = '';
}
document.getElementById('close-modal').onclick = closeModal;
document.getElementById('video-modal').onclick = function (e) {
  if (e.target === this) closeModal();
};
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ========== fetch du JSON, 4 projets randoms injectés dans index.html
fetch('../data/projects.json')
  .then(res => res.json())
  .then(projects => {

    for (let i = projects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [projects[i], projects[j]] = [projects[j], projects[i]];
    }
    const selected = projects.slice(0, 4);
    const container = document.getElementById('home-projects');

    selected.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'projects-card';

      let demoBtn = '';
      if (proj.links.demo && proj.links.demo !== "#") {
        demoBtn = `<button><a href="${proj.links.demo}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></button>`;
      } else if (proj.video) {
        // bouton vidéo
        demoBtn = `<button class="video-btn" data-video="${proj.video}" data-title="${proj.title}"><i class="fa-solid fa-play"></i></button>`;
      }

      card.innerHTML = `
    <div class="projects-links">
      ${demoBtn}
      ${proj.links.github ? `<button><a href="${proj.links.github}" target="_blank"><i class="fa-brands fa-github"></i></a></button>` : ''}
    </div>
    <div class="projects-img"><img src="${proj.image}" alt="${proj.title}"></div>
    <div class="projects-description">
      <div class="projects-stack">
        ${proj.stack.map(t => `<p><strong>${t}</strong></p>`).join('')}
      </div>
      <div class="projects-text">
        <p>${proj.description}</p>
      </div>
    </div>
  `;
      container.appendChild(card);

      const videoBtn = card.querySelector('.video-btn');
      if (videoBtn) {
        videoBtn.onclick = function (e) {
          e.preventDefault();
          openModal(this.getAttribute('data-video'), 'Démonstration du projet : ' + this.getAttribute('data-title'));
        };
      }
    });
  })
  .catch(err => console.error('Erreur chargement projets :', err));