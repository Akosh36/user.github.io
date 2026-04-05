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
  skillsContainer.innerHTML = skillGroups.map(group => `
        <div class="skill-group">
          <h4>${group.category}</h4>
          <div class="skills">
            ${group.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
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
    container.innerHTML = visibleItems.map(renderItem).join('');
    button.style.display = visibleCount >= data.length ? 'none' : 'inline-block';
  }

  button.addEventListener('click', () => {
    visibleCount += step;
    render();
  });

  render();
}

setupLoadMore({
  data: projectsData,
  containerId: 'projectList',
  buttonId: 'loadMoreProjects',
  step: 5,
  renderItem: createCard
});

setupLoadMore({
  data: articlesData,
  containerId: 'articlePreviewList',
  buttonId: 'loadMorePreviewArticles',
  step: 5,
  renderItem: createCard
});

setupLoadMore({
  data: articlesData,
  containerId: 'mainArticleList',
  buttonId: 'loadMoreMainArticles',
  step: 5,
  renderItem: createCard
});

setupLoadMore({
  data: notesData,
  containerId: 'notesList',
  buttonId: 'loadMoreNotes',
  step: 5,
  renderItem: createCard
});

setupLoadMore({
  data: experienceData,
  containerId: 'experienceList',
  buttonId: 'loadMoreExperience',
  step: 5,
  renderItem: createTimelineItem
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTab = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(selectedTab).classList.add('active');
  });
});

function init() {
  renderSkills(skillsData);
}

init();
