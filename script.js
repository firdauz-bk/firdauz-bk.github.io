document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // GitHub projects loader
    const loadGitHubProjects = async () => {
        try {
            // Correct GitHub API URL with your username
            const response = await fetch('https://api.github.com/users/firdauz-bk/repos?sort=updated&per_page=6');
            const projects = await response.json();
            
            const projectsContainer = document.getElementById('github-projects');
            projectsContainer.innerHTML = '';
            
            projects.forEach(project => {
                if (!project.fork && project.description) {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';
                    
                    // Create topics string
                    let topicsHTML = '';
                    if (project.topics && project.topics.length > 0) {
                        topicsHTML = `<div class="project-topics">${
                            project.topics.slice(0, 3).map(topic => 
                                `<span class="topic">${topic}</span>`
                            ).join('')
                        }</div>`;
                    }
                    
                    projectCard.innerHTML = `
                        <div class="project-img">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="project-content">
                            <h3>${project.name}</h3>
                            <p>${project.description || 'No description available'}</p>
                            <div class="project-meta">
                                <span><i class="fas fa-star"></i> ${project.stargazers_count}</span>
                                <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                            </div>
                            ${topicsHTML}
                            <a href="${project.html_url}" target="_blank" class="cta-button" style="margin-top: 1rem; display: inline-block; text-align: center; padding: 0.5rem 1rem; font-size: 0.9rem;">
                                View on GitHub
                            </a>
                        </div>
                    `;
                    
                    projectsContainer.appendChild(projectCard);
                }
            });
        } catch (error) {
            console.error('Error loading GitHub projects:', error);
            document.getElementById('github-projects').innerHTML = `
                <div class="error-message">
                    <p>Failed to load projects. Please check back later.</p>
                </div>
            `;
        }
    };
    
    // Load projects after page load
    setTimeout(loadGitHubProjects, 1000);

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter projects based on data-filter value
            const filter = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                } else {
                    // In a real implementation, you would check project tags
                    // For this demo, we'll show all cards
                    card.style.display = 'flex';
                }
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // In a real implementation, you would send this to your backend
            console.log('Form data:', data);
            
            // Show success message
            contactForm.reset();
            alert('Thank you for your message! I will get back to you soon.');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error sending your message. Please try again.');
        }
    });

    // Active section highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    document.querySelector('footer p').textContent = `© ${currentYear} Firdauz B K. All rights reserved.`;
});