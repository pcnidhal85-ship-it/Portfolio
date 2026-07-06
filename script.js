/* ==========================================================================
   HIGH-TECH INTERACTION CODE - PC NIDHAL MOHAMMED PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INITIALIZE CANVAS PARTICLES ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 65;
        const connectionDistance = 110;
        let mouse = { x: null, y: null, radius: 150 };

        // Handle canvas resize
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track cursor coordinates
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle Blueprint
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.baseColor = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce at edges
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                // Mouse interaction (repel/attract slightly)
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= dx / distance * force * 0.8;
                        this.y -= dy / distance * force * 0.8;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.baseColor;
                ctx.fill();
            }
        }

        // Build Particle Fleet
        const initParticles = () => {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();

        // Draw Lines Connecting Nodes
        const connectNodes = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < connectionDistance) {
                        // Calculate opacity based on proximity
                        const alpha = (1 - (distance / connectionDistance)) * 0.15;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Render Cycle
        const renderParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw a subtle radial glow overlay at cursor coordinates
            if (mouse.x !== null && mouse.y !== null) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, mouse.radius);
                gradient.addColorStop(0, 'rgba(6, 182, 212, 0.04)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectNodes();
            requestAnimationFrame(renderParticles);
        };
        renderParticles();
        
        // Re-init particles if dimensions change drastically
        window.addEventListener('resize', () => {
            initParticles();
        });
    }

    // --- 2. MOUSE-TRACKING GLOW EFFECTS FOR CARDS ---
    const glowCards = document.querySelectorAll('.tracking-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 3. DYNAMIC STATUS WIDGET METRICS ---
    const cpuVal = document.getElementById('cpu-load-val');
    const cpuBar = document.getElementById('cpu-load-bar');
    const memVal = document.getElementById('mem-load-val');
    const memBar = document.getElementById('mem-load-bar');

    if (cpuVal && cpuBar && memVal && memBar) {
        setInterval(() => {
            // Generate minor fluctuational loads
            const currentCpu = Math.floor(Math.random() * 20) + 8; // 8% to 28%
            const currentMem = Math.floor(Math.random() * 5) + 40;  // 40% to 45%

            cpuVal.textContent = `${currentCpu}%`;
            cpuBar.style.width = `${currentCpu}%`;

            memVal.textContent = `${currentMem}%`;
            memBar.style.width = `${currentMem}%`;
        }, 3000);
    }

    // --- 4. BASH CLI SIMULATOR MODULE ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const terminalBody = document.getElementById('terminal-body');

    // Portfolio data database for CLI
    const coreDatabase = {
        help: `
Available commands:
  <span class="term-highlight">about</span>      - Access PC NIDHAL MOHAMMED bio profile
  <span class="term-highlight">skills</span>     - Output system software matrices
  <span class="term-highlight">projects</span>   - Query deployment database logs
  <span class="term-highlight">contact</span>    - Print communication network links
  <span class="term-highlight">clear</span>     - Flush the terminal workspace
  <span class="term-highlight">system</span>    - Query OS specifications and kernel uptime`,
        
        about: `
<strong>PC NIDHAL MOHAMMED // CORE BIOS</strong>
--------------------------------------------------
Role:       Senior Full-Stack & Creative Systems Lead
Focus:      High-performance UI design, scalable Node/Go pipelines
Philosophy: User interfaces are structural events. Every pixel should react.
Bio:        Operating at the interface layer for 6+ years. Committed to 
            architecting lightning fast systems, optimizing render paths, 
            and containerizing automated continuous cloud integrations.`,
        
        skills: `
<strong>SKILL MATRIX REGISTERED // OPERATIONAL</strong>
--------------------------------------------------
Frontend:   HTML5 / CSS3 / ES6 / TypeScript / React / Next.js
Backend:    Node.js / Express / NestJS / Python / Go (Golang)
Database:   PostgreSQL / MongoDB Clusters / Redis Cache systems
DevOps:     Docker / Kubernetes / Terraform / AWS Ecosystem / CI-CD`,
        
        projects: `
<strong>DEPLOYED SERVICES REGISTERED</strong>
--------------------------------------------------
* AetherEngine Dashboard:  Next.js + Canvas metrics plotter (Active)
* Helios Microservice Mesh: Go + gRPC IoT transmission engine (Live)
* Cybernet Terraform API:  AWS autoscaling hot-swap pipelines (Deployed)`,
        
        contact: `
<strong>COMMS HANDSHAKE PORTALS</strong>
--------------------------------------------------
Secure Stream:  pc.nidhal@example.com
Networking:     linkedin.com/in/pc-nidhal
GitHub Index:   github.com/pc-nidhal`,

        system: `
<strong>NIDHAL KERNEL v2.6.0 SPECIFICATIONS</strong>
--------------------------------------------------
OS Core:    Windows NT (Interfacing via Web Console Interface)
Uptime:     4612 hrs operational
Latency:    1.08ms
Status:     ONLINE // ALL SYSTEMS STABLE`
    };

    if (terminalInput && terminalHistory) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawInput = terminalInput.value.trim();
                const command = rawInput.toLowerCase();
                
                // Construct command echo line
                const echoLine = document.createElement('div');
                echoLine.className = 'terminal-line';
                echoLine.innerHTML = `<span class="terminal-prompt">guest@nidhal_core:~$</span> ${rawInput}`;
                terminalHistory.appendChild(echoLine);

                // Process parser output
                const resultLine = document.createElement('div');
                resultLine.className = 'terminal-line';

                if (command === '') {
                    // Do nothing on empty enter
                } else if (command === 'clear') {
                    terminalHistory.innerHTML = '';
                } else if (command.startsWith('sudo')) {
                    resultLine.innerHTML = `<span class="text-muted">sudo: clearance levels overridden. Access denied: administrative console locked.</span>`;
                    terminalHistory.appendChild(resultLine);
                } else if (coreDatabase[command]) {
                    resultLine.innerHTML = coreDatabase[command].replace(/\n/g, '<br>');
                    terminalHistory.appendChild(resultLine);
                } else {
                    resultLine.innerHTML = `command not found: <span class="term-highlight">${rawInput}</span>. Type <span class="term-highlight">help</span> for assistance.`;
                    terminalHistory.appendChild(resultLine);
                }

                // Clear input field and scroll to bottom
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });

        // Click anywhere in terminal window to focus input field
        const termWindow = document.querySelector('.terminal-window');
        if (termWindow) {
            termWindow.addEventListener('click', () => {
                terminalInput.focus();
            });
        }
    }

    // --- 5. PROJECT TAB FILTERING ---
    const filterButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Apply simple entry fades on filters
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });

    // --- 6. SCROLL OBSERVER REVEAL LOGIC ---
    const animatedElements = document.querySelectorAll('[data-fade-in]');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // If it is the skills section, animate skill filling bars
                if (entry.target.classList.contains('skills-section') || entry.target.querySelector('.skill-fill')) {
                    const fills = entry.target.querySelectorAll('.skill-fill');
                    fills.forEach(fill => {
                        const targetVal = fill.getAttribute('data-target-width');
                        fill.style.width = targetVal;
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => revealObserver.observe(el));
    
    // Fallback: If elements are in view on initial load
    setTimeout(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('appear');
                const fills = el.querySelectorAll('.skill-fill');
                fills.forEach(fill => {
                    fill.style.width = fill.getAttribute('data-target-width');
                });
            }
        });
    }, 300);

    // --- 7. ACTIVE NAVIGATION SPY ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Capture if viewport has scrolled into half the section
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 8. MOBILE HAMBURGER MENU DRAWER ---
    const mobileBtn = document.getElementById('mobile-toggle-btn');
    const navLinksContainer = document.querySelector('.nav');

    if (mobileBtn && navLinksContainer) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksContainer.classList.toggle('open');
            mobileBtn.classList.toggle('active');
        });

        // Close menu drawer when a link is clicked
        const links = navLinksContainer.querySelectorAll('a');
        links.forEach(l => {
            l.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                mobileBtn.classList.remove('active');
            });
        });

        // Close menu drawer if clicking outside the menu
        document.addEventListener('click', (e) => {
            if (!navLinksContainer.contains(e.target) && !mobileBtn.contains(e.target)) {
                navLinksContainer.classList.remove('open');
                mobileBtn.classList.remove('active');
            }
        });
    }

    // --- 9. CONTACT FORM SIMULATOR SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');

            // Basic validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'SYSTEM_ERROR: All data registers must be populated.';
                return;
            }

            // Simulated transmission progress sequence
            formStatus.className = 'form-status';
            formStatus.innerHTML = '<span class="pulse-indicator"></span> Transmit status: ENCRYPTING TRANSLATION PAYLOAD...';
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.disabled = true;

            setTimeout(() => {
                formStatus.innerHTML = '<span class="pulse-indicator"></span> Transmit status: SYNCING WITH CORE SERVICE NODES...';
                
                setTimeout(() => {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'TRANSMISSION COMPLETED SUCCESSFULLY. HANDSHAKE INITIATED.';
                    
                    // Reset inputs
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';
                    submitBtn.disabled = false;
                }, 1500);
            }, 1200);
        });
    }
});
