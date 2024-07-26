(function() {
    const checkDevTools = function() {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                debugger; // Se activa el debugger cuando se abren las DevTools
            }
        });
    };
    setInterval(checkDevTools, 1000); // Verifica cada segundo
})();