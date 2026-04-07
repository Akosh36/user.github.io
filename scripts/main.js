const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
  body.classList.add('dark');
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
});

function updateThemeIcon() {
  themeIcon.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
}

// Mouse tracking for article cards
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.article-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

function createCard(item) {
  return `
    <article class="article-card">
      <h4>${item.title}</h4>
      <p>${item.text}</p>
      <a href="${item.link}">${item.linkText}</a>
    </article>
  `;
}

function createTimelineItem(item) {
  return `
    <article class="timeline-item">
      <h4>${item.title}</h4>
      <div class="meta">${item.meta}</div>
      <p>${item.text}</p>
    </article>
  `;
}

function renderSkills(skillGroups) {
  const skillsContainer = document.getElementById('skillsContainer');
  skillsContainer.innerHTML = skillGroups.map((group, index) => `
    <div class="skill-group" style="animation: slideInLeft 0.6s ease-out ${index * 0.1}s both;">
      <h4>${group.category}</h4>
      <div class="skills">
        ${group.skills.map((skill, i) => `<span class="skill" style="transition-delay: ${i * 0.05}s;">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function setupLoadMore(options) {
  const {
    data,
    containerId,
    buttonId,
    step = 5,
    renderItem
  } = options;

  const container = document.getElementById(containerId);
  const button = document.getElementById(buttonId);
  let visibleCount = step;

  function render() {
    const visibleItems = data.slice(0, visibleCount);
    container.innerHTML = visibleItems.map((item, index) => {
      const element = renderItem(item);
      return element.replace('class="', `class="" style="animation: fadeIn 0.5s ease-out ${index * 0.08}s both;" class="`);
    }).join('');
    button.style.display = visibleCount >= data.length ? 'none' : 'inline-block';
  }

  button.addEventListener('click', () => {
    visibleCount += step;
    render();
  });

  render();
}

// Add staggered animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .article-card {
    --mouse-x: 50%;
    --mouse-y: 50%;
  }
`;
document.head.appendChild(style);

setupLoadMore({
  data: completedProjectsData,
  containerId: 'projectList',
  buttonId: 'loadMoreProjects',
  step: 3,
  renderItem: createCard
});

setupLoadMore({
  data: inProgressProjectsData,
  containerId: 'articlePreviewList',
  buttonId: 'loadMorePreviewArticles',
  step: 3,
  renderItem: createCard
});

setupLoadMore({
  data: articlesData,
  containerId: 'mainArticleList',
  buttonId: 'loadMoreMainArticles',
  step: 3,
  renderItem: createCard
});

setupLoadMore({
  data: notesData,
  containerId: 'notesList',
  buttonId: 'loadMoreNotes',
  step: 3,
  renderItem: createCard
});

setupLoadMore({
  data: experienceData,
  containerId: 'experienceList',
  buttonId: 'loadMoreExperience',
  step: 3,
  renderItem: createTimelineItem
});

function init() {
  renderSkills(skillsData);
}

init();

// Add smooth scroll behavior with intersection observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});
