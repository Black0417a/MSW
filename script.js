document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js with enhanced interactivity settings
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            color: {
                value: ["#3b82f6", "#f97316", "#ffffff", "#4ade80"]
            },
            shape: {
                type: ["circle", "triangle", "polygon"],
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 6
                },
                image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.8,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1.5,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1.2,
                shadow: {
                    enable: true,
                    blur: 5,
                    color: "rgba(255,255,255,0.06)"
                }
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true,
                onresize: {
                    enable: true,
                    density_auto: true,
                    density_area: 400
                }
            },
            modes: {
                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.8,
                        color: "#f97316"
                    }
                },
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 0.4,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 6
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true,
        fps_limit: 120
    });

    // Create mouse follower with enhanced effects
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);

    // Create a trail effect for mouse movements
    const createTrailDot = () => {
        const trail = document.createElement('div');
        trail.className = 'mouse-follower';
        trail.style.width = '8px';
        trail.style.height = '8px';
        trail.style.opacity = '0.6';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                trail.remove();
            }, 300);
        }, 100);
        
        return trail;
    };

    // Create a larger ripple effect for mouse clicks with enhanced visuals
    const createRipple = (x, y) => {
        const ripple = document.createElement('div');
        ripple.className = 'mouse-follower';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.opacity = '0.8';
        ripple.style.background = 'radial-gradient(circle, var(--secondary-color) 0%, var(--accent-color) 100%)';
        document.body.appendChild(ripple);

        // Animate the ripple with improved timing
        let scale = 1;
        let opacity = 0.8;
        const animate = () => {
            scale += 0.35;
            opacity -= 0.03;
            ripple.style.transform = `translate(-50%, -50%) scale(${scale})`;
            ripple.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                ripple.remove();
            }
        };
        animate();
    };

    // Mouse movement tracking with enhanced effects
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let speed = 0;
    let lastX = 0;
    let lastY = 0;
    let trailCounter = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Calculate mouse speed for size adjustment
        const dx = mouseX - lastX;
        const dy = mouseY - lastY;
        speed = Math.sqrt(dx * dx + dy * dy) * 0.1;
        
        // Create trail effect at certain intervals
        trailCounter++;
        if (speed > 1 && trailCounter % 4 === 0) {
            const trail = createTrailDot();
            trail.style.left = `${mouseX}px`;
            trail.style.top = `${mouseY}px`;
        }
        
        lastX = mouseX;
        lastY = mouseY;
    });

    document.addEventListener('click', (e) => {
        createRipple(e.clientX, e.clientY);
        
        // Create a burst of particles on click
        const burst = () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const dot = document.createElement('div');
                    dot.className = 'particle-dot';
                    dot.style.left = e.clientX + 'px';
                    dot.style.top = e.clientY + 'px';
                    dot.style.background = getRandomColor();
                    document.body.appendChild(dot);
                    
                    // Random direction
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 2 + Math.random() * 3;
                    const distance = 30 + Math.random() * 50;
                    
                    const destX = e.clientX + Math.cos(angle) * distance;
                    const destY = e.clientY + Math.sin(angle) * distance;
                    
                    // Animate the particle
                    dot.animate([
                        { 
                            transform: 'translate(-50%, -50%) scale(1)',
                            opacity: 0.8
                        },
                        { 
                            transform: `translate(${destX - e.clientX}px, ${destY - e.clientY}px) scale(0)`,
                            opacity: 0
                        }
                    ], {
                        duration: 600 + Math.random() * 400,
                        easing: 'cubic-bezier(0.1, 0.7, 0.1, 1)'
                    }).onfinish = () => dot.remove();
                }, i * 40);
            }
        };
        
        burst();
    });
    
    // Get random color for particle effects
    function getRandomColor() {
        const colors = ['#3b82f6', '#f97316', '#ffffff', '#4ade80'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Animate mouse follower with dynamic effects
    function animate() {
        // Calculate follower position with smoother movement
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        // Adjust size based on mouse speed with smoother transitions
        const targetSize = Math.min(18 + speed * 2.5, 40);
        const currentSize = parseFloat(follower.style.width) || 20;
        const newSize = currentSize + (targetSize - currentSize) * 0.15;
        
        // Update follower position and appearance
        follower.style.transform = `translate(${followerX - newSize/2}px, ${followerY - newSize/2}px)`;
        follower.style.width = newSize + 'px';
        follower.style.height = newSize + 'px';
        
        requestAnimationFrame(animate);
    }

    animate();

    // Add smooth scrolling to all links with improved easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                // Smooth scroll with custom easing
                window.requestAnimationFrame(step);
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const easeInOutCubic = t => t < 0.5 
                        ? 4 * t * t * t 
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic(Math.min(progress / duration, 1)));
                    if (progress < duration) window.requestAnimationFrame(step);
                }
            }
        });
    });

    // Add intersection observer for fade-in animations with improved timing
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, 100);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    // Observe all sections with staggered animation and improved timing
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        section.style.transitionDelay = `${index * 0.12}s`;
        fadeObserver.observe(section);
    });

    // Add fade-in class to elements when they become visible with improved staggered animation
    document.querySelectorAll('.timeline-item, .project-card, .publication-item, .honor-card').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.transitionDelay = `${0.15 + index * 0.08}s`;
        fadeObserver.observe(element);
    });

    // Create enhanced parallax effect for mouse movement
    const createParallaxEffect = () => {
        let previousTime = 0;
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX / window.innerWidth - 0.5;
            targetY = e.clientY / window.innerHeight - 0.5;
        });
        
        // Use requestAnimationFrame for smoother animation
        function updateParallax(time) {
            // Calculate time elapsed between frames
            const elapsed = time - previousTime;
            previousTime = time;
            
            // Smooth lerping
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;
            
            // Apply subtle parallax to sections with smooth animation
            document.querySelectorAll('section, .header').forEach((section) => {
                const depth = parseFloat(section.getAttribute('data-depth') || 0.05);
                const moveX = currentX * depth * 30;
                const moveY = currentY * depth * 30;
                
                section.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
            
            requestAnimationFrame(updateParallax);
        }
        
        requestAnimationFrame(updateParallax);
    };

    // Initialize sections with different depths for parallax
    document.querySelectorAll('section, .header').forEach((section, index) => {
        // Assign varying depths based on section position for more dynamic effect
        const depth = 0.05 - (index * 0.008);
        section.setAttribute('data-depth', depth.toFixed(3));
    });

    // Initialize parallax effect
    createParallaxEffect();

    // 导航栏滚动效果 - Enhanced with smoother transitions
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // 导航栏背景变化 - Smoother transition
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const opacity = Math.min(0.95, 0.85 + scrollPercent * 0.15);
        
        if (window.scrollY > 50) {
            navbar.style.background = `rgba(255, 255, 255, ${opacity})`;
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Dynamic navbar color change for dark theme with smoother transition
        if (document.body.classList.contains('dark-theme')) {
            if (window.scrollY > 50) {
                navbar.style.background = `rgba(15, 23, 42, ${opacity})`;
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        }

        // 更新活动导航链接 with smoother indicator
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // 显示/隐藏返回顶部按钮 with improved animation
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
            setTimeout(() => {
                backToTop.style.transform = 'translateY(0) rotate(360deg)';
            }, 50);
        } else {
            backToTop.style.transform = 'translateY(20px) rotate(0deg)';
            setTimeout(() => {
                backToTop.classList.remove('visible');
            }, 300);
        }
    });

    // 返回顶部功能 with improved animation
    document.querySelector('.back-to-top').addEventListener('click', () => {
        // Create a burst of particles before scrolling
        const backToTopBurst = () => {
            const btn = document.querySelector('.back-to-top');
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const dot = document.createElement('div');
                    dot.className = 'particle-dot';
                    dot.style.left = centerX + 'px';
                    dot.style.top = centerY + 'px';
                    dot.style.background = getRandomColor();
                    document.body.appendChild(dot);
                    
                    // Random direction
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 40 + Math.random() * 60;
                    
                    const destX = centerX + Math.cos(angle) * distance;
                    const destY = centerY + Math.sin(angle) * distance;
                    
                    // Animate the particle
                    dot.animate([
                        { 
                            transform: 'translate(-50%, -50%) scale(1)',
                            opacity: 0.8
                        },
                        { 
                            transform: `translate(${destX - centerX}px, ${destY - centerY}px) scale(0)`,
                            opacity: 0
                        }
                    ], {
                        duration: 700,
                        easing: 'cubic-bezier(0.1, 0.7, 0.1, 1)'
                    }).onfinish = () => dot.remove();
                }, i * 30);
            }
        };
        
        backToTopBurst();
        
        // Smooth scroll to top with custom easing
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();
    });

    // 暗色主题切换 with improved animation
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        // Create a ripple effect from the toggle button
        const toggleRipple = () => {
            const rect = themeToggle.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'theme-ripple';
            ripple.style.position = 'fixed';
            ripple.style.top = '0';
            ripple.style.left = '0';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.backgroundColor = document.body.classList.contains('dark-theme') 
                ? 'rgba(248, 250, 252, 0.03)' 
                : 'rgba(15, 23, 42, 0.03)';
            ripple.style.zIndex = '-1';
            ripple.style.opacity = '0';
            ripple.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.opacity = '1';
                setTimeout(() => {
                    ripple.style.opacity = '0';
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                }, 300);
            }, 10);
        };
        
        toggleRipple();
        
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        
        // Update navbar style based on theme
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }

        // Save theme preference to localStorage
        localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    }

    // Add enhanced hover effects to navigation links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const width = link.offsetWidth;
            const height = link.offsetHeight;
            
            // Create ripple effect on hover
            const ripple = document.createElement('span');
            ripple.className = 'nav-ripple';
            ripple.style.width = width + 'px';
            ripple.style.height = height + 'px';
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .particle-dot {
        position: fixed;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
    }
    
    .back-to-top.visible {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style); 