// ========== toggle les détails
function toggleDetails(row) {
  const details = row.nextElementSibling;
  const expanded = row.classList.contains('expanded');
  document.querySelectorAll('.project-row.expanded').forEach(r => {
    r.classList.remove('expanded');
    r.nextElementSibling.classList.remove('expanded');
  });
  if (!expanded) {
    row.classList.add('expanded');
    details.classList.add('expanded');
  }
}

// ========== fetch et génération du tableau
fetch('../projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projects-list');

    projects.forEach(proj => {
      // ligne principale
      const row = document.createElement('div');
      row.className = 'project-row';
      row.setAttribute('data-category', proj.category.join(' '));
      row.onclick = () => toggleDetails(row);

      row.innerHTML = `
        <div class="project-img">
          <img src="${proj.image}" alt="${proj.title}">
        </div>
        <div class="project-number">${proj.id}</div>
        <div class="project-main">
          <div class="project-title">${proj.title}</div>
          <div class="project-description">${proj.description}</div>
        </div>
        <div class="project-stack">
          ${proj.stack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-status">
          <div class="status-indicator ${proj.status === 'Terminé' ? 'completed' : 'in-progress'}"></div>
          <span>${proj.status}</span>
        </div>
        <div class="project-links">
          ${proj.links.demo ? `<a href="${proj.links.demo}" target="_blank" onclick="event.stopPropagation()"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
          ${proj.links.github ? `<a href="${proj.links.github}" target="_blank" onclick="event.stopPropagation()"><i class="fa-brands fa-github"></i></a>` : ''}
        </div>
      `;

      // détails cachés
      // const detail = document.createElement('div');
      // detail.className = 'project-details';
      // detail.innerHTML = `
      //   <div class="project-details-content">
      //     <h4>Description détaillée</h4>
      //     <p>${proj.details}</p>
      //   </div>
      // `;

      container.appendChild(row);
      // container.appendChild(detail);
    });

    // filtres
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-row').forEach(r => {
        const cat = r.dataset.category.split(' ');
        const visible = (f === 'all' || cat.includes(f));
        r.style.display = visible ? 'grid' : 'none';
        const det = r.nextElementSibling;
        det.style.display = visible && r.classList.contains('expanded') ? 'block' : 'none';
      });
    }));

    // animation d'entrée
    document.querySelectorAll('.project-row').forEach((r, i) => {
      r.style.opacity = '0';
      r.style.transform = 'translateY(20px)';
      r.style.transition = 'all 0.6s ease';
      setTimeout(() => {
        r.style.opacity = '1';
        r.style.transform = 'translateY(0)';
      }, i * 100);
    });
  })
  .catch(e => console.error('Erreur chargement projets :', e));