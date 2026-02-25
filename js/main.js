/**
 * RENDERSTUDIO AI - CORE JS
 * Motor de Portafolio Dinámico e Interactividad
 */

// 1. Base de Datos de Proyectos (20 Proyectos)
// 1. Base de Datos de Proyectos Dinámica (Lee del directorio local)
const projectCategories = ["arquitectos", "inmobiliaria", "constructora", "industria", "comercio", "interiorismo"];

const projects = Array.from({ length: 26 }, (_, i) => {
    const id = i + 1;
    return {
        id: id,
        title: `Proyecto Especial ${id}`,
        category: projectCategories[i % projectCategories.length],
        // Generamos rutas locales: intenta cargar render-1.jpg como principal
        images: [
            `img/projects/project-${id}/render-1.jpg`,
            `img/projects/project-${id}/render-2.jpg`,
            `img/projects/project-${id}/render-3.jpg`,
            `img/projects/project-${id}/render-4.jpg`,
            `img/projects/project-${id}/render-5.jpg`,
            `img/projects/project-${id}/render-6.jpg`,
            `img/projects/project-${id}/render-7.jpg`,
            `img/projects/project-${id}/render-8.jpg`,
            `img/projects/project-${id}/render-9.jpg`,
            // Soporte para PNG si el JPG falla (el navegador manejará el error o puedes renombrar)
            `img/projects/project-${id}/render-1.png`
        ],
        desc: "Visualización arquitectónica de alta precisión realizada por RenderStudio AI. Enfoque en materiales, iluminación y atmósfera fotorrealista.",
        videoUrl: null, // Se puede personalizar por proyecto
        panoramaUrl: `img/projects/project-${id}/panorama.jpg`
    };
});

// Nota para el usuario: El sistema buscará 'render-1.jpg' hasta 'render-9.jpg' en cada carpeta.
// Si tus archivos son .png o tienen otros nombres, asegúrate de que coincidan con esta lista.

// 2. Elementos del DOM
const projectsGrid = document.getElementById('projectsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const SCRIPT_URL = ''; // Integración deshabilitada - Solo WhatsApp

let pViewer = null;

// 3. Renderizado de Proyectos
function renderProjects(filter = 'all') {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${p.images[0]}" alt="${p.title}" loading="lazy">
            <div class="project-overlay">
                <span class="tag">${p.category}</span>
                <h3>${p.title}</h3>
            </div>
        `;
        card.onclick = () => openProjectModal(p);
        projectsGrid.appendChild(card);
    });
}

// Función para cambiar el visor principal
function switchViewer(type, content = null) {
    const items = document.querySelectorAll('.viewer-item');
    items.forEach(item => item.classList.remove('active'));

    if (type === 'image') {
        const img = document.getElementById('modalMainImg');
        img.src = content;
        img.classList.add('active');
    } else if (type === 'video') {
        const video = document.getElementById('modalVideoContainer');
        const iframe = document.getElementById('modalVideoFrame');
        iframe.src = content;
        video.classList.add('active');
    } else if (type === '360') {
        const pano = document.getElementById('modal360Container');
        pano.classList.add('active');

        // Inicializar Pannellum si hay URL
        if (pViewer) pViewer.destroy();
        pViewer = pannellum.viewer('panorama', {
            type: "equirectangular",
            panorama: content,
            autoLoad: true,
            compass: false
        });
    }
}

// 4. Lógica de la Modal (Rediseñada Multimedia 1:1 + Retícula 3x3)
function openProjectModal(project) {
    const thumbGrid = document.getElementById('thumbGrid');
    const openQuoteBtn = document.getElementById('openQuoteBtn');

    document.getElementById('modalTitle').innerText = project.title;
    document.getElementById('modalDescription').innerText = project.desc;

    // Reset de visores: Empezar con imagen principal
    switchViewer('image', project.images[0]);

    // Generar Retícula 3x3 (9 espacios)
    thumbGrid.innerHTML = '';
    const totalSlots = 9;

    // Llenar slots 1 al 7 con imágenes
    for (let i = 0; i < 7; i++) {
        const thumbItem = document.createElement('div');
        thumbItem.className = `thumb-item ${i === 0 ? 'active' : ''}`;
        const imgSrc = project.images[i % project.images.length];
        thumbItem.innerHTML = `<img src="${imgSrc}" loading="lazy">`;
        thumbItem.onclick = () => {
            switchViewer('image', imgSrc);
            document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
            thumbItem.classList.add('active');
        };
        thumbGrid.appendChild(thumbItem);
    }

    // Slot 8: VIDEO
    const videoThumb = document.createElement('div');
    videoThumb.className = "thumb-item special-thumb";
    videoThumb.innerHTML = `<i data-lucide="play-circle"></i><span>Video</span>`;
    videoThumb.onclick = () => {
        // Usar video del proyecto o un demo real
        const videoUrl = project.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
        switchViewer('video', videoUrl);
        document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        videoThumb.classList.add('active');
    };
    thumbGrid.appendChild(videoThumb);

    // Slot 9: 360
    const panoThumb = document.createElement('div');
    panoThumb.className = "thumb-item special-thumb";
    panoThumb.innerHTML = `<i data-lucide="aperture"></i><span>360°</span>`;
    panoThumb.onclick = () => {
        // Usar panorama del proyecto o un demo premium de Unsplash
        const panoUrl = project.panoramaUrl || "https://pannellum.org/images/alma.jpg";
        switchViewer('360', panoUrl);
        document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        panoThumb.classList.add('active');
    };
    thumbGrid.appendChild(panoThumb);

    // Re-crear iconos lucide para los nuevos botones
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Configurar el botón de Cotizar
    if (openQuoteBtn) {
        openQuoteBtn.onclick = () => {
            openQuoteModal(project.title);
        };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

if (modalClose) {
    modalClose.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
}

// 5. Lógica de Cotización (Exclusivo WhatsApp)
const quoteModal = document.getElementById('quoteModal');
const quoteClose = document.querySelector('.quote-modal-close');

function openQuoteModal(projectName) {
    document.getElementById('quoteProjectName').innerText = projectName;
    document.getElementById('hiddenProjectName').value = projectName;
    quoteModal.classList.add('active');
}

if (quoteClose) {
    quoteClose.onclick = () => {
        quoteModal.classList.remove('active');
    };
}

// Envío a WhatsApp desde la Modal
document.getElementById('quoteForm').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('quoteUserName').value;
    const phone = document.getElementById('quoteUserPhone').value;
    const email = document.getElementById('quoteUserEmail').value;
    const project = document.getElementById('hiddenProjectName').value;
    const message = document.getElementById('quoteMessage').value;

    if (!name || !phone || !email) {
        alert("Por favor, completa Nombre, Teléfono y Correo.");
        return;
    }

    const text = `Hola RenderStudio AI! 👋\n\n👤 Nombre: ${name}\n📞 Tel: ${phone}\n✉️ Email: ${email}\n\nMe interesa cotizar el proyecto: *${project}*\n💬 Detalles: ${message}`;
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5804246669894?text=${encoded}`;

    window.open(whatsappUrl, '_blank');

    // Feedback visual
    const status = document.getElementById('quoteStatus');
    status.innerText = "Abriendo WhatsApp...";
    status.style.color = "#4ade80";
    setTimeout(() => {
        status.innerText = "";
        quoteModal.classList.remove('active');
    }, 2000);
};

// Cierre de modales global
window.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (e.target === quoteModal) {
        quoteModal.classList.remove('active');
    }
};

// 6. Tracking y Formulario Principal
function initTracking() {
    const urlParams = new URLSearchParams(window.location.search);
    const campaignSlug = urlParams.get('v') || urlParams.get('ref');
    const campaignInput = document.getElementById('campaignId');

    if (campaignSlug) {
        localStorage.setItem('rs_campaign', campaignSlug);
        if (campaignInput) campaignInput.value = campaignSlug;
    } else {
        const stored = localStorage.getItem('rs_campaign');
        if (stored && campaignInput) campaignInput.value = stored;
    }
}

function initContactForm() {
    const form = document.getElementById('leadForm');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const phone = form.querySelector('[name="phone"]').value;

        submitBtn.innerText = 'Abriendo WhatsApp...';

        const text = `Hola RenderStudio AI! 👋\n\n👤 Nombre: ${name}\n📞 Tel: ${phone}\n✉️ Email: ${email}\n\nMe gustaría obtener una consultoría gratuita para mi próximo proyecto de renders.`;
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/5804246669894?text=${encoded}`, '_blank');

        setTimeout(() => {
            submitBtn.innerText = 'Iniciar Consulta por WhatsApp';
            form.reset();
        }, 3000);
    });
}

// 7. Protección de Contenido (Anti-Copia)
function initProtection() {
    // Deshabilitar Clic Derecho en todo el sitio
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Deshabilitar Arrastre de Imágenes
    document.addEventListener('dragstart', e => {
        if (e.target.nodeName === 'IMG') e.preventDefault();
    });

    // Bloquear Teclas de Inspección (F12, Ctrl+Shift+I, Ctrl+U)
    document.onkeydown = function (e) {
        // F12
        if (e.keyCode == 123) return false;
        // Ctrl+Shift+I (Inspeccionar)
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false;
        // Ctrl+Shift+J (Consola)
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) return false;
        // Ctrl+U (Ver Código Fuente)
        if (e.ctrlKey && e.keyCode == 85) return false;
    };
}

// Inicialización General
document.addEventListener('DOMContentLoaded', () => {
    initTracking();
    renderProjects();
    initContactForm();
    initProtection();
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
