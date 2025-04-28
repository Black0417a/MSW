document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch project data
        const response = await fetch('./json/projects.json');
        if (!response.ok) {
            throw new Error('Failed to fetch project data');
        }
        
        const projects = await response.json();
        const projectContainer = document.getElementById('project-container');
        
        // Create project cards
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.dataset.id = project.id;
            
            const title = document.createElement('h3');
            title.textContent = project.title;
            
            const date = document.createElement('p');
            date.className = 'date';
            date.textContent = project.period;
            
            const list = document.createElement('ul');
            
            // Add first two details as preview
            const previewDetails = project.details.slice(0, 2);
            previewDetails.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                list.appendChild(li);
            });
            
            // Add more link if there are more details
            if (project.details.length > 2) {
                const moreLi = document.createElement('li');
                moreLi.className = 'more-link';
                moreLi.textContent = '查看更多...';
                list.appendChild(moreLi);
            }
            
            projectCard.appendChild(title);
            projectCard.appendChild(date);
            projectCard.appendChild(list);
            
            // Make the card clickable
            projectCard.addEventListener('click', () => {
                window.location.href = `project-detail.html?id=${project.id}`;
            });
            
            // Add hover style
            projectCard.classList.add('clickable');
            
            projectContainer.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        const projectContainer = document.getElementById('project-container');
        projectContainer.innerHTML = '<p class="error-message">加载项目信息失败，请刷新页面重试</p>';
    }
}); 