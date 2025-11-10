// Gestion des statistiques et graphiques pour Bonballon
(function ($) {
  var drawData = null;
  var levelsChart = null;
  var distributionChart = null;

  // Initialiser les statistiques
  var init = function (data) {
    drawData = data;

    if (!drawData || !drawData.isLevelMode) {
      return; // Ne rien faire si pas en mode niveau
    }

    // Afficher la section des statistiques
    $("#stats-section").show();

    // Générer les graphiques
    createLevelsChart();
    createDistributionChart();
    displayTeamStats();
  };

  // Créer le graphique de répartition des niveaux par équipe
  var createLevelsChart = function () {
    var ctx = document.getElementById("levels-chart");
    if (!ctx) return;

    // Préparer les données
    var labels = [];
    var datasets = [];

    // Créer un dataset par niveau (1 à 5)
    var levelColors = {
      1: "rgba(220, 53, 69, 0.8)", // Rouge
      2: "rgba(255, 193, 7, 0.8)", // Jaune
      3: "rgba(0, 123, 255, 0.8)", // Bleu
      4: "rgba(40, 167, 69, 0.8)", // Vert
      5: "rgba(111, 66, 193, 0.8)", // Violet
    };

    // Initialiser les datasets
    for (var level = 1; level <= 5; level++) {
      datasets.push({
        label: "Niveau " + level,
        data: [],
        backgroundColor: levelColors[level],
        borderColor: levelColors[level].replace("0.8", "1"),
        borderWidth: 1,
      });
    }

    // Remplir les données
    drawData.teams.forEach(function (team, index) {
      labels.push("Équipe " + (index + 1));

      // Compter les joueurs par niveau dans cette équipe
      var levelCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      team.forEach(function (player) {
        if (player.level) {
          levelCounts[player.level]++;
        }
      });

      // Ajouter les données aux datasets
      for (var level = 1; level <= 5; level++) {
        datasets[level - 1].data.push(levelCounts[level]);
      }
    });

    // Créer le graphique
    levelsChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  };

  // Créer le graphique de distribution globale
  var createDistributionChart = function () {
    var ctx = document.getElementById("players-distribution-chart");
    if (!ctx) return;

    // Compter tous les joueurs par niveau
    var levelCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    drawData.teams.forEach(function (team) {
      team.forEach(function (player) {
        if (player.level) {
          levelCounts[player.level]++;
        }
      });
    });

    distributionChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Niveau 1",
          "Niveau 2",
          "Niveau 3",
          "Niveau 4",
          "Niveau 5",
        ],
        datasets: [
          {
            data: [
              levelCounts[1],
              levelCounts[2],
              levelCounts[3],
              levelCounts[4],
              levelCounts[5],
            ],
            backgroundColor: [
              "rgba(220, 53, 69, 0.8)",
              "rgba(255, 193, 7, 0.8)",
              "rgba(0, 123, 255, 0.8)",
              "rgba(40, 167, 69, 0.8)",
              "rgba(111, 66, 193, 0.8)",
            ],
            borderColor: [
              "rgba(220, 53, 69, 1)",
              "rgba(255, 193, 7, 1)",
              "rgba(0, 123, 255, 1)",
              "rgba(40, 167, 69, 1)",
              "rgba(111, 66, 193, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });
  };

  // Afficher les statistiques détaillées des équipes
  var displayTeamStats = function () {
    var statsContainer = $("#team-stats");
    statsContainer.empty();

    var teamScores = [];
    drawData.teams.forEach(function (team, index) {
      var totalScore = 0;
      var playerCount = team.length;

      team.forEach(function (player) {
        totalScore += player.level || 0;
      });

      var avgScore = playerCount > 0 ? (totalScore / playerCount).toFixed(2) : 0;

      teamScores.push({
        name: "Équipe " + (index + 1),
        total: totalScore,
        average: avgScore,
        players: playerCount,
      });
    });

    // Calculer l'écart-type
    var scores = teamScores.map((t) => t.total);
    var mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    var variance =
      scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
      scores.length;
    var stdDev = Math.sqrt(variance).toFixed(2);

    // Afficher les stats
    var html = '<table class="table table-striped" style="margin-bottom: 20px;">';
    html += "<thead><tr>";
    html += "<th>Équipe</th>";
    html += "<th>Joueurs</th>";
    html += "<th>Score total</th>";
    html += "<th>Moyenne</th>";
    html += "</tr></thead>";
    html += "<tbody>";

    teamScores.forEach(function (team) {
      html += "<tr>";
      html += "<td><strong>" + team.name + "</strong></td>";
      html += "<td>" + team.players + "</td>";
      html += "<td>" + team.total + "</td>";
      html += "<td>" + team.average + "</td>";
      html += "</tr>";
    });

    html += "</tbody></table>";

    // Afficher l'écart-type
    html +=
      '<div class="alert alert-info" style="margin-top: 15px; text-align: center;">';
    html += '<strong><i class="fa fa-chart-line"></i> Écart-type : ' + stdDev + "</strong><br>";
    html += '<small>Plus l\'écart-type est faible, plus les équipes sont équilibrées</small>';
    html += "</div>";

    // Indicateur de qualité
    var quality = "Excellent";
    var qualityClass = "success";
    if (stdDev > 2) {
      quality = "Bon";
      qualityClass = "info";
    }
    if (stdDev > 4) {
      quality = "Moyen";
      qualityClass = "warning";
    }
    if (stdDev > 6) {
      quality = "À améliorer";
      qualityClass = "danger";
    }

    html += '<div class="alert alert-' + qualityClass + '" style="text-align: center;">';
    html += '<strong>Qualité de l\'équilibrage : ' + quality + "</strong>";
    html += "</div>";

    statsContainer.html(html);

    // Sauvegarder l'écart-type dans l'historique
    saveStdDevToHistory(stdDev);
  };

  // Sauvegarder l'écart-type dans l'historique
  var saveStdDevToHistory = function (stdDev) {
    var history = JSON.parse(localStorage.getItem("stdDevHistory")) || [];

    history.unshift({
      date: new Date().toISOString(),
      stdDev: parseFloat(stdDev),
      title: drawData.title,
    });

    // Limiter à 20 entrées
    if (history.length > 20) {
      history = history.slice(0, 20);
    }

    localStorage.setItem("stdDevHistory", JSON.stringify(history));
  };

  // Obtenir l'historique des écarts-types
  var getStdDevHistory = function () {
    return JSON.parse(localStorage.getItem("stdDevHistory")) || [];
  };

  // Détruire les graphiques
  var destroy = function () {
    if (levelsChart) {
      levelsChart.destroy();
      levelsChart = null;
    }
    if (distributionChart) {
      distributionChart.destroy();
      distributionChart = null;
    }
  };

  // Exposer les fonctions publiques
  window.BonballonStats = {
    init: init,
    destroy: destroy,
    getStdDevHistory: getStdDevHistory,
  };
})(jQuery);
