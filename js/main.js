(function (t) {
  var e = (function () {
      extLink = function () {
        t("a.link-ext").click(function () {
          window.open(this.href);
          return !1;
        });
        t("a.link-ext").mouseup(function () {
          t(this).blur();
        });
      };
      bonballonTooltip = function () {
        t('[data-toggle="tooltip"]').tooltip({
          trigger: "hover",
        });
      };
      toggleTarget = function () {
        t(".toggle-it").click(function () {
          var e = t(this).attr("data-target");
          t(e).toggle();
        });
      };
      scrollToTarget = function () {
        t(".scroll-to").click(function () {
          var e = t(this).attr("data-target");
          t("html, body").animate(
            {
              scrollTop: t(e).offset().top,
            },
            300
          );
        });
        t(".scroll-to-top").click(function () {
          t("html, body").animate(
            {
              scrollTop: 0,
            },
            300
          );
        });
        t(window).scroll(function () {
          if (t(window).scrollTop() > 500) {
            t(".scroll-to-top").fadeIn();
          } else {
            t(".scroll-to-top").fadeOut();
          }
        });
      };
      setCookie = function (t, e, a) {
        var i = new Date();
        i.setTime(i.getTime() + a * 24 * 60 * 60 * 1000);
        var n = "; expires=" + i.toGMTString();
        document.cookie = t + "=" + e + n + "; path=/";
      };
      init = function () {
        extLink();
        bonballonTooltip();
        toggleTarget();
        scrollToTarget();
      };
      return {
        init: init,
      };
    })(),
    i = (function () {
      var a = t("div#mix_players"),
        o = t("#nb-participants"),
        e = a.find(".participant-div").length,
        l = e,
        n = t("div#mix_teams"),
        r = t("#nb-teams"),
        i = n.find(".team-div").length,
        c = i;
      setTypeMix = function () {
        var l = '<style type="text/css" id="style-temp">';
        cssText = function (t, e) {
          return (
            ".gender-participant { display: " +
            t +
            "; } .level-participant { display: " +
            e +
            "; }"
          );
        };
        var i = cssText("none", "none"),
          a = cssText("block", "none"),
          n = cssText("none", "block"),
          o = t("input[name='mix[typeMix]']:checked"),
          e = i;
        switch (o.val()) {
          case "1":
            e = a;
            break;
          case "2":
            e = n;
            break;
        }
        t(l).text(e).appendTo("head");
        t("input[name='mix[typeMix]']").change(function () {
          var e = i;
          switch (t(this).val()) {
            case "1":
              e = a;
              break;
            case "2":
              e = n;
              break;
          }
          t("#style-temp").text(e);
        });
      };
      updateSelectPlayers = function () {
        o.val(e);
        t("#countPlayers").text(e);
      };
      updateSelectTeams = function () {
        r.val(i);
        t("#countTeams").text(i);
      };
      addTeam = function () {
        if (i < 100) {
          var e = t(
            n
              .attr("data-prototype")
              .replace(/__name__/g, c)
              .replace(/_NT_/g, " " + (i + 1))
          );
          n.append(e);
          i++;
          c++;
          return !0;
        }
      };
      addPlayer = function () {
        if (e < 100) {
          var i = t(
            a
              .attr("data-prototype")
              .replace(/__name__/g, l)
              .replace(/_NP_/g, " " + (e + 1))
          );
          a.append(i);
          e++;
          l++;
          return !0;
        }
      };
      changeSelectPlayersOrTeams = function () {
        o.change(function () {
          var i = t(this).val();
          if (i > e) {
            for (var o = e; o < i; o++) addPlayer();
          }
          if (i < e) {
            var n = e - i;
            a.children("div").slice(-n).remove();
            e = e - n;
          }
          updateSelectPlayers();
        });
        r.change(function () {
          var e = t(this).val();
          if (e > i) {
            for (var o = i; o < e; o++) addTeam();
          }
          if (e < i) {
            var a = i - e;
            n.children("div").slice(-a).remove();
            i = i - a;
          }
          updateSelectTeams();
        });
      };
      moreLess = function () {
        t("#more-player").click(function () {
          addPlayer();
          t(".input-participants").last().focus();
          updateSelectPlayers();
        });
        t("#more-team").click(function () {
          addTeam();
          t(".input-teams").last().focus();
          updateSelectTeams();
        });
        t("#mix_players").on("click", ".delete-player", function () {
          if (e > 1) {
            t(this).closest(".participant-div").parent().remove();
            e--;
            updateSelectPlayers();
            var i = t("#mix_players").attr("data-participant-trans");
            t(".input-participants").each(function (e) {
              t(this).attr("placeholder", i + " " + (e + 1));
            });
          }
        });
        t("#mix_teams").on("click", ".delete-team", function () {
          if (i > 1) {
            t(this).closest(".team-div").parent().remove();
            i--;
            updateSelectTeams();
            var e = t("#mix_teams").attr("data-team-trans");
            t(".input-teams").each(function (i) {
              t(this).attr("placeholder", e + " " + (i + 1));
            });
          }
        });
      };
      importList = function () {
        t("#import-p-button").click(function () {
          var n = t("#import-participant-list").val().split(/\n/),
            o = [];
          for (var i = 0; i < n.length; i++) {
            if (/\S/.test(n[i])) {
              o.push(t.trim(n[i]));
            }
          }
          if (o.length > 0) {
            a.children("div").remove();
            e = 0;
            t.each(o, function (e, i) {
              if (addPlayer()) t(".input-participants").last().val(i);
            });
            updateSelectPlayers();
            t("#import-participant").toggle();
          }
        });
        t("#import-t-button").click(function () {
          var a = t("#import-team-list").val().split(/\n/),
            o = [];
          for (var e = 0; e < a.length; e++) {
            if (/\S/.test(a[e])) {
              o.push(t.trim(a[e]));
            }
          }
          if (o.length > 0) {
            n.children("div").remove();
            i = 0;
            t.each(o, function (e, i) {
              if (addTeam()) t(".input-teams").last().val(i);
            });
            updateSelectTeams();
            t("#import-team").toggle();
          }
        });
        t(".modal-body").on("click", ".mix-list-team-item", function () {
          var e = t(this).data("id");
          t.ajax({
            url: Routing.generate("list_team_ajax_item", {
              id: e,
            }),
            method: "GET",
          }).done(function (e) {
            n.children("div").remove();
            i = 0;
            t.each(e, function (e, i) {
              if (addTeam()) t(".input-teams").last().val(i.name);
            });
            updateSelectTeams();
            t("#mixListTeamModal").modal("hide");
          });
        });
        t(".modal-body").on("click", ".mix-list-player-item", function () {
          var i = t(this).data("id");
          t.ajax({
            url: Routing.generate("list_player_ajax_item", {
              id: i,
            }),
            method: "GET",
          }).done(function (i) {
            a.children("div").remove();
            e = 0;
            t.each(i, function (e, i) {
              if (addPlayer()) {
                t(".input-participants").last().val(i.name);
                var n = t(".gender-participant").last().find("input");
                n.each(function () {
                  if (t(this).val() == i.gender) {
                    t(this).prop("checked", !0);
                  }
                });
                var a = t(".level-participant").last().find("input");
                a.each(function () {
                  if (t(this).val() == i.level) {
                    t(this).prop("checked", !0);
                  }
                });
                setLevel(".level-participant");
              }
            });
            updateSelectPlayers();
            t("#mixListPlayerModal").modal("hide");
          });
        });
      };
      levelSystem = function () {
        setLevel(".level-participant");
        t("#mix_players").on(
          {
            mouseenter: function () {
              t(this).prevAll("label").andSelf().addClass("level-hover");
              t(this).nextAll("label").removeClass("level-hover");
            },
            mouseleave: function () {
              t(this).prevAll("label").andSelf().removeClass("level-hover");
              var e = t(this).parent().closest("div");
              setLevel(e);
            },
          },
          ".level-participant label"
        );
      };
      setLevel = function (e) {
        var i = t(e).find("input:checked");
        if (i.length > 0) {
          t(i).prevAll("label").andSelf().addClass("level-hover");
          t(i).nextAll().removeClass("level-hover");
        }
      };
      selectResultInput = function () {
        t(".result-input-link").click(function () {
          t(this).select();
        });
        t(".result-input-link").blur(function () {
          t(this).val(this.defaultValue);
        });
      };
      ajaxActions = function () {
        t("input[name='hide-option']").change(function () {
          var e = t(this).prop("checked") ? 1 : 0;
          t.ajax({
            url: Routing.generate("mix_hide_option", {
              id: t(this).attr("data-id"),
              val: e,
            }),
            method: "GET",
          }).done(function (e) {
            if (e == 1) {
              t(".result-option")
                .removeClass("res-opa-1")
                .addClass("res-opa-05");
            } else {
              t(".result-option")
                .removeClass("res-opa-05")
                .addClass("res-opa-1");
            }
          });
        });
        t("#regenerateEditDontShow").click(function () {
          setCookie("confirm_edit", "hide", 365);
          t("#editMessage").hide();
        });
        t("#regenerateCloneDontShow").click(function () {
          setCookie("confirm_clone", "hide", 365);
          t("#editMessage").hide();
        });
        t("#cookiesPrivacyButton").click(function () {
          setCookie("cookies_privacy", "yes", 365);
          t("#cookies-privacy").hide();
        });
        t("#btnCloseSupport").click(function () {
          setCookie("support_block", "hide", 1);
        });
        t("#btnDonateSupport").click(function () {
          setCookie("support_block", "hide", 30);
        });
      };
      commentCheckLength = function () {
        t("#comment_body").keyup(function () {
          var a = t(this).val().length,
            i = 500 - a,
            e = "";
          if (i >= 0) e = i;
          else {
            t(this).val(t(this).val().substr(0, 500));
            e = 0;
          }
          t("#comment-char-left").text(e);
        });
      };
      dynamicModal = function () {
        t("#deleteCommentModal").on("show.bs.modal", function (e) {
          var i = t(e.relatedTarget),
            n = Routing.generate("comment_delete", {
              fullId: i.data("fullid"),
              idComment: i.data("comment-id"),
            });
          var a = t(this);
          a.find(".my-modal-path").attr("href", n);
        });
        t("#deleteMixFromTabModal").on("show.bs.modal", function (e) {
          var a = t(e.relatedTarget),
            n = Routing.generate("mix_delete", {
              fullId: a.data("fullid"),
            });
          var i = t(this);
          i.find(".my-modal-path").attr("href", n);
        });
        t("#mixListTeamModal").on("show.bs.modal", function (e) {
          var i = t(this).find(".modal-body");
          i.load(Routing.generate("list_team_ajax"));
        });
        t("#mixListPlayerModal").on("show.bs.modal", function (e) {
          var i = t(this).find(".modal-body");
          i.load(Routing.generate("list_player_ajax"));
        });
      };
      popupSocial = function () {
        t(".popup").click(function (e) {
          var i = 575,
            a = 400,
            n = (t(window).width() - i) / 2,
            o = (t(window).height() - a) / 2,
            l = this.href,
            r =
              "status=1,width=" +
              i +
              ",height=" +
              a +
              ",top=" +
              o +
              ",left=" +
              n +
              ",scrollbars=yes";
          window.open(l, "Share", r).focus();
          return !1;
        });
      };
      validForm = function () {
        t("#mix_form").submit(function (e) {
          e.preventDefault();

          // Récupérer le titre
          var title = t("#mix_title").val().trim();
          if (!title) {
            alert("Veuillez entrer un titre pour le tirage");
            return;
          }

          // Récupérer les participants
          var participants = [];
          t(".input-participants").each(function () {
            var value = t(this).val().trim();
            if (value) {
              // Récupérer le niveau sélectionné
              var playerDiv = t(this).closest(".participant-div");
              var level = playerDiv
                .find('input[name$="[level]"]:checked')
                .val();
              participants.push({
                name: value,
                level: parseInt(level || "1"), // Utiliser 1 comme niveau par défaut
              });
            }
          });

          // Récupérer le nombre d'équipes
          var numTeams = parseInt(t("#nb-teams").val());

          if (participants.length < numTeams) {
            alert(
              "Il doit y avoir au moins autant de participants que d'équipes"
            );
            return;
          }

          // Vérifier si le mode niveau est activé
          var isLevelMode =
            t('input[name="mix[typeMix]"]:checked').val() === "2";

          // Récupérer les contraintes
          var constraints = window.BonballonConstraints
            ? window.BonballonConstraints.getConstraints()
            : { together: [], separated: [], captains: [] };

          // Générer les équipes aléatoires
          var teams = generateRandomTeamsOptimized(
            participants,
            numTeams,
            isLevelMode,
            constraints
          );

          // Sauvegarder les résultats dans localStorage
          var drawResults = {
            title: title,
            teams: teams,
            isLevelMode: isLevelMode,
          };
          localStorage.setItem("drawResults", JSON.stringify(drawResults));

          // Rediriger vers la page de résultats
          window.location.href = "results.html";
        });
      };

      // Fonction pour appliquer les contraintes "ensemble" et "séparés"
      function applyConstraints(teams, constraints) {
        if (!constraints) return;

        // Fonction helper pour trouver un joueur dans les équipes
        function findPlayer(playerName) {
          for (var i = 0; i < teams.length; i++) {
            for (var j = 0; j < teams[i].length; j++) {
              if (teams[i][j].name === playerName) {
                return { teamIndex: i, playerIndex: j, player: teams[i][j] };
              }
            }
          }
          return null;
        }

        // Appliquer les contraintes "ensemble"
        if (constraints.together && constraints.together.length > 0) {
          constraints.together.forEach(function (constraint) {
            var player1Info = findPlayer(constraint.player1);
            var player2Info = findPlayer(constraint.player2);

            if (
              player1Info &&
              player2Info &&
              player1Info.teamIndex !== player2Info.teamIndex
            ) {
              // Ne pas déplacer les capitaines
              if (player1Info.player.isCaptain && player2Info.player.isCaptain) {
                return; // Impossible de satisfaire cette contrainte
              }

              // Déplacer le joueur qui n'est pas capitaine
              if (player1Info.player.isCaptain) {
                // Déplacer player2 vers l'équipe de player1
                teams[player2Info.teamIndex].splice(player2Info.playerIndex, 1);
                teams[player1Info.teamIndex].push(player2Info.player);
              } else {
                // Déplacer player1 vers l'équipe de player2
                teams[player1Info.teamIndex].splice(player1Info.playerIndex, 1);
                teams[player2Info.teamIndex].push(player1Info.player);
              }
            }
          });
        }

        // Appliquer les contraintes "séparés"
        if (constraints.separated && constraints.separated.length > 0) {
          constraints.separated.forEach(function (constraint) {
            var player1Info = findPlayer(constraint.player1);
            var player2Info = findPlayer(constraint.player2);

            if (
              player1Info &&
              player2Info &&
              player1Info.teamIndex === player2Info.teamIndex
            ) {
              // Ne pas déplacer les capitaines
              if (player1Info.player.isCaptain && player2Info.player.isCaptain) {
                return; // Impossible de satisfaire cette contrainte
              }

              // Trouver une autre équipe pour l'un des joueurs
              var playerToMove = player1Info.player.isCaptain
                ? player2Info
                : player1Info;

              for (var i = 0; i < teams.length; i++) {
                if (i !== playerToMove.teamIndex) {
                  // Vérifier qu'on ne crée pas de conflit avec d'autres contraintes "séparés"
                  var hasConflict = false;
                  teams[i].forEach(function (teammate) {
                    constraints.separated.forEach(function (sep) {
                      if (
                        (sep.player1 === playerToMove.player.name &&
                          sep.player2 === teammate.name) ||
                        (sep.player2 === playerToMove.player.name &&
                          sep.player1 === teammate.name)
                      ) {
                        hasConflict = true;
                      }
                    });
                  });

                  if (!hasConflict) {
                    // Déplacer le joueur
                    teams[playerToMove.teamIndex].splice(
                      playerToMove.playerIndex,
                      1
                    );
                    teams[i].push(playerToMove.player);
                    break;
                  }
                }
              }
            }
          });
        }
      }

      function generateRandomTeamsOptimized(
        participants,
        numTeams,
        isLevelMode,
        constraints
      ) {
        constraints = constraints || { together: [], separated: [], captains: [] };
        
        // Créer les équipes
        var teams = Array.from({ length: numTeams }, () => []);
        
        // Placer d'abord les capitaines
        if (constraints.captains && constraints.captains.length > 0) {
          constraints.captains.forEach(function(captain) {
            var playerIndex = participants.findIndex(p => p.name === captain.player);
            if (playerIndex !== -1 && captain.team <= numTeams) {
              var player = participants.splice(playerIndex, 1)[0];
              player.isCaptain = true;
              teams[captain.team - 1].push(player);
            }
          });
        }

        // Si le mode niveau est activé
        if (isLevelMode) {
          // Trier par niveau (du plus élevé au plus bas)
          participants.sort((a, b) => b.level - a.level);

          // Algorithme de distribution en serpentin (Snake Draft)
          // Plus équilibré que le greedy simple
          // Exemple pour 3 équipes: 1,2,3,3,2,1,1,2,3,3,2,1...

          var teamScores = Array(numTeams).fill(0);
          var direction = 1; // 1 = avant, -1 = arrière
          var currentTeam = 0;

          participants.forEach((participant) => {
            // Ajouter le joueur à l'équipe courante
            teams[currentTeam].push(participant);
            teamScores[currentTeam] += participant.level;

            // Calculer la prochaine équipe (serpentin)
            if (direction === 1) {
              currentTeam++;
              if (currentTeam >= numTeams) {
                currentTeam = numTeams - 1;
                direction = -1;
              }
            } else {
              currentTeam--;
              if (currentTeam < 0) {
                currentTeam = 0;
                direction = 1;
              }
            }
          });

          // Optimisation finale: échanger des joueurs si nécessaire pour mieux équilibrer
          // Limite à 3 passes pour éviter une complexité excessive
          for (var pass = 0; pass < 3; pass++) {
            var improved = false;

            // Trouver l'équipe la plus forte et la plus faible
            var maxScore = Math.max.apply(null, teamScores);
            var minScore = Math.min.apply(null, teamScores);
            var maxTeamIndex = teamScores.indexOf(maxScore);
            var minTeamIndex = teamScores.indexOf(minScore);

            // Si la différence est acceptable, arrêter
            if (maxScore - minScore <= 1) break;

            // Essayer d'échanger un joueur de l'équipe forte vers l'équipe faible
            var maxTeam = teams[maxTeamIndex];
            var minTeam = teams[minTeamIndex];

            for (var i = maxTeam.length - 1; i >= 0; i--) {
              var player = maxTeam[i];
              var newMaxScore = teamScores[maxTeamIndex] - player.level;
              var newMinScore = teamScores[minTeamIndex] + player.level;

              // Vérifier si l'échange améliore l'équilibre
              var currentDiff = maxScore - minScore;
              var newDiff = Math.abs(newMaxScore - newMinScore);

              if (newDiff < currentDiff) {
                // Effectuer l'échange
                minTeam.push(player);
                maxTeam.splice(i, 1);
                teamScores[maxTeamIndex] = newMaxScore;
                teamScores[minTeamIndex] = newMinScore;
                improved = true;
                break;
              }
            }

            if (!improved) break;
          }

          // Appliquer les contraintes "ensemble" et "séparés"
          applyConstraints(teams, constraints);

          // Mélanger l'ordre des joueurs dans chaque équipe (Fisher-Yates)
          teams.forEach((team) => {
            for (let i = team.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [team[i], team[j]] = [team[j], team[i]];
            }
          });
        } else {
          // Distribution normale pour le mode standard
          // Mélanger d'abord les participants
          for (let i = participants.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [participants[i], participants[j]] = [
              participants[j],
              participants[i],
            ];
          }

          // Distribuer en round-robin
          var currentTeam = 0;
          participants.forEach((participant) => {
            teams[currentTeam].push(participant);
            currentTeam = (currentTeam + 1) % numTeams;
          });
        }

        return teams;
      }
      displayTeams = function (teams) {
        var resultsHtml = '<div class="results-container">';

        // Calculer les scores d'équipe si le mode niveau est activé
        var isLevelMode = t('input[name="mix[typeMix]"]:checked').val() === "2";
        var teamScores = [];

        if (isLevelMode) {
          // Calculer le score total pour chaque équipe (somme des niveaux)
          teams.forEach((team) => {
            var teamScore = team.reduce((sum, player) => sum + player.level, 0);
            teamScores.push(teamScore);
          });
        }

        teams.forEach((team, index) => {
          resultsHtml += '<div class="team-result">';
          resultsHtml += "<h3>Équipe " + (index + 1);

          // Afficher le score d'équipe si le mode niveau est activé
          if (isLevelMode) {
            resultsHtml +=
              ' <span class="team-score">(Score: ' +
              teamScores[index] +
              ")</span>";
          }

          resultsHtml += "</h3>";
          resultsHtml += "<ul>";
          team.forEach((player) => {
            resultsHtml += "<li>" + player.name;
            if (isLevelMode) {
              resultsHtml +=
                ' <span class="player-level" data-level="' +
                player.level +
                '">(Niveau: ' +
                player.level +
                ")</span>";
            }
            resultsHtml += "</li>";
          });
          resultsHtml += "</ul></div>";
        });
        resultsHtml += "</div>";

        // Créer ou mettre à jour la div des résultats
        if (t("#teams-results").length === 0) {
          t(".main-container").append('<div id="teams-results"></div>');
        }
        t("#teams-results").html(resultsHtml);

        // Afficher des statistiques sur l'équilibrage des équipes si le mode niveau est activé
        if (isLevelMode && teamScores.length > 0) {
          var statsHtml = '<div class="team-stats">';

          // Calculer la moyenne des scores d'équipe
          var avgScore =
            teamScores.reduce((sum, score) => sum + score, 0) /
            teamScores.length;
          avgScore = Math.round(avgScore * 100) / 100; // Arrondir à 2 décimales

          // Calculer l'écart-type des scores d'équipe
          var variance =
            teamScores.reduce(
              (sum, score) => sum + Math.pow(score - avgScore, 2),
              0
            ) / teamScores.length;
          var stdDev = Math.sqrt(variance);
          stdDev = Math.round(stdDev * 100) / 100; // Arrondir à 2 décimales

          statsHtml +=
            "<p>Score moyen par équipe: <strong>" + avgScore + "</strong></p>";
          statsHtml +=
            "<p>Écart-type: <strong>" +
            stdDev +
            "</strong> (plus cette valeur est basse, plus les équipes sont équilibrées)</p>";

          // Ajouter un bouton pour regénérer les équipes
          statsHtml +=
            '<button id="regenerate-teams" class="btn orange-btn middle-keamk-btn">Regénérer les équipes</button>';

          statsHtml += "</div>";

          // Ajouter les statistiques après les résultats
          t("#teams-results").append(statsHtml);

          // Ajouter un gestionnaire d'événements pour le bouton de regénération
          t("#regenerate-teams").on("click", function () {
            // Récupérer les participants et le nombre d'équipes depuis localStorage
            var drawResults = JSON.parse(localStorage.getItem("drawResults"));
            var participants = [];

            // Extraire les participants de toutes les équipes
            drawResults.teams.forEach((team) => {
              team.forEach((player) => {
                participants.push(player);
              });
            });

            var numTeams = drawResults.teams.length;

            // Générer de nouvelles équipes
            var newTeams = generateRandomTeams(participants, numTeams);

            // Mettre à jour les résultats dans localStorage
            drawResults.teams = newTeams;
            localStorage.setItem("drawResults", JSON.stringify(drawResults));

            // Afficher les nouvelles équipes
            displayTeams(newTeams);
          });
        }
      };
      copyToClipboard = function () {
        t(".copytoclip").click(function () {
          t(this).parent().prev().select();
          document.execCommand("copy");
          t(this).tooltip("hide");
          var e = t(this).children(":first");
          e.tooltip({
            placement: "bottom",
          }).tooltip("show");
          e.on("hidden.bs.tooltip", function () {
            t(this).tooltip("destroy");
          });
        });
      };
      init = function () {
        updateSelectPlayers();
        updateSelectTeams();
        moreLess();
        changeSelectPlayersOrTeams();
        importList();
        setTypeMix();
        levelSystem();
        validForm();
        selectResultInput();
        popupSocial();
        ajaxActions();
        commentCheckLength();
        dynamicModal();
        copyToClipboard();
      };
      return {
        init: init,
      };
    })();
  t(e.init);
  t(i.init);
})(jQuery);
