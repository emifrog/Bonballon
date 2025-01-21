// Vérifier si le service worker est supporté
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        registerServiceWorker();
        handleInstallPrompt();
    });
}

// Enregistrement du service worker
async function registerServiceWorker() {
    try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('ServiceWorker enregistré avec succès:', registration.scope);

        // Vérifier les mises à jour
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showUpdateNotification();
                }
            });
        });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du ServiceWorker:', error);
    }
}

// Gérer l'installation de la PWA
let deferredPrompt;
function handleInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        hideInstallButton();
        showInstalledMessage();
    });
}

// Afficher le bouton d'installation
function showInstallButton() {
    const installButton = document.createElement('button');
    installButton.id = 'installButton';
    installButton.classList.add('install-button');
    installButton.innerHTML = '<i class="fa fa-download"></i> Installer l\'application';
    
    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            try {
                const result = await deferredPrompt.prompt();
                console.log('Résultat de l\'installation:', result);
                deferredPrompt = null;
                hideInstallButton();
            } catch (error) {
                console.error('Erreur lors de l\'installation:', error);
            }
        }
    });

    // Ajouter le bouton au header
    const header = document.querySelector('header');
    if (header) {
        const container = header.querySelector('.container');
        if (container) {
            container.appendChild(installButton);
        }
    }
}

// Cacher le bouton d'installation
function hideInstallButton() {
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.remove();
    }
}

// Afficher un message de confirmation d'installation
function showInstalledMessage() {
    const message = document.createElement('div');
    message.classList.add('installed-message');
    message.textContent = 'Application installée avec succès !';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Afficher une notification de mise à jour
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.classList.add('update-notification');
    notification.innerHTML = `
        <p>Une nouvelle version est disponible !</p>
        <button onclick="updateApp()">Mettre à jour</button>
    `;
    document.body.appendChild(notification);
}

// Mettre à jour l'application
function updateApp() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then((registration) => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage('skipWaiting');
            }
        });
    }
    window.location.reload();
}

// Vérifier la connexion internet
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
    const status = navigator.onLine;
    const body = document.body;
    
    if (!status) {
        body.classList.add('offline');
        showOfflineMessage();
    } else {
        body.classList.remove('offline');
        hideOfflineMessage();
    }
}

// Afficher un message hors ligne
function showOfflineMessage() {
    const message = document.createElement('div');
    message.id = 'offlineMessage';
    message.classList.add('offline-message');
    message.innerHTML = '<i class="fa fa-wifi"></i> Vous êtes hors ligne';
    document.body.appendChild(message);
}

// Cacher le message hors ligne
function hideOfflineMessage() {
    const message = document.getElementById('offlineMessage');
    if (message) {
        message.remove();
    }
}
