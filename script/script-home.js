// ========== fetch du JSON, 4 projets randoms injectés dans index.html
fetch('../projects.json')
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
      card.innerHTML = `
        <div class="projects-links">
          ${proj.links.demo ? `<button><a href="${proj.links.demo}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></button>` : ''}
          ${proj.links.github? `<button><a href="${proj.links.github}" target="_blank"><i class="fa-brands fa-github"></i></a></button>` : ''}
        </div>
        <div class="projects-img"><img src="${proj.image}" alt="${proj.title}"></div>
        <div class="projects-description">
          <div class="projects-stack">
            ${proj.stack.map(t=>`<p><strong>${t}</strong></p>`).join('')}
          </div>
          <div class="projects-text">
            <p>${proj.description}</p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Erreur chargement projets :', err));