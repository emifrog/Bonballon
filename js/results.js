$(document).ready(function() {
    // Récupérer les données depuis localStorage
    var drawData = JSON.parse(localStorage.getItem('drawResults'));
    if (!drawData) {
        window.location.href = 'index.html';
        return;
    }

    // Sauvegarder dans l'historique
    saveToHistory(drawData);

    // Afficher le titre
    $('#draw-title').text(drawData.title);

    // Fonction pour générer les étoiles
    function generateStars(level) {
        var stars = '';
        for (var i = 0; i < 5; i++) {
            if (i < level) {
                stars += '<i class="fas fa-star filled"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // Afficher les équipes
    var resultsHtml = '';
    drawData.teams.forEach((team, index) => {
        resultsHtml += '<div class="team-result">';
        resultsHtml += '<h3>Équipe ' + (index + 1) + '</h3>';
        resultsHtml += '<ul>';
        team.forEach(player => {
            resultsHtml += '<li><span class="player-name">' + player.name + '</span>';
            if (drawData.isLevelMode) {
                resultsHtml += '<span class="level-stars">' + generateStars(player.level) + '</span>';
            }
            resultsHtml += '</li>';
        });
        resultsHtml += '</ul></div>';
    });

    $('#teams-results').html(resultsHtml);

    // Fonction pour générer le texte du message WhatsApp
    function generateWhatsAppMessage() {
        var message = drawData.title + "\n\n";
        drawData.teams.forEach((team, index) => {
            message += "🏃 Équipe " + (index + 1) + ":\n";
            team.forEach(player => {
                message += "- " + player.name;
                if (drawData.isLevelMode) {
                    // Utiliser des étoiles en emoji pour WhatsApp
                    var stars = "⭐".repeat(player.level);
                    message += " " + stars;
                }
                message += "\n";
            });
            message += "\n";
        });
        message += "Généré avec Bonballon 🎯";
        return encodeURIComponent(message);
    }

    // Gérer le clic sur le bouton de partage WhatsApp
    $('#share-whatsapp').click(function() {
        var message = generateWhatsAppMessage();
        var whatsappUrl = "https://wa.me/?text=" + message;
        window.open(whatsappUrl);
    });

    // Gérer l'export en image
    $('#export-image').click(function() {
        exportAsImage();
    });

    // Gérer l'export en PDF
    $('#export-pdf').click(function() {
        exportAsPDF();
    });

    // Gérer l'accès à l'historique
    $('#view-history').click(function() {
        window.location.href = 'history.html';
    });

    // Nettoyer le localStorage temporaire après affichage
    localStorage.removeItem('drawResults');

    // ========== FONCTIONS D'HISTORIQUE ==========
    
    function saveToHistory(data) {
        // Ajouter un timestamp et un ID unique
        var historyItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            title: data.title,
            teams: data.teams,
            isLevelMode: data.isLevelMode
        };

        // Récupérer l'historique existant
        var history = JSON.parse(localStorage.getItem('drawHistory')) || [];
        
        // Ajouter le nouveau tirage au début
        history.unshift(historyItem);
        
        // Limiter à 50 tirages maximum
        if (history.length > 50) {
            history = history.slice(0, 50);
        }
        
        // Sauvegarder
        localStorage.setItem('drawHistory', JSON.stringify(history));
    }

    // ========== FONCTIONS D'EXPORT ==========
    
    function exportAsImage() {
        // Utiliser html2canvas pour capturer le contenu
        var element = document.getElementById('teams-results');
        
        // Créer un conteneur temporaire avec le titre
        var exportContainer = document.createElement('div');
        exportContainer.style.padding = '20px';
        exportContainer.style.backgroundColor = 'white';
        exportContainer.style.fontFamily = 'Open Sans, sans-serif';
        
        var titleElement = document.createElement('h1');
        titleElement.textContent = drawData.title;
        titleElement.style.textAlign = 'center';
        titleElement.style.marginBottom = '20px';
        titleElement.style.color = '#23468C';
        
        exportContainer.appendChild(titleElement);
        exportContainer.appendChild(element.cloneNode(true));
        
        // Ajouter temporairement au DOM
        document.body.appendChild(exportContainer);
        
        // Vérifier si html2canvas est disponible
        if (typeof html2canvas === 'undefined') {
            alert('La bibliothèque html2canvas n\'est pas chargée. Veuillez réessayer.');
            document.body.removeChild(exportContainer);
            return;
        }
        
        html2canvas(exportContainer, {
            backgroundColor: '#ffffff',
            scale: 2
        }).then(function(canvas) {
            // Convertir en image
            var link = document.createElement('a');
            link.download = 'bonballon-' + drawData.title.replace(/\s+/g, '-').toLowerCase() + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Nettoyer
            document.body.removeChild(exportContainer);
        }).catch(function(error) {
            console.error('Erreur lors de l\'export:', error);
            alert('Erreur lors de l\'export de l\'image');
            document.body.removeChild(exportContainer);
        });
    }
    
    function exportAsPDF() {
        // Vérifier si jsPDF est disponible
        if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
            alert('La bibliothèque jsPDF n\'est pas chargée. Veuillez réessayer.');
            return;
        }
        
        var element = document.getElementById('teams-results');
        
        // Créer un conteneur temporaire
        var exportContainer = document.createElement('div');
        exportContainer.style.padding = '20px';
        exportContainer.style.backgroundColor = 'white';
        exportContainer.style.fontFamily = 'Open Sans, sans-serif';
        
        var titleElement = document.createElement('h1');
        titleElement.textContent = drawData.title;
        titleElement.style.textAlign = 'center';
        titleElement.style.marginBottom = '20px';
        titleElement.style.color = '#23468C';
        
        exportContainer.appendChild(titleElement);
        exportContainer.appendChild(element.cloneNode(true));
        
        document.body.appendChild(exportContainer);
        
        if (typeof html2canvas === 'undefined') {
            alert('La bibliothèque html2canvas n\'est pas chargée. Veuillez réessayer.');
            document.body.removeChild(exportContainer);
            return;
        }
        
        html2canvas(exportContainer, {
            backgroundColor: '#ffffff',
            scale: 2
        }).then(function(canvas) {
            var imgData = canvas.toDataURL('image/png');
            
            // Utiliser jsPDF
            var { jsPDF } = window.jspdf;
            var pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            var imgWidth = 190;
            var pageHeight = 277;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;
            var heightLeft = imgHeight;
            var position = 10;
            
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            pdf.save('bonballon-' + drawData.title.replace(/\s+/g, '-').toLowerCase() + '.pdf');
            
            // Nettoyer
            document.body.removeChild(exportContainer);
        }).catch(function(error) {
            console.error('Erreur lors de l\'export:', error);
            alert('Erreur lors de l\'export du PDF');
            document.body.removeChild(exportContainer);
        });
    }
});
