// Load and render projects from JSON

document.addEventListener('DOMContentLoaded', function() {
  const projectsContainer = document.getElementById('projects-container');
  
  if (!projectsContainer) return;

  // Fetch projects data
  fetch('data/projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load projects');
      }
      return response.json();
    })
    .then(data => {
      if (data.projects && data.projects.length > 0) {
        renderProjects(data.projects);
      } else {
        projectsContainer.innerHTML = '<p>No projects available yet.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading projects:', error);
      projectsContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
    });

  function renderProjects(projects) {
    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid';

    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'card';

      const projectName = document.createElement('h3');
      projectName.textContent = project.name;

      const projectDescription = document.createElement('p');
      projectDescription.textContent = project.description;

      const projectLink = document.createElement('a');
      projectLink.href = project.link;
      projectLink.target = '_blank';
      projectLink.rel = 'noopener noreferrer';
      projectLink.textContent = 'View Project →';

      projectCard.appendChild(projectName);
      projectCard.appendChild(projectDescription);
      projectCard.appendChild(projectLink);

      projectsGrid.appendChild(projectCard);
    });

    projectsContainer.appendChild(projectsGrid);
  }
});

