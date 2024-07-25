document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const dataDisplayElement = document.getElementById('dataDisplay');
    const audio = new Audio('../assets/sounds/alert.mp3');

    const amountCell = document.getElementById('amountCell');
    const balanceCell = document.getElementById('balanceCell');
    const statusCell = document.getElementById('statusCell');
    const creatorCell = document.getElementById('creatorCell');

    socket.on('rainData', (data) => {
        const amount = data.amount.toFixed(2);
        const balance = data.balanceType === 'crypto' ? 'BTC' : data.balanceType;
        const status = data.status;
        const creator = data.creatorName;

        audio.play();

        amountCell.textContent = `$${amount}`;
        balanceCell.textContent = balance;
        statusCell.textContent = status;
        creatorCell.textContent = creator;
    });
});

(function() {
    const devtools = {
        isOpen: false,
        orientation: null
    };
    
    const threshold = 160;

    const emitEvent = (isOpen, orientation) => {
        window.dispatchEvent(new CustomEvent('devtoolschange', {
            detail: {
                isOpen,
                orientation
            }
        }));
    };

    const main = ({emitEvents = true} = {}) => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (!(heightThreshold && widthThreshold) && (
            window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || 
            widthThreshold || 
            heightThreshold
        )) {
            if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
                emitEvent(true, orientation);
            }

            devtools.isOpen = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.isOpen && emitEvents) {
                emitEvent(false, null);
            }

            devtools.isOpen = false;
            devtools.orientation = null;
        }
    };

    main({emitEvents: false});
    setInterval(main, 500);

    window.addEventListener('devtoolschange', event => {
        if (event.detail.isOpen) {
            debugger;
        }
    });
})();
