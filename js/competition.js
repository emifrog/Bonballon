// Gestion du mode compétition pour Bonballon
(function ($) {
  var competitionData = {
    matches: [], // Historique des matchs
    teamStats: {}, // Statistiques par équipe
  };

  // Initialisation
  var init = function () {
    loadCompetitionData();
  };

  // Charger les données de compétition depuis localStorage
  var loadCompetitionData = function () {
    var saved = localStorage.getItem("competitionData");
    if (saved) {
      try {
        competitionData = JSON.parse(saved);
      } catch (e) {
        console.error("Erreur lors du chargement des données de compétition:", e);
        competitionData = {
          matches: [],
          teamStats: {},
        };
      }
    }
  };

  // Sauvegarder les données de compétition
  var saveCompetitionData = function () {
    localStorage.setItem("competitionData", JSON.stringify(competitionData));
  };

  // Enregistrer un nouveau match
  var recordMatch = function (matchData) {
    // matchData = {
    //   date: timestamp,
    //   title: "Titre du tirage",
    //   teams: [{name: "Équipe 1", players: [...], score: 10}],
    //   winner: "Équipe 1" (optionnel)
    // }

    matchData.id = Date.now();
    matchData.date = matchData.date || Date.now();
    competitionData.matches.push(matchData);

    // Mettre à jour les statistiques des équipes
    updateTeamStats(matchData);

    saveCompetitionData();
    return matchData.id;
  };

  // Mettre à jour les statistiques d'une équipe
  var updateTeamStats = function (matchData) {
    matchData.teams.forEach(function (team) {
      if (!competitionData.teamStats[team.name]) {
        competitionData.teamStats[team.name] = {
          name: team.name,
          matchesPlayed: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          totalScore: 0,
          averageScore: 0,
        };
      }

      var stats = competitionData.teamStats[team.name];
      stats.matchesPlayed++;

      if (matchData.winner) {
        if (team.name === matchData.winner) {
          stats.wins++;
        } else {
          stats.losses++;
        }
      }

      if (team.score !== undefined) {
        stats.totalScore += team.score;
        stats.averageScore = stats.totalScore / stats.matchesPlayed;
      }
    });
  };

  // Obtenir l'historique des matchs
  var getMatches = function (limit) {
    var matches = competitionData.matches.slice();
    matches.sort((a, b) => b.date - a.date);
    return limit ? matches.slice(0, limit) : matches;
  };

  // Obtenir les statistiques d'une équipe
  var getTeamStats = function (teamName) {
    return competitionData.teamStats[teamName] || null;
  };

  // Obtenir toutes les statistiques des équipes
  var getAllTeamStats = function () {
    return Object.values(competitionData.teamStats);
  };

  // Obtenir le classement des équipes
  var getLeaderboard = function () {
    var teams = getAllTeamStats();
    teams.sort((a, b) => {
      // Trier par victoires, puis par ratio victoires/matchs
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }
      var ratioA = a.matchesPlayed > 0 ? a.wins / a.matchesPlayed : 0;
      var ratioB = b.matchesPlayed > 0 ? b.wins / b.matchesPlayed : 0;
      return ratioB - ratioA;
    });
    return teams;
  };

  // Obtenir les matchs entre deux équipes
  var getMatchesBetweenTeams = function (team1, team2) {
    return competitionData.matches.filter(function (match) {
      var teamNames = match.teams.map((t) => t.name);
      return teamNames.includes(team1) && teamNames.includes(team2);
    });
  };

  // Mettre à jour le vainqueur d'un match
  var updateMatchWinner = function (matchId, winnerName) {
    var match = competitionData.matches.find((m) => m.id === matchId);
    if (match) {
      // Retirer les anciennes stats si un vainqueur existait
      if (match.winner) {
        match.teams.forEach(function (team) {
          var stats = competitionData.teamStats[team.name];
          if (stats) {
            if (team.name === match.winner) {
              stats.wins--;
            } else {
              stats.losses--;
            }
          }
        });
      }

      // Mettre à jour le vainqueur
      match.winner = winnerName;

      // Ajouter les nouvelles stats
      match.teams.forEach(function (team) {
        var stats = competitionData.teamStats[team.name];
        if (stats) {
          if (team.name === winnerName) {
            stats.wins++;
          } else {
            stats.losses++;
          }
        }
      });

      saveCompetitionData();
      return true;
    }
    return false;
  };

  // Mettre à jour le score d'une équipe dans un match
  var updateTeamScore = function (matchId, teamName, score) {
    var match = competitionData.matches.find((m) => m.id === matchId);
    if (match) {
      var team = match.teams.find((t) => t.name === teamName);
      if (team) {
        var oldScore = team.score || 0;
        team.score = score;

        // Mettre à jour les stats
        var stats = competitionData.teamStats[teamName];
        if (stats) {
          stats.totalScore = stats.totalScore - oldScore + score;
          stats.averageScore = stats.totalScore / stats.matchesPlayed;
        }

        saveCompetitionData();
        return true;
      }
    }
    return false;
  };

  // Supprimer un match
  var deleteMatch = function (matchId) {
    var matchIndex = competitionData.matches.findIndex((m) => m.id === matchId);
    if (matchIndex !== -1) {
      var match = competitionData.matches[matchIndex];

      // Mettre à jour les stats
      match.teams.forEach(function (team) {
        var stats = competitionData.teamStats[team.name];
        if (stats) {
          stats.matchesPlayed--;

          if (match.winner) {
            if (team.name === match.winner) {
              stats.wins--;
            } else {
              stats.losses--;
            }
          }

          if (team.score !== undefined) {
            stats.totalScore -= team.score;
            stats.averageScore =
              stats.matchesPlayed > 0
                ? stats.totalScore / stats.matchesPlayed
                : 0;
          }

          // Supprimer l'équipe si elle n'a plus de matchs
          if (stats.matchesPlayed === 0) {
            delete competitionData.teamStats[team.name];
          }
        }
      });

      competitionData.matches.splice(matchIndex, 1);
      saveCompetitionData();
      return true;
    }
    return false;
  };

  // Réinitialiser toutes les données de compétition
  var resetCompetition = function () {
    if (
      confirm(
        "Êtes-vous sûr de vouloir réinitialiser toutes les données de compétition ? Cette action est irréversible."
      )
    ) {
      competitionData = {
        matches: [],
        teamStats: {},
      };
      saveCompetitionData();
      return true;
    }
    return false;
  };

  // Exporter les données de compétition en JSON
  var exportData = function () {
    var dataStr = JSON.stringify(competitionData, null, 2);
    var dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    var exportFileDefaultName = "bonballon_competition_" + Date.now() + ".json";

    var linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Importer des données de compétition depuis JSON
  var importData = function (jsonData) {
    try {
      var imported = JSON.parse(jsonData);
      if (imported.matches && imported.teamStats) {
        competitionData = imported;
        saveCompetitionData();
        return true;
      }
    } catch (e) {
      console.error("Erreur lors de l'import des données:", e);
    }
    return false;
  };

  // Exposer les fonctions publiques
  window.BonballonCompetition = {
    init: init,
    recordMatch: recordMatch,
    getMatches: getMatches,
    getTeamStats: getTeamStats,
    getAllTeamStats: getAllTeamStats,
    getLeaderboard: getLeaderboard,
    getMatchesBetweenTeams: getMatchesBetweenTeams,
    updateMatchWinner: updateMatchWinner,
    updateTeamScore: updateTeamScore,
    deleteMatch: deleteMatch,
    resetCompetition: resetCompetition,
    exportData: exportData,
    importData: importData,
  };

  // Initialiser au chargement du document
  $(function () {
    init();
  });
})(jQuery);
