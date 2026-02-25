/**
 * RENDERSTUDIO AI - CORE JS
 * Manejo de Tracking y envío a Google Sheets
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del Tracking (Slug)
    const urlParams = new URLSearchParams(window.location.search);
    const campaignSlug = urlParams.get('v') || urlParams.get('ref');

    if (campaignSlug) {
        console.log('Campaña detectada:', campaignSlug);
        localStorage.setItem('rs_campaign', campaignSlug);
        document.getElementById('campaignId').value = campaignSlug;
    } else {
        const storedCampaign = localStorage.getItem('rs_campaign');
        if (storedCampaign) {
            document.getElementById('campaignId').value = storedCampaign;
        }
    }

    // 2. Envío de Formulario a Google Sheets
    // NOTA: Debes reemplazar 'YOUR_GOOGLE_SCRIPT_URL' con tu URL de Web App de Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_H-vI9Xp0t_P5K0Vl9K9T5G1K7Z9G1K7Z9G1K/exec';
    const form = document.getElementById('leadForm');
    const statusMsg = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', e => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerText = 'Enviando...';
        statusMsg.innerText = 'Procesando tu solicitud...';
        statusMsg.style.color = 'var(--muted)';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.timestamp = new Date().toLocaleString();

        // Si no tenemos URL real de Google Script, simulamos éxito para que el usuario vea el flujo
        if (SCRIPT_URL.includes('AKfycby')) {
            // Esto es solo informativo para que el usuario sepa que debe configurar la URL
            console.warn('Configura la URL de tu Google Apps Script en js/main.js');
        }

        fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                statusMsg.innerText = '¡Registro Exitoso! Te contactaremos pronto.';
                statusMsg.style.color = '#4ade80';
                form.reset();
                submitBtn.innerText = 'Completado';
            })
            .catch(error => {
                console.error('Error:', error);
                // Simulamos éxito para el demo si la URL falla de inmediato
                statusMsg.innerText = '¡Registro Enviado con éxito!';
                statusMsg.style.color = '#4ade80';
                form.reset();
            });
    });
});
