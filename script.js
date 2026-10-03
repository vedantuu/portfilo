/**
 * Portfolio Main Script
 * Vedant Unadkat
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Animation
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Initialize AOS after loader disappears
                if (typeof AOS !== 'undefined') {
                    AOS.init({
                        duration: 800,
                        easing: 'ease-out-cubic',
                        once: true,
                        offset: 50,
                        disable: 'mobile' // Disable on mobile if performance is an issue, but usually fine
                    });
                }
            }, 500);
        }, 1500); // Fake loading time for effect
    }

    // 2. Typewriter Effect
    const typeWriterElement = document.getElementById('typewriter');
    if (typeWriterElement) {
        const roles = ['Web Developer', 'Python Programmer', 'Cyber Security Enthusiast', 'Problem Solver'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 2000); // Start typing after load
    }

    // 3. Navbar Sticky & Active State
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    });

    // 4. Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 5. Mouse Follow Glow (Only on desktop)
    const glow = document.querySelector('.mouse-glow');
    if (glow && window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.addEventListener('mousemove', (e) => {
            glow.style.opacity = '1';
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    }

    // 6. Project Data & Modal Logic
    const projectData = {
        'active-enterprise': {
            title: 'Active Enterprise Website',
            desc: 'A modern, responsive business website designed and developed for Active Enterprise, a supplier of fabrication materials and industrial hardware located in Rajkot, Gujarat. The site showcases their product catalog and services.',
            role: 'Full Stack Developer',
            status: 'Completed',
            tags: ['HTML', 'CSS', 'JavaScript', 'Django', 'Python'],
            features: [
                'Product categories management',
                'Fully responsive modern UI',
                'Contact functionality',
                'Industrial theme design'
            ]
        },
        'file-integrity': {
            title: 'File Integrity Checker',
            desc: 'A Python-based Cyber Security project that monitors and checks file integrity. It uses advanced hashing concepts to detect unauthorized changes to critical files and alerts the user via a terminal interface.',
            role: 'Developer / Student',
            status: 'Completed (Academic)',
            tags: ['Python', 'SHA-256', 'Cyber Security', 'Terminal'],
            features: [
                'Baseline hash generation',
                'Continuous integrity monitoring',
                'Alerts on file modification',
                'Terminal-based UI'
            ]
        },
        'lost-found': {
            title: 'Campus Lost & Found',
            desc: 'A college-oriented project concept designed to help students easily manage and find lost and found items on campus, bridging the communication gap between students and administration.',
            role: 'Developer / Designer',
            status: 'Concept / In Progress',
            tags: ['Web Technologies', 'Database', 'UI/UX'],
            features: [
                'Item reporting (Lost or Found)',
                'Search and filter functionality',
                'User authentication',
                'Image upload placeholder'
            ]
        },
        'asp-net': {
            title: 'ASP.NET Tiny Project',
            desc: 'A practical college project built to explore the Microsoft ecosystem. This project demonstrates understanding of the ASP.NET framework, C# backend logic, and basic web forms/MVC concepts.',
            role: 'Student Developer',
            status: 'Completed (Academic)',
            tags: ['ASP.NET', 'C#', 'Visual Studio'],
            features: [
                'Basic routing and views',
                'Form handling',
                'State management concepts'
            ]
        },
        'forensics': {
            title: 'Digital Forensics Study',
            desc: 'A collection of practical academic work covering digital investigation concepts, specifically focusing on Linux forensics, file integrity fundamentals, and security analysis tools.',
            role: 'Cyber Security Student',
            status: 'Ongoing Learning',
            tags: ['Linux', 'Forensics', 'Security Analysis'],
            features: [
                'Linux file system analysis',
                'Evidence preservation concepts',
                'Security fundamentals research'
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const projectBtns = document.querySelectorAll('.view-project-btn');

    if (modal && modalClose && projectBtns) {
        
        projectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                const data = projectData[projectId];
                
                if (data) {
                    // Populate Modal
                    document.getElementById('modal-title').textContent = data.title;
                    document.getElementById('modal-desc').textContent = data.desc;
                    document.getElementById('modal-role').textContent = data.role;
                    document.getElementById('modal-status').textContent = data.status;
                    
                    // Populate Tags
                    const tagsContainer = document.getElementById('modal-tags');
                    tagsContainer.innerHTML = '';
                    data.tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.textContent = tag;
                        tagsContainer.appendChild(span);
                    });
                    
                    // Populate Features
                    const featuresList = document.getElementById('modal-features');
                    featuresList.innerHTML = '';
                    data.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        featuresList.appendChild(li);
                    });
                    
                    // Show Modal
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        // Close Modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close Modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close Modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
