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