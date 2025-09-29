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