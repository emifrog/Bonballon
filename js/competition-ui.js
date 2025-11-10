// Interface utilisateur pour le mode compétition
(function ($) {
  $(function () {
    // Vérifier que le module de compétition est chargé
    if (!window.BonballonCompetition) {
      console.error("Module BonballonCompetition non chargé");
      return;
    }

    // Initialiser l'affichage
    refreshDisplay();

    // Bouton Export
    $("#export-data").click(function () {
      window.BonballonCompetition.exportData();
    });

    // Bouton Import
    $("#import-data-btn").click(function () {
      $("#import-data-file").click();
    });

    $("#import-data-file").change(function (e) {
      var file = e.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
          if (window.BonballonCompetition.importData(event.target.result)) {
            alert("Données importées avec succès !");
            refreshDisplay();
          } else {
            alert("Erreur lors de l'import des données");
          }
        };
        reader.readAsText(file);
      }
    });

    // Bouton Reset
    $("#reset-competition").click(function () {
      if (window.BonballonCompetition.resetCompetition()) {
        refreshDisplay();
      }
    });

    // Fonction pour rafraîchir l'affichage
    function refreshDisplay() {
      updateStats();
      updateLeaderboard();
      updateMatchesList();
    }

    // Mettre à jour les statistiques globales
    function updateStats() {
      var matches = window.BonballonCompetition.getMatches();
      var teams = window.BonballonCompetition.getAllTeamStats();

      $("#total-matches").text(matches.length);
      $("#total-teams").text(teams.length);

      // Compter les joueurs uniques
      var uniquePlayers = new Set();
      matches.forEach(function (match) {
        match.teams.forEach(function (team) {
          if (team.players) {
            team.players.forEach(function (player) {
              uniquePlayers.add(player.name);
            });
          }
        });
      });
      $("#total-players").text(uniquePlayers.size);
    }

    // Mettre à jour le classement
    function updateLeaderboard() {
      var leaderboard = window.BonballonCompetition.getLeaderboard();
      var tbody = $("#leaderboard-body");
      tbody.empty();

      if (leaderboard.length === 0) {
        tbody.append(
          '<tr><td colspan="6" class="text-center">Aucune donnée de compétition disponible</td></tr>'
        );
        return;
      }

      leaderboard.forEach(function (team, index) {
        var rank = index + 1;
        var ratio =
          team.matchesPlayed > 0
            ? ((team.wins / team.matchesPlayed) * 100).toFixed(1)
            : "0.0";

        var rankClass = "";
        if (rank === 1) rankClass = "rank-1";
        else if (rank === 2) rankClass = "rank-2";
        else if (rank === 3) rankClass = "rank-3";

        var row = $("<tr>").addClass(rankClass);
        row.append($("<td>").text(rank));
        row.append($("<td>").html("<strong>" + team.name + "</strong>"));
        row.append($("<td>").text(team.matchesPlayed));
        row.append($("<td>").text(team.wins));
        row.append($("<td>").text(team.losses));
        row.append($("<td>").text(ratio + "%"));

        tbody.append(row);
      });
    }

    // Mettre à jour la liste des matchs
    function updateMatchesList() {
      var matches = window.BonballonCompetition.getMatches();
      var container = $("#matches-list");
      container.empty();

      if (matches.length === 0) {
        container.append('<p class="text-center">Aucun match enregistré</p>');
        return;
      }

      matches.forEach(function (match) {
        var card = createMatchCard(match);
        container.append(card);
      });
    }

    // Créer une carte de match
    function createMatchCard(match) {
      var card = $('<div class="match-card">');

      // Header
      var header = $('<div class="match-header">');
      var date = new Date(match.date);
      var dateStr = date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      header.append(
        $("<div>").html("<strong>" + match.title + "</strong>")
      );
      header.append(
        $('<div class="match-date">').html(
          '<i class="fa fa-calendar"></i> ' + dateStr
        )
      );
      card.append(header);

      // Équipes
      var teamsDiv = $('<div class="match-teams">');
      match.teams.forEach(function (team) {
        var teamDiv = $('<div class="match-team">');
        if (match.winner && team.name === match.winner) {
          teamDiv.addClass("winner");
        }

        var teamName = $('<div class="match-team-name">').text(team.name);
        if (match.winner && team.name === match.winner) {
          teamName.prepend('<i class="fa fa-trophy" style="color: gold; margin-right: 5px;"></i>');
        }
        teamDiv.append(teamName);

        if (team.players && team.players.length > 0) {
          var playersList = $("<div>").css({
            "font-size": "12px",
            color: "#666",
            "margin-top": "5px",
          });
          playersList.text(
            team.players.map((p) => p.name).join(", ")
          );
          teamDiv.append(playersList);
        }

        if (team.score !== undefined) {
          teamDiv.append(
            $("<div>")
              .css({ "margin-top": "5px", "font-weight": "bold" })
              .html('<i class="fa fa-star"></i> Score: ' + team.score)
          );
        }

        teamsDiv.append(teamDiv);
      });
      card.append(teamsDiv);

      // Actions
      var actions = $('<div class="match-actions">');

      // Bouton pour déclarer un vainqueur
      if (!match.winner) {
        var winnerSelect = $('<select class="form-control" style="display: inline-block; width: auto; margin-right: 10px;">');
        winnerSelect.append('<option value="">Déclarer un vainqueur...</option>');
        match.teams.forEach(function (team) {
          winnerSelect.append(
            '<option value="' + team.name + '">' + team.name + "</option>"
          );
        });

        winnerSelect.change(function () {
          var winner = $(this).val();
          if (winner) {
            window.BonballonCompetition.updateMatchWinner(match.id, winner);
            refreshDisplay();
          }
        });

        actions.append(winnerSelect);
      }

      // Bouton supprimer
      var deleteBtn = $(
        '<button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Supprimer</button>'
      );
      deleteBtn.click(function () {
        if (
          confirm(
            "Êtes-vous sûr de vouloir supprimer ce match ? Cette action est irréversible."
          )
        ) {
          window.BonballonCompetition.deleteMatch(match.id);
          refreshDisplay();
        }
      });
      actions.append(deleteBtn);

      card.append(actions);

      return card;
    }
  });
})(jQuery);
