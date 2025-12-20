// Function to create fireworks (snow burst effect)
function createFireworks() {
    var fireworkCount = 1000;
    var container = document.createElement('div');
    container.className = 'fireworks-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1000';
    document.body.appendChild(container);
    
    for (var i = 0; i < fireworkCount; i++) {
        var firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.position = 'absolute';
        firework.style.width = '4px';
        firework.style.height = '4px';
        firework.style.background = '#e0f2fe';
        firework.style.borderRadius = '50%';
        
        // Random positions
        var startX = Math.random() * window.innerWidth;
        var startY = Math.random() * window.innerHeight;
        firework.style.left = startX + 'px';
        firework.style.top = startY + 'px';
        
        // Random movement
        var dx = (Math.random() - 0.5) * 100;
        var dy = (Math.random() - 0.5) * 100;
        firework.style.setProperty('--dx', dx + 'px');
        firework.style.setProperty('--dy', dy + 'px');
        
        // Animation
        firework.style.animation = 'fireworkBurst 1s ease-out forwards';
        
        container.appendChild(firework);
        
        // Remove after animation
        setTimeout(function() {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1000);
    }
    
    // Remove container after all fireworks
    setTimeout(function() {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    }, 1000);
}

// Function to create snowflakes on winter pages
function createSnowflakes() {
    var snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    document.body.appendChild(snowContainer);
    
    var snowflakeCount = 50;
    
    for (var i = 0; i < snowflakeCount; i++) {
        var snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Random horizontal position
        var leftPos = Math.random() * 100;
        snowflake.style.left = leftPos + '%';
        
        // Random animation duration (5-20 seconds)
        var duration = 5 + Math.random() * 15;
        snowflake.style.animationDuration = duration + 's';
        
        // Random delay (0-10 seconds)
        var delay = Math.random() * 10;
        snowflake.style.animationDelay = delay + 's';
        
        snowContainer.appendChild(snowflake);
    }
}

// Function to animate skill bars
function animateSkillBars() {
    var skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length === 0) return; // not on skills page
    
    // Animate each skill bar with a slight delay
    setTimeout(function() {
        for (var i = 0; i < skillItems.length; i++) {
            var progressBar = skillItems[i].querySelector('.progress');
            if (progressBar) {
                var width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(function(bar, targetWidth) {
                    bar.style.width = targetWidth;
                }, i * 200, progressBar, width); 
            }
        }
    }, 500);
}

// Function to handle downloads
function setupDownloads() {
    var downloadButtons = document.querySelectorAll('a[download]');
    for (var i = 0; i < downloadButtons.length; i++) {
        downloadButtons[i].addEventListener('click', function(e) {

        });
    }
}

// Function to check if we're on a winter page
function isWinterPage() {
    return document.body.classList.contains('winter-theme');
}

function initPage() {
    
    if (isWinterPage()) {
        createSnowflakes();
    }
    
    animateSkillBars(); 
    setupDownloads(); 
    
    // Add active class to current nav link
    var currentPage = window.location.pathname.split('/').pop();
    var navLinks = document.querySelectorAll('.nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        var linkHref = navLinks[i].getAttribute('href');
        if (linkHref === currentPage) {
            navLinks[i].classList.add('active');
        } else {
            navLinks[i].classList.remove('active');
        }
    }
}

// DARK MODE TOGGLE

// Check for saved theme preference or default to 'light'
function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

// Save theme preference to localStorage
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Apply theme to the document
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Toggle between light and dark themes
function toggleTheme() {
    var currentTheme = getTheme();
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    saveTheme(newTheme);
    applyTheme(newTheme);
}

// Initialize theme on page load
function initTheme() {
    var savedTheme = getTheme();
    applyTheme(savedTheme);
    
    // Setup theme toggle button
    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// Run when page loads
window.addEventListener('load', function() {
    initPage();
    initTheme();
});

// Also run when DOM is ready (just in case)
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
});

// Basic error handling
window.addEventListener('error', function(e) {
});

// GitHub API Integration
async function fetchGitHubRepos() {
    const username = 'siridc';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        displayGitHubRepos(repos);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
    }
}

function displayGitHubRepos(repos) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    
    repos.forEach((repo, index) => {
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        const langColor = getLanguageColor(repo.language);
        
        projectCard.innerHTML = `
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                <div class="project-overlay">
                    <h3>${repo.name.replace(/-/g, ' ')}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <div class="repo-stats">
                        <span class="repo-stat">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                            </svg>
                            ${repo.stargazers_count}
                        </span>
                        <span class="repo-stat">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                            </svg>
                            ${repo.forks_count}
                        </span>
                        ${repo.language ? `
                            <span class="repo-language" style="color: ${langColor}">
                                <span class="lang-dot" style="background: ${langColor}"></span>
                                ${repo.language}
                            </span>
                        ` : ''}
                    </div>
                </div>
                <div class="project-placeholder github-repo-card" style="background: linear-gradient(135deg, #191970 0%, #4169E1 25%, #6A5ACD 50%, #9370DB 75%, #E6E6FA 100%)">
                    ${repo.name}
                </div>
            </a>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Java': '#b07219',
        'PHP': '#4F5D95',
        'Dart': '#00B4AB',
        'C++': '#f34b7d',
        'C#': '#178600',
        'TypeScript': '#2b7489',
        'Shell': '#89e051',
        'Vue': '#41b883',
        'React': '#61dafb'
    };
    return colors[language] || '#6A5ACD';
}

const repoStatsStyles = `
.repo-stats {
    display: flex;
    gap: 15px;
    margin-top: 15px;
    font-size: 0.9rem;
    flex-wrap: wrap;
    justify-content: center;
}

.repo-stat {
    display: flex;
    align-items: center;
    gap: 5px;
    color: rgba(255, 255, 255, 0.9);
}

.repo-stat svg {
    width: 16px;
    height: 16px;
}

.repo-language {
    display: flex;
    align-items: center;
    gap: 5px;
}

.lang-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

.project-card {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

/* GitHub repo cards should match Project 3 & 4 colors */
.github-repo-card {
    background: linear-gradient(135deg, #191970 0%, #4169E1 25%, #6A5ACD 50%, #9370DB 75%, #E6E6FA 100%) !important;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

function injectRepoStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = repoStatsStyles;
    document.head.appendChild(styleElement);
}

function initGitHubAPI() {
    if (document.querySelector('.projects-grid')) {
        injectRepoStyles();
        fetchGitHubRepos();
    }
}

var originalLoad = window.onload;
window.onload = function() {
    if (originalLoad) originalLoad();
    initGitHubAPI();
};