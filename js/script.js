/* =========================================================
   SL Strategic Systems – script.js
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

// Cerrar menú al hacer click en un enlace
mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

/* ----------------------------------------------------------
   2. HEADER SCROLL (sombra al hacer scroll)
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
            // Una vez visible, deja de observar (mejora rendimiento)
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

animatedEls.forEach(el => observer.observe(el));

/* ----------------------------------------------------------
   4. SMOOTH SCROLL para anclas internas
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
   5. ENVIAR POR WHATSAPP (formulario de contacto)
   ---------------------------------------------------------- */
function enviarWhatsapp() {
    const celular = "51947373693";

    const nombre    = document.getElementById("name").value.trim();
    const correo    = document.getElementById("email").value.trim();
    const negocio   = document.getElementById("negocio").value.trim();
    const servicio  = document.getElementById("servicio").value;
    const telefono  = document.getElementById("tel").value.trim();

    /* Validación */
    if (!nombre || !correo || !telefono) {
        showFormError("Por favor, completa al menos tu nombre, correo y WhatsApp.");
        return;
    }

    /* Armar mensaje */
    const mensaje =
`¡Hola SL Strategic Systems! 👋

Mi nombre es: *${nombre}*
Mi correo es: ${correo}
Mi negocio: ${negocio || "No especificado"}
Servicio de interés: *${servicio || "No especificado"}*
Mi WhatsApp: ${telefono}

Me gustaría agendar una asesoría gratuita. ¡Quedo a la espera!`;

    const urlCodificada = encodeURIComponent(mensaje);
    const urlWhatsapp   = `https://wa.me/${celular}?text=${urlCodificada}`;

    window.open(urlWhatsapp, "_blank");

    /* Limpiar formulario */
    ["name", "email", "negocio", "tel"].forEach(id => {
        document.getElementById(id).value = "";
    });
    document.getElementById("servicio").selectedIndex = 0;

    showFormSuccess("¡Mensaje preparado! Se abrirá WhatsApp para enviarlo 🚀");
}

/* ----------------------------------------------------------
   6. HELPERS: mensajes de validación del form
   ---------------------------------------------------------- */
function showFormError(msg) {
    showToast(msg, 'error');
}

function showFormSuccess(msg) {
    showToast(msg, 'success');
}

function showToast(msg, type = 'success') {
    const existing = document.getElementById('sl-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'sl-toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
        position:      'fixed',
        bottom:        '28px',
        left:          '50%',
        transform:     'translateX(-50%) translateY(20px)',
        background:    type === 'success' ? '#042c53' : '#b91c1c',
        color:         '#fff',
        padding:       '14px 28px',
        borderRadius:  '12px',
        boxShadow:     '0 8px 32px rgba(0,0,0,0.25)',
        fontSize:      '0.92rem',
        fontWeight:    '600',
        zIndex:        '9999',
        opacity:       '0',
        transition:    'all 0.35s ease',
        maxWidth:      '90vw',
        textAlign:     'center',
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