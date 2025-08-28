document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inscripcionForm');
    const statusMessage = document.getElementById('mensaje-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    // ** REEMPLAZA ESTA URL CON LA QUE OBTUVISTE DE GOOGLE APPS SCRIPT **
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyKiali2j_42wl0ytA6J8OuH3m_9vyzqZDuiNPXlCPvFHb11Cp0nQIJuiHl-E4txxhbkQ/exec';
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Muestra mensaje de carga y deshabilita el botón
        statusMessage.textContent = 'Enviando...';
        statusMessage.style.color = '#555';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch(WEB_APP_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa.');
            }
            return response.text();
        })
        .then(result => {
            console.log('Respuesta del servidor:', result);
            statusMessage.textContent = '¡Inscripción enviada con éxito!';
            statusMessage.style.color = 'green';
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessage.textContent = 'Ocurrió un error. Por favor, inténtalo de nuevo.';
            statusMessage.style.color = 'red';
        })
        .finally(() => {
            // Restaura el botón después de 3 segundos
            setTimeout(() => {
                submitBtn.disabled = false;
                statusMessage.textContent = '';
            }, 3000);
        });
    });
});