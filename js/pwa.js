if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Gestion de l'installation de la PWA
let deferredPrompt;
const addBtn = document.createElement('button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'block';
});

// Afficher une notification lors de la mise à jour de l'application
window.addEventListener('appinstalled', (evt) => {
    console.log('Application installée');
});
