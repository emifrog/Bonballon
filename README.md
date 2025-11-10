# Bonballon - Générateur d'équipes intelligent

[![PWA](https://img.shields.io/badge/PWA-Ready-blue)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Play Store](https://img.shields.io/badge/Play%20Store-Ready-brightgreen)](PLAYSTORE_GUIDE.md)

Bonballon est une Progressive Web App qui permet de générer des équipes parfaitement équilibrées pour vos activités sportives. Fonctionne 100% hors ligne, sans publicité, et respecte votre vie privée.

![Bonballon Screenshot](images/logo.png)

---

## ✨ Fonctionnalités principales

### 🎲 Génération d'équipes intelligente
- **Mode Normal** : Répartition aléatoire simple
- **Mode Niveau** : Équilibrage automatique par compétence (niveaux 1-5)
- Algorithme optimisé avec snake draft
- Import/Export de listes de participants
- Génération instantanée

### ⚙️ Contraintes personnalisées
- **Joueurs ensemble** : Forcer certains joueurs dans la même équipe
- **Joueurs séparés** : Garantir que certains joueurs soient dans des équipes différentes
- **Capitaines fixes** : Désigner un capitaine par équipe
- Sauvegarde automatique des contraintes

### 🏆 Mode compétition
- Suivi des victoires par équipe
- Classement automatique avec podium (🥇🥈🥉)
- Historique complet des matchs
- Statistiques détaillées (matchs joués, victoires, défaites, ratio)
- Déclaration du vainqueur après coup
- Import/Export des données de compétition

### 📊 Statistiques avancées
- **Graphiques de répartition** : Distribution des niveaux par équipe (Chart.js)
- **Indicateur d'équilibrage** : Écart-type et qualité du tirage
- **Évolution historique** : Graphique d'évolution de l'équilibrage sur 20 tirages
- **Distribution globale** : Répartition des joueurs par niveau

### 📱 Fonctionnalités supplémentaires
- **Export PDF** : Télécharger les équipes en PDF
- **Partage WhatsApp** : Partager directement les résultats
- **Historique** : Consultation des tirages précédents
- **PWA** : Installable comme une app native
- **Offline-first** : Fonctionne sans connexion internet
- **Responsive** : S'adapte à tous les écrans

---

## 🚀 Démarrage rapide

### Installation locale

```bash
# Cloner le repository
git clone https://github.com/VOTRE_USERNAME/bonballon.git
cd bonballon

# Ouvrir dans un navigateur
# Double-cliquer sur index.html
# Ou utiliser un serveur local :
npx serve .
```

### Déploiement en ligne

**Option 1 : Netlify (Recommandé)**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Option 2 : GitHub Pages**
```bash
git push origin main
# Activer GitHub Pages dans Settings > Pages
```

Voir [QUICK_START.md](QUICK_START.md) pour plus de détails.

---

## 📱 Publication sur Play Store

Bonballon est prêt pour être publié sur le Google Play Store via TWA (Trusted Web Activity).

**Guide complet** : [PLAYSTORE_GUIDE.md](PLAYSTORE_GUIDE.md)  
**Checklist** : [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

### Résumé rapide

```bash
# 1. Déployer en ligne (Netlify)
netlify deploy --prod

# 2. Installer Bubblewrap
npm install -g @bubblewrap/cli

# 3. Générer l'app Android
bubblewrap init --manifest https://VOTRE_URL/manifest.json
bubblewrap build

# 4. Publier sur Play Store
# Uploader app-release-bundle.aab
```

---

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** / **CSS3** / **JavaScript (ES6)**
- **jQuery 1.11.3** - Manipulation DOM
- **Bootstrap 3.3.5** - Framework CSS responsive
- **Font Awesome 4.7.0** - Icônes
- **Chart.js 4.4.0** - Graphiques interactifs

### Bibliothèques
- **html2canvas** - Capture d'écran pour export
- **jsPDF** - Génération de PDF
- **Service Worker** - Fonctionnement offline

### Stockage
- **localStorage** - Persistance des données (100% local)

---

## 📂 Structure du projet

```
Bonballon/
├── index.html              # Page principale
├── results.html            # Affichage des résultats
├── history.html            # Historique des tirages
├── competition.html        # Mode compétition
├── privacy-policy.html     # Politique de confidentialité
├── manifest.json           # Manifest PWA
├── sw.js                   # Service Worker
├── netlify.toml           # Configuration Netlify
├── css/
│   ├── style.css          # Styles principaux
│   └── teams.css          # Styles des équipes
├── js/
│   ├── main.js            # Logique principale
│   ├── results.js         # Affichage résultats
│   ├── history.js         # Gestion historique
│   ├── constraints.js     # Contraintes personnalisées
│   ├── competition.js     # Mode compétition (données)
│   ├── competition-ui.js  # Mode compétition (UI)
│   ├── stats.js           # Statistiques et graphiques
│   └── pwa.js             # Installation PWA
├── images/
│   ├── icons/             # Icônes PWA (48-512px)
│   ├── logo.png
│   └── favicon.ico
├── .well-known/
│   └── assetlinks.json    # Configuration TWA
├── PLAYSTORE_GUIDE.md     # Guide Play Store
├── DEPLOYMENT_CHECKLIST.md # Checklist déploiement
└── QUICK_START.md         # Démarrage rapide
```

---

## 🎯 Utilisation

### 1. Créer un tirage

1. Saisir un titre pour votre tirage
2. Choisir le type : **Normal** ou **Niveau**
3. Ajouter les participants (ou importer une liste)
4. Si mode niveau : définir le niveau de chaque joueur (1-5)
5. Définir le nombre d'équipes
6. (Optionnel) Ajouter des contraintes personnalisées
7. Cliquer sur **"Générer les équipes"**

### 2. Consulter les résultats

- Voir les équipes générées
- Consulter les statistiques (mode niveau)
- Exporter en PDF ou partager sur WhatsApp
- Enregistrer le match dans le mode compétition

### 3. Mode compétition

1. Enregistrer un match depuis la page de résultats
2. Déclarer le vainqueur
3. Consulter le classement dans la page **Compétition**
4. Voir l'historique des matchs
5. Exporter/Importer les données

---

## 🔒 Vie privée

Bonballon respecte totalement votre vie privée :
- ✅ **Aucune collecte de données**
- ✅ **Stockage 100% local** (localStorage)
- ✅ **Aucun tracker** ou publicité
- ✅ **Aucun serveur externe**
- ✅ **Fonctionne offline**

Voir [privacy-policy.html](privacy-policy.html) pour plus de détails.

---

## 📊 Algorithme d'équilibrage

L'algorithme utilise une approche optimisée pour créer des équipes équilibrées :

1. **Tri par niveau** : Les joueurs sont triés du plus fort au plus faible
2. **Snake draft** : Distribution en zigzag pour équilibrer
3. **Application des contraintes** : Respect des joueurs ensemble/séparés et capitaines
4. **Calcul de l'écart-type** : Mesure de la qualité de l'équilibrage
5. **Shuffle interne** : Mélange des joueurs au sein de chaque équipe

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**XR Web**
- Site web : [xrweb06.netlify.app](https://xrweb06.netlify.app)
- Email : contact@bonballon.com

---

## 🙏 Remerciements

- [Bootstrap](https://getbootstrap.com/) pour le framework CSS
- [Chart.js](https://www.chartjs.org/) pour les graphiques
- [Font Awesome](https://fontawesome.com/) pour les icônes
- [Google Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) pour la conversion TWA

---

## 📱 Télécharger

- **Web** : [bonballon.app](https://bonballon.app)
- **Play Store** : *(Bientôt disponible)*
- **PWA** : Installable depuis le navigateur

---

**Fait avec ❤️ pour simplifier l'organisation de vos matchs**
