/* ========== Typed-text */
const texts = [
    "Fan de data sportive",
    "Passionné par le front-end",
    "Toujours en quête de défis"
];

const typingSpeed = 40;
const erasingSpeed = 50;
const newTextDelay = 1500;

let textIndex = 0;
let charIndex = 0;
let typedTextEl;


/* ========== fonctions de l’animation de texte */
function type() {
    if (charIndex < texts[textIndex].length) {
        typedTextEl.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextEl.textContent =
            texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingSpeed);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, typingSpeed + 500);
    }
}


/* ========== DOM */
document.addEventListener("DOMContentLoaded", () => {
    /* -- typed text -- */
    typedTextEl = document.getElementById("typed-text");
    if (texts.length) setTimeout(type, newTextDelay);


    function updateMachineTime() {
        const now = new Date();
        const h = now.getHours().toString().padStart(2, "0");
        const m = now.getMinutes().toString().padStart(2, "0");
        document.getElementById("hour-footer").textContent = `${h}:${m}`;
    }
    setInterval(updateMachineTime, 1000);
    updateMachineTime();
});


/* ========== scroll active */
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.left-side-nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


const slides = document.querySelector('.projects-slide');
const cubes = document.querySelectorAll('.pagination-cube');
const cardWidth = 380;

cubes.forEach((cube, index) => {
    cube.addEventListener('click', () => {
        slides.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });

        cubes.forEach(c => c.classList.remove('active'));
        cube.classList.add('active');
    });
});


// ========== animation stickman
const greenButton = document.querySelector('.green-button-footer');
const worldPopup = document.querySelector('.world-popup');

greenButton.addEventListener('mouseenter', () => {
    worldPopup.style.display = 'block';
});

greenButton.addEventListener('mouseleave', () => {
    setTimeout(() => {
        worldPopup.style.display = 'none';
    }, 300);
});

worldPopup.addEventListener('mouseenter', () => {
    worldPopup.style.display = 'block';
});

worldPopup.addEventListener('mouseleave', () => {
    worldPopup.style.display = 'none';
});

//M.A.J année
document.getElementById('year').textContent = new Date().getFullYear();


//parallax
window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    document.documentElement.style.setProperty('--x', x);
    document.documentElement.style.setProperty('--y', y);
});

//section skills
let skills = {};
let categoryIntros = {};

// Charger les JSON externes avant l'initialisation
Promise.all([
    fetch('../data/skills.json').then(res => res.json()),
    fetch('../data/categoryIntros.json').then(res => res.json())
]).then(([skillsData, introsData]) => {
    skills = skillsData.skills;
    categoryIntros = introsData;
    initSkillSimulator();
});

function initSkillSimulator() {
    const defaultMessage = document.getElementById('defaultMessage');
    const categoryIntro = document.getElementById('categoryIntro');
    const skillsGrid = document.getElementById('skillsGrid');
    const categoryBtns = document.querySelectorAll('.category-btn');

    function showCategory(category) {
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        defaultMessage.style.display = 'none';

        const intro = categoryIntros[category];
        categoryIntro.innerHTML = `
      <h3>${intro.title}</h3>
      <p>${intro.description}</p>
    `;
        categoryIntro.classList.add('active');

        skillsGrid.innerHTML = '';
        skills[category].forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
        <div class="skill-icon"><i class="${skill.icon}"></i></div>
        <div class="skill-name">${skill.name}</div>
      `;
            skillsGrid.appendChild(card);
        });

        setTimeout(() => skillsGrid.classList.add('active'), 200);
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            const category = e.target.dataset.category;
            categoryIntro.classList.remove('active');
            skillsGrid.classList.remove('active');
            setTimeout(() => showCategory(category), 100);
        });
    });
}

document.querySelectorAll('.lift').forEach(el => {
    const chars = el.textContent.split('');
    el.innerHTML = chars.map(char => {
        const safeChar = char === ' ' ? '&nbsp;' : char;
        return `<span class="letter">${safeChar}</span>`;
    }).join('');
});