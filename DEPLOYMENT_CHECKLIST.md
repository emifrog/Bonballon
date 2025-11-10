# ✅ Checklist de déploiement Play Store

## 📱 Avant de commencer

- [ ] Compte Google Play Developer créé (25$ unique)
- [ ] Node.js installé (version 16+)
- [ ] Android Studio installé (pour tester)
- [ ] Domaine ou hébergement HTTPS prêt

---

## 🌐 Étape 1 : Hébergement

### Option A : Netlify (Recommandé - Gratuit)
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
cd e:\GitHub\Bonballon
netlify deploy --prod

# Suivre les instructions
# Votre URL sera : https://bonballon.netlify.app
```

- [ ] Application déployée sur Netlify
- [ ] URL HTTPS fonctionnelle
- [ ] Toutes les pages accessibles
- [ ] PWA installable depuis le navigateur

### Option B : GitHub Pages (Gratuit)
```bash
# Créer un repo GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/bonballon.git
git push -u origin main

# Activer GitHub Pages dans Settings > Pages
# URL : https://USERNAME.github.io/bonballon
```

- [ ] Repository GitHub créé
- [ ] Code poussé
- [ ] GitHub Pages activé
- [ ] URL accessible

---

## 🔧 Étape 2 : Configuration TWA

### Installer Bubblewrap
```bash
npm install -g @bubblewrap/cli
```

- [ ] Bubblewrap installé

### Initialiser le projet
```bash
cd e:\GitHub\Bonballon
bubblewrap init --manifest https://VOTRE_URL/manifest.json
```

**Réponses suggérées :**
- Domain: `votre-domaine.com` ou `bonballon.netlify.app`
- Package name: `com.bonballon.app`
- App name: `Bonballon`
- Display mode: `standalone`
- Orientation: `portrait`
- Theme color: `#23468C`
- Background color: `#23468C`
- Icon URL: `https://VOTRE_URL/images/icons/icon-512x512.png`
- Maskable icon: `https://VOTRE_URL/images/icons/icon-512x512.png`
- Splash screen color: `#23468C`
- Status bar color: `#23468C`

- [ ] Projet TWA initialisé
- [ ] Fichier `twa-manifest.json` créé

---

## 🔑 Étape 3 : Génération de la clé de signature

```bash
# Générer le keystore
keytool -genkey -v -keystore bonballon-key.keystore -alias bonballon -keyalg RSA -keysize 2048 -validity 10000

# Informations suggérées :
# - Mot de passe : [CHOISIR UN MOT DE PASSE FORT]
# - Prénom et nom : Votre nom
# - Unité organisationnelle : Bonballon
# - Organisation : Bonballon
# - Ville : Votre ville
# - État : Votre région
# - Code pays : FR
```

- [ ] Keystore créé
- [ ] Mot de passe sauvegardé en lieu sûr
- [ ] Fichier `bonballon-key.keystore` sauvegardé

⚠️ **IMPORTANT** : Ne perdez jamais ce fichier et ce mot de passe ! Vous en aurez besoin pour toutes les mises à jour futures.

---

## 🔐 Étape 4 : Configuration assetlinks.json

```bash
# Obtenir le SHA-256 fingerprint
keytool -list -v -keystore bonballon-key.keystore -alias bonballon

# Copier la valeur SHA256
```

- [ ] SHA-256 fingerprint obtenu
- [ ] Fichier `assetlinks.json` mis à jour avec le fingerprint
- [ ] Créer le dossier `.well-known` à la racine
- [ ] Copier `assetlinks.json` dans `.well-known/`
- [ ] Fichier accessible à : `https://VOTRE_URL/.well-known/assetlinks.json`

---

## 🏗️ Étape 5 : Build de l'application

```bash
# Builder l'AAB (Android App Bundle)
bubblewrap build

# Cela génère :
# - app-release-signed.apk (pour tester)
# - app-release-bundle.aab (pour le Play Store)
```

- [ ] Build réussi sans erreur
- [ ] Fichier `app-release-bundle.aab` généré
- [ ] Fichier `app-release-signed.apk` généré

---

## 🧪 Étape 6 : Tests

### Test sur émulateur
```bash
# Lancer Android Studio
# Tools > AVD Manager > Create Virtual Device
# Installer l'APK
adb install app-release-signed.apk
```

### Test sur appareil réel
```bash
# Activer le mode développeur sur votre téléphone
# Connecter en USB
# Installer l'APK
adb install app-release-signed.apk
```

**Points à vérifier :**
- [ ] L'app s'ouvre correctement
- [ ] Toutes les pages sont accessibles
- [ ] Les fonctionnalités marchent (génération d'équipes, contraintes, compétition, stats)
- [ ] Le mode offline fonctionne
- [ ] Les exports (PDF, JSON) fonctionnent
- [ ] Le partage WhatsApp fonctionne
- [ ] Pas de barre d'adresse visible (mode standalone)
- [ ] L'icône et le splash screen s'affichent correctement

---

## 🎨 Étape 7 : Préparer les assets visuels

### Screenshots (minimum 2, maximum 8)

**Téléphone (1080x1920 ou 1080x2340)**
- [ ] Screenshot 1 : Page d'accueil avec formulaire
- [ ] Screenshot 2 : Résultats avec équipes générées
- [ ] Screenshot 3 : Mode compétition avec classement
- [ ] Screenshot 4 : Statistiques avec graphiques
- [ ] Screenshot 5 : Contraintes personnalisées

**Outils pour créer des screenshots :**
- Utiliser l'émulateur Android Studio
- Ou https://screenshots.pro/ pour ajouter des cadres de téléphone

### Feature Graphic (1024x500)
- [ ] Bannière créée avec logo et slogan
- [ ] Couleurs de marque (#23468C)
- [ ] Texte lisible

**Outils :**
- Canva : https://www.canva.com/
- Figma : https://www.figma.com/

### Icône haute résolution (512x512)
- [ ] Déjà disponible dans `images/icons/icon-512x512.png` ✅

---

## 📝 Étape 8 : Préparer les textes

### Titre de l'application (max 50 caractères)
```
Bonballon - Générateur d'équipes
```
- [ ] Titre défini (48 caractères)

### Description courte (max 80 caractères)
```
Créez des équipes équilibrées pour vos activités sportives en quelques clics
```
- [ ] Description courte définie (77 caractères)

### Description complète (max 4000 caractères)
- [ ] Description complète rédigée (voir PLAYSTORE_GUIDE.md)

### Catégorie
- [ ] Catégorie choisie : **Sports** (ou Outils)

### Tags/Mots-clés
```
équipes, sport, football, tirage, aléatoire, compétition, tournoi, match
```
- [ ] Mots-clés définis

---

## 🏪 Étape 9 : Configuration Play Console

### Créer l'application
1. Aller sur https://play.google.com/console
2. Créer une application
3. Choisir la langue par défaut : Français

- [ ] Application créée dans la Play Console
- [ ] Nom de l'application : Bonballon

### Fiche du Store
- [ ] Titre court ajouté
- [ ] Description complète ajoutée
- [ ] Screenshots uploadés (min 2)
- [ ] Feature graphic uploadé
- [ ] Icône de l'application uploadée
- [ ] Catégorie sélectionnée : Sports
- [ ] Email de contact ajouté
- [ ] Politique de confidentialité ajoutée (URL)

### Classification du contenu
- [ ] Questionnaire rempli
- [ ] Classification : Tous publics (PEGI 3)
- [ ] Aucune publicité
- [ ] Aucun achat intégré

### Prix et distribution
- [ ] Application gratuite sélectionnée
- [ ] Pays de distribution sélectionnés (France, Belgique, Suisse, Canada, etc.)
- [ ] Consentement aux directives Google

### Politique de confidentialité
- [ ] Fichier `privacy-policy.html` hébergé
- [ ] URL ajoutée dans la Play Console

---

## 📦 Étape 10 : Upload de l'AAB

### Production
1. Aller dans Production > Créer une version
2. Uploader `app-release-bundle.aab`
3. Remplir les notes de version

**Notes de version (exemple) :**
```
Version 1.0.0 - Première version

✨ Fonctionnalités :
• Génération d'équipes aléatoires
• Mode niveau pour équilibrage par compétence
• Contraintes personnalisées
• Mode compétition avec classement
• Statistiques et graphiques
• Export PDF et partage WhatsApp
• Fonctionne 100% hors ligne
```

- [ ] AAB uploadé
- [ ] Notes de version rédigées
- [ ] Version nommée : 1.0.0 (code version : 1)

---

## ✅ Étape 11 : Révision finale

### Vérifications finales
- [ ] Toutes les sections de la fiche complétées (100%)
- [ ] Aucun avertissement dans la Play Console
- [ ] Politique de confidentialité accessible
- [ ] assetlinks.json accessible en ligne
- [ ] Application testée sur appareil réel
- [ ] Tous les assets visuels uploadés

### Soumettre pour révision
- [ ] Bouton "Envoyer pour révision" cliqué
- [ ] Email de confirmation reçu

**Délai de révision :** Généralement 1-7 jours

---

## 🎉 Après la publication

### Suivi
- [ ] Surveiller les avis utilisateurs
- [ ] Répondre aux commentaires
- [ ] Vérifier les rapports de crash (Play Console > Qualité)
- [ ] Analyser les statistiques d'installation

### Promotion
- [ ] Partager sur les réseaux sociaux
- [ ] Créer une page de présentation
- [ ] Demander des avis à vos premiers utilisateurs

### Mises à jour
- [ ] Planifier des mises à jour régulières
- [ ] Corriger les bugs signalés
- [ ] Ajouter les fonctionnalités demandées

---

## 📞 Support

### En cas de problème

**Bubblewrap :**
- Documentation : https://github.com/GoogleChromeLabs/bubblewrap
- Issues : https://github.com/GoogleChromeLabs/bubblewrap/issues

**Play Console :**
- Centre d'aide : https://support.google.com/googleplay/android-developer
- Forum : https://support.google.com/googleplay/android-developer/community

**TWA :**
- Guide officiel : https://developer.chrome.com/docs/android/trusted-web-activity/

---

## 🔄 Mises à jour futures

Pour publier une mise à jour :

```bash
# 1. Mettre à jour votre code
# 2. Redéployer sur Netlify/GitHub Pages
# 3. Incrémenter la version dans twa-manifest.json
# 4. Rebuild l'AAB
bubblewrap update
bubblewrap build

# 5. Uploader le nouveau AAB dans Play Console
```

- Incrémenter le `versionCode` (1, 2, 3, ...)
- Incrémenter le `versionName` (1.0.0, 1.1.0, 1.2.0, ...)

---

**Bonne chance pour votre publication ! 🚀**
