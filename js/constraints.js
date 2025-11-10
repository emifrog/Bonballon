// Gestion des contraintes personnalisées pour Bonballon
(function ($) {
  var constraints = {
    together: [], // [{player1: "nom1", player2: "nom2"}]
    separated: [], // [{player1: "nom1", player2: "nom2"}]
    captains: [], // [{player: "nom", team: 1}]
  };

  var constraintId = 0;

  // Initialisation
  var init = function () {
    // Boutons d'ajout de contraintes
    $("#add-together-constraint").click(function () {
      addTogetherConstraint();
    });

    $("#add-separated-constraint").click(function () {
      addSeparatedConstraint();
    });

    $("#add-captain").click(function () {
      addCaptain();
    });

    // Charger les contraintes depuis localStorage si elles existent
    loadConstraints();
  };

  // Ajouter une contrainte "ensemble"
  var addTogetherConstraint = function () {
    var id = constraintId++;
    var html = `
            <div class="constraint-item" data-id="${id}" style="margin-bottom: 10px;">
                <div class="input-group">
                    <select class="form-control player-select-1" style="width: 45%; display: inline-block;">
                        <option value="">Sélectionner un joueur</option>
                    </select>
                    <span style="display: inline-block; padding: 0 10px; color: white;">et</span>
                    <select class="form-control player-select-2" style="width: 45%; display: inline-block;">
                        <option value="">Sélectionner un joueur</option>
                    </select>
                    <span class="input-group-btn" style="display: inline-block;">
                        <button class="btn btn-danger btn-sm remove-constraint" type="button">
                            <i class="fa fa-times"></i>
                        </button>
                    </span>
                </div>
            </div>
        `;

    $("#together-constraints").append(html);
    updatePlayerSelects();

    // Gérer la suppression
    $("#together-constraints")
      .find('[data-id="' + id + '"] .remove-constraint')
      .click(function () {
        $(this).closest(".constraint-item").remove();
        updateConstraintsData();
      });

    // Gérer les changements
    $("#together-constraints")
      .find('[data-id="' + id + '"] select')
      .change(function () {
        updateConstraintsData();
      });
  };

  // Ajouter une contrainte "séparés"
  var addSeparatedConstraint = function () {
    var id = constraintId++;
    var html = `
            <div class="constraint-item" data-id="${id}" style="margin-bottom: 10px;">
                <div class="input-group">
                    <select class="form-control player-select-1" style="width: 45%; display: inline-block;">
                        <option value="">Sélectionner un joueur</option>
                    </select>
                    <span style="display: inline-block; padding: 0 10px; color: white;">et</span>
                    <select class="form-control player-select-2" style="width: 45%; display: inline-block;">
                        <option value="">Sélectionner un joueur</option>
                    </select>
                    <span class="input-group-btn" style="display: inline-block;">
                        <button class="btn btn-danger btn-sm remove-constraint" type="button">
                            <i class="fa fa-times"></i>
                        </button>
                    </span>
                </div>
            </div>
        `;

    $("#separated-constraints").append(html);
    updatePlayerSelects();

    // Gérer la suppression
    $("#separated-constraints")
      .find('[data-id="' + id + '"] .remove-constraint')
      .click(function () {
        $(this).closest(".constraint-item").remove();
        updateConstraintsData();
      });

    // Gérer les changements
    $("#separated-constraints")
      .find('[data-id="' + id + '"] select')
      .change(function () {
        updateConstraintsData();
      });
  };

  // Ajouter un capitaine
  var addCaptain = function () {
    var id = constraintId++;
    var numTeams = parseInt($("#nb-teams").val()) || 2;

    var html = `
            <div class="constraint-item" data-id="${id}" style="margin-bottom: 10px;">
                <div class="input-group">
                    <select class="form-control captain-player-select" style="width: 50%; display: inline-block;">
                        <option value="">Sélectionner un joueur</option>
                    </select>
                    <span style="display: inline-block; padding: 0 10px; color: white;">pour l'équipe</span>
                    <select class="form-control captain-team-select" style="width: 20%; display: inline-block;">
                    </select>
                    <span class="input-group-btn" style="display: inline-block;">
                        <button class="btn btn-danger btn-sm remove-constraint" type="button">
                            <i class="fa fa-times"></i>
                        </button>
                    </span>
                </div>
            </div>
        `;

    $("#captains-list").append(html);

    // Ajouter les options d'équipes
    var teamSelect = $("#captains-list")
      .find('[data-id="' + id + '"] .captain-team-select')
      .first();
    for (var i = 1; i <= numTeams; i++) {
      teamSelect.append('<option value="' + i + '">Équipe ' + i + "</option>");
    }

    updatePlayerSelects();

    // Gérer la suppression
    $("#captains-list")
      .find('[data-id="' + id + '"] .remove-constraint')
      .click(function () {
        $(this).closest(".constraint-item").remove();
        updateConstraintsData();
      });

    // Gérer les changements
    $("#captains-list")
      .find('[data-id="' + id + '"] select')
      .change(function () {
        updateConstraintsData();
      });
  };

  // Mettre à jour les listes de joueurs dans les selects
  var updatePlayerSelects = function () {
    var players = [];

    // Récupérer tous les participants
    $(".input-participants").each(function () {
      var value = $(this).val().trim();
      if (value) {
        players.push(value);
      }
    });

    // Mettre à jour tous les selects de joueurs
    $(".player-select-1, .player-select-2, .captain-player-select").each(
      function () {
        var currentValue = $(this).val();
        $(this).empty();
        $(this).append('<option value="">Sélectionner un joueur</option>');

        players.forEach(function (player) {
          $(this).append(
            '<option value="' + player + '">' + player + "</option>"
          );
        }, this);

        // Restaurer la valeur si elle existe toujours
        if (players.indexOf(currentValue) !== -1) {
          $(this).val(currentValue);
        }
      }
    );
  };

  // Mettre à jour les données de contraintes
  var updateConstraintsData = function () {
    constraints.together = [];
    constraints.separated = [];
    constraints.captains = [];

    // Contraintes "ensemble"
    $("#together-constraints .constraint-item").each(function () {
      var player1 = $(this).find(".player-select-1").val();
      var player2 = $(this).find(".player-select-2").val();

      if (player1 && player2 && player1 !== player2) {
        constraints.together.push({ player1: player1, player2: player2 });
      }
    });

    // Contraintes "séparés"
    $("#separated-constraints .constraint-item").each(function () {
      var player1 = $(this).find(".player-select-1").val();
      var player2 = $(this).find(".player-select-2").val();

      if (player1 && player2 && player1 !== player2) {
        constraints.separated.push({ player1: player1, player2: player2 });
      }
    });

    // Capitaines
    $("#captains-list .constraint-item").each(function () {
      var player = $(this).find(".captain-player-select").val();
      var team = parseInt($(this).find(".captain-team-select").val());

      if (player && team) {
        constraints.captains.push({ player: player, team: team });
      }
    });

    // Sauvegarder dans localStorage
    saveConstraints();
  };

  // Sauvegarder les contraintes dans localStorage
  var saveConstraints = function () {
    localStorage.setItem("teamConstraints", JSON.stringify(constraints));
  };

  // Charger les contraintes depuis localStorage
  var loadConstraints = function () {
    var saved = localStorage.getItem("teamConstraints");
    if (saved) {
      try {
        constraints = JSON.parse(saved);
      } catch (e) {
        console.error("Erreur lors du chargement des contraintes:", e);
      }
    }
  };

  // Obtenir les contraintes actuelles
  var getConstraints = function () {
    updateConstraintsData();
    return constraints;
  };

  // Effacer toutes les contraintes
  var clearConstraints = function () {
    constraints = {
      together: [],
      separated: [],
      captains: [],
    };
    $("#together-constraints").empty();
    $("#separated-constraints").empty();
    $("#captains-list").empty();
    saveConstraints();
  };

  // Observer les changements de participants pour mettre à jour les selects
  var observeParticipants = function () {
    // Utiliser MutationObserver pour détecter les changements
    var observer = new MutationObserver(function (mutations) {
      updatePlayerSelects();
    });

    var target = document.getElementById("mix_players");
    if (target) {
      observer.observe(target, {
        childList: true,
        subtree: true,
      });
    }

    // Observer aussi les changements de valeur des inputs
    $(document).on("input", ".input-participants", function () {
      updatePlayerSelects();
    });
  };

  // Exposer les fonctions publiques
  window.BonballonConstraints = {
    init: init,
    getConstraints: getConstraints,
    clearConstraints: clearConstraints,
    updatePlayerSelects: updatePlayerSelects,
    observeParticipants: observeParticipants,
  };

  // Initialiser au chargement du document
  $(function () {
    init();
    observeParticipants();
  });
})(jQuery);
