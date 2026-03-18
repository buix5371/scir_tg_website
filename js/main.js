// Smooth scrolling for anchor links with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Get header height for offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20; // 20px extra padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active navigation state
            updateActiveNav(targetId);
        }
    });
});

// Update active navigation state
function updateActiveNav(activeId) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current link
    const activeLink = document.querySelector(`.nav a[href="${activeId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Highlight active section on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNav(`#${sectionId}`);
        }
    });
});

// Citation button functionality
document.querySelectorAll('.cite-button').forEach(button => {
    button.addEventListener('click', function() {
        // You can implement actual citation copying functionality here
        alert('Citation copied to clipboard');
    });
});

// Initialize active nav on page load
// Publications expand/collapse functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set 近期新闻 as active by default
    updateActiveNav('#news');
    
    // Publications expand/collapse
    const expandButton = document.getElementById('expandPublications');
    const morePublications = document.getElementById('morePublications');
    const expandText = expandButton.querySelector('.expand-text');
    const expandIcon = expandButton.querySelector('.expand-icon');
    
    expandButton.addEventListener('click', function() {
        if (morePublications.style.display === 'none') {
            // Expand
            morePublications.style.display = 'block';
            expandText.textContent = '收起论文';
            expandIcon.textContent = '▼';
            expandButton.classList.add('expanded');
        } else {
            // Collapse
            morePublications.style.display = 'none';
            expandText.textContent = '查看更多论文';
            expandIcon.textContent = '▼';
            expandButton.classList.remove('expanded');
        }
    });
    
    // Projects expand/collapse
    const expandProjectsButton = document.getElementById('expandProjects');
    const moreProjectItems = document.querySelectorAll('.more-project-item');
    const expandProjectsText = expandProjectsButton.querySelector('.expand-text');
    const expandProjectsIcon = expandProjectsButton.querySelector('.expand-icon');
    
    expandProjectsButton.addEventListener('click', function() {
        const isHidden = moreProjectItems[0].style.display === 'none';
        
        if (isHidden) {
            // Expand
            moreProjectItems.forEach(item => {
                item.style.display = 'block';
            });
            expandProjectsText.textContent = '收起项目';
            expandProjectsIcon.textContent = '▼';
            expandProjectsButton.classList.add('expanded');
        } else {
            // Collapse
            moreProjectItems.forEach(item => {
                item.style.display = 'none';
            });
            expandProjectsText.textContent = '查看更多项目';
            expandProjectsIcon.textContent = '▼';
            expandProjectsButton.classList.remove('expanded');
        }
    });
});