$(document).ready(function() {
    // Récupérer l'historique depuis localStorage
    var history = JSON.parse(localStorage.getItem('drawHistory')) || [];
    
    if (history.length === 0) {
        $('#no-history').show();
        $('#clear-history').hide();
        return;
    }
    
    // Fonction pour formater la date
    function formatDate(isoString) {
        var date = new Date(isoString);
        var options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return date.toLocaleDateString('fr-FR', options);
    }
    
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
    
    // Afficher l'historique
    var historyHtml = '';
    
    history.forEach(function(item, index) {
        historyHtml += '<div class="history-item panel panel-default" data-id="' + item.id + '">';
        historyHtml += '<div class="panel-heading">';
        historyHtml += '<h3 class="panel-title">';
        historyHtml += '<i class="fa fa-futbol-o"></i> ' + item.title;
        historyHtml += '<span class="pull-right text-muted" style="font-size: 12px;">' + formatDate(item.timestamp) + '</span>';
        historyHtml += '</h3>';
        historyHtml += '</div>';
        historyHtml += '<div class="panel-body">';
        
        // Afficher les équipes
        historyHtml += '<div class="row">';
        item.teams.forEach(function(team, teamIndex) {
            historyHtml += '<div class="col-md-' + (12 / Math.min(item.teams.length, 3)) + ' margin-bottom-10">';
            historyHtml += '<div class="team-history">';
            historyHtml += '<h4><i class="fa fa-users"></i> Équipe ' + (teamIndex + 1) + '</h4>';
            historyHtml += '<ul class="list-unstyled">';
            team.forEach(function(player) {
                historyHtml += '<li>';
                historyHtml += '<i class="fa fa-user"></i> ' + player.name;
                if (item.isLevelMode) {
                    historyHtml += ' <span class="level-stars">' + generateStars(player.level) + '</span>';
                }
                historyHtml += '</li>';
            });
            historyHtml += '</ul>';
            historyHtml += '</div>';
            historyHtml += '</div>';
        });
        historyHtml += '</div>';
        
        // Boutons d'action
        historyHtml += '<div class="text-right margin-top-10">';
        historyHtml += '<button class="btn btn-sm btn-info view-details" data-index="' + index + '">';
        historyHtml += '<i class="fa fa-eye"></i> Voir détails';
        historyHtml += '</button> ';
        historyHtml += '<button class="btn btn-sm btn-danger delete-item" data-id="' + item.id + '">';
        historyHtml += '<i class="fa fa-trash"></i> Supprimer';
        historyHtml += '</button>';
        historyHtml += '</div>';
        
        historyHtml += '</div>';
        historyHtml += '</div>';
    });
    
    $('#history-container').html(historyHtml);
    
    // Gérer le clic sur "Voir détails"
    $('.view-details').click(function() {
        var index = $(this).data('index');
        var item = history[index];
        
        // Sauvegarder dans localStorage temporaire
        localStorage.setItem('drawResults', JSON.stringify({
            title: item.title,
            teams: item.teams,
            isLevelMode: item.isLevelMode
        }));
        
        // Rediriger vers la page de résultats
        window.location.href = 'results.html';
    });
    
    // Gérer la suppression d'un élément
    $('.delete-item').click(function() {
        var id = $(this).data('id');
        
        if (confirm('Êtes-vous sûr de vouloir supprimer ce tirage ?')) {
            // Filtrer l'historique
            history = history.filter(function(item) {
                return item.id !== id;
            });
            
            // Sauvegarder
            localStorage.setItem('drawHistory', JSON.stringify(history));
            
            // Recharger la page
            location.reload();
        }
    });
    
    // Gérer l'effacement complet de l'historique
    $('#clear-history').click(function() {
        if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ? Cette action est irréversible.')) {
            localStorage.removeItem('drawHistory');
            location.reload();
        }
    });
});
