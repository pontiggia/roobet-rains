// public/js/socket.js
document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Asume que io() está definido globalmente por el script de Socket.IO incluido anteriormente
    const dataDisplayElement = document.getElementById('dataDisplay'); // Selecciona el elemento h1 por su ID

    socket.on('rainData', (data) => {
        console.log('Real-time data:', data);
        dataDisplayElement.textContent = data; // Actualiza el contenido del h1 con los datos recibidos
    });
});