document.addEventListener('DOMContentLoaded', async () => {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
        window.location.href = 'index.html#projects';
        return;
    }
    
    try {
        // Fetch project data
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error('Failed to fetch project data');
        }
        
        const projects = await response.json();
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            window.location.href = 'index.html#projects';
            return;
        }
        
        // Update page title
        document.title = `${project.title} - 梅少伟`;
        
        // Fill project details
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-period-text').textContent = project.period;
        document.getElementById('company-name').textContent = project.company;
        document.getElementById('client-name').textContent = project.client;
        document.getElementById('project-description').textContent = project.description;
        document.getElementById('project-responsibilities').textContent = project.responsibilities;
        
        // Fill project details list
        const detailsList = document.getElementById('project-details');
        project.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsList.appendChild(li);
        });
        
        // Fill project achievements list
        const achievementsList = document.getElementById('project-achievements');
        project.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });
        
        // Fill technology tags
        const techTags = document.getElementById('technology-tags');
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techTags.appendChild(tag);
        });
        
        // Initialize particles background
        if (window.particlesJS) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#3498db' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: '#3498db', opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
                },
                retina_detect: true
            });
        }
        
        // Add scroll animations to elements
        addAnimationToElements();
        
    } catch (error) {
        console.error('Error loading project details:', error);
        alert('无法加载项目详情，请稍后再试');
    }
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Add scroll reveal animations to elements
function addAnimationToElements() {
    const animateElements = () => {
        const elements = document.querySelectorAll('.content-card, .sidebar-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    animateElements();
    
    // Check on scroll
    window.addEventListener('scroll', animateElements);
} 