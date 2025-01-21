$(document).ready(function() {
    // Récupérer les données depuis localStorage
    var drawData = JSON.parse(localStorage.getItem('drawResults'));
    if (!drawData) {
        window.location.href = 'index.html';
        return;
    }

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

    // Nettoyer le localStorage après affichage
    localStorage.removeItem('drawResults');
});
