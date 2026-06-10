/* =========================================================
   Sebastian Dev – Portfolio script.js
   ========================================================= */

/* ----------------------------------------------------------
   1. HAMBURGER MENU (MÓVIL)
   ---------------------------------------------------------- */
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav    = document.getElementById('mobile-nav');
const mobileLinks  = document.querySelectorAll('.mobile-link, .mobile-cta');

function toggleMenu(open) {
    hamburgerBtn.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    hamburgerBtn.setAttribute('aria-expanded', open);
}

hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    toggleMenu(!isOpen);
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

/* ----------------------------------------------------------
   2. HEADER SCROLL
   ---------------------------------------------------------- */
const siteHeader = document.getElementById('header');

window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ----------------------------------------------------------
   3. SCROLL ANIMATIONS (Intersection Observer)
   ---------------------------------------------------------- */
const animatedEls = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

animatedEls.forEach(el => observer.observe(el));

/* ----------------------------------------------------------
   4. SMOOTH SCROLL
   ---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const headerOffset = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--header-height')) || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ----------------------------------------------------------
   5. PROJECTS FILTER
   ---------------------------------------------------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Actualizar botón activo
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach((card, i) => {
            const category = card.dataset.category;
            const match = filter === 'all' || category === filter;

            if (match) {
                card.classList.remove('hidden');
                // Re-animar al aparecer
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 60);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ----------------------------------------------------------
   6. ENVIAR POR WHATSAPP (formulario de contacto)
   ---------------------------------------------------------- */
function enviarWhatsapp() {
    const celular = "51947373693";

    const nombre   = document.getElementById("name").value.trim();
    const correo   = document.getElementById("email").value.trim();
    const empresa  = document.getElementById("empresa").value.trim();
    const servicio = document.getElementById("servicio").value;
    const telefono = document.getElementById("tel").value.trim();

    /* Validación */
    if (!nombre || !correo || !telefono) {
        showToast("Por favor, completa tu nombre, correo y WhatsApp.", 'error');
        return;
    }

    /* Armar mensaje */
    const mensaje =
`¡Hola Sebastian! 👋 Vi tu portafolio y me interesa trabajar contigo.

👤 Nombre: *${nombre}*
📧 Email: ${correo}
🏢 Empresa: ${empresa || "No especificada"}
🔧 Servicio: *${servicio || "No especificado"}*
📱 WhatsApp: ${telefono}

Me gustaría hablar sobre mi proyecto. ¡Quedo a la espera!`;

    const urlCodificada = encodeURIComponent(mensaje);
    const urlWhatsapp   = `https://wa.me/${celular}?text=${urlCodificada}`;

    window.open(urlWhatsapp, "_blank");

    /* Limpiar formulario */
    ["name", "email", "empresa", "tel"].forEach(id => {
        document.getElementById(id).value = "";
    });
    document.getElementById("servicio").selectedIndex = 0;

    showToast("¡Mensaje listo! Abriendo WhatsApp 🚀", 'success');
}

/* ----------------------------------------------------------
   7. TOAST NOTIFICATIONS
   ---------------------------------------------------------- */
function showToast(msg, type = 'success') {
    const existing = document.getElementById('dev-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'dev-toast';
    toast.textContent = msg;

    const isSuccess = type === 'success';

    Object.assign(toast.style, {
        position:     'fixed',
        bottom:       '28px',
        left:         '50%',
        transform:    'translateX(-50%) translateY(20px)',
        background:   isSuccess
            ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
            : 'linear-gradient(135deg, #ef4444, #dc2626)',
        color:        '#fff',
        padding:      '14px 28px',
        borderRadius: '12px',
        boxShadow:    isSuccess
            ? '0 8px 32px rgba(99,102,241,0.4)'
            : '0 8px 32px rgba(239,68,68,0.4)',
        fontSize:     '0.92rem',
        fontWeight:   '600',
        zIndex:       '9999',
        opacity:      '0',
        transition:   'all 0.35s ease',
        maxWidth:     '90vw',
        textAlign:    'center',
        fontFamily:   "'Inter', sans-serif",
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 350);
    }, 4000);
}

/* ----------------------------------------------------------
   8. ACTIVE NAV LINK (basado en scroll)
   ---------------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.desktop-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
}, { passive: true });

/* Estilos para nav activo */
const navStyle = document.createElement('style');
navStyle.textContent = `
    .desktop-nav a.active-nav {
        color: var(--accent-2) !important;
    }
    .desktop-nav a.active-nav::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);