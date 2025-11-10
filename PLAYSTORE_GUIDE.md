# 📱 Guide de publication sur Google Play Store

## 🎯 Méthode recommandée : TWA (Trusted Web Activity)

### Qu'est-ce qu'une TWA ?
Une TWA permet d'emballer votre PWA dans une application Android native sans réécrire le code. L'utilisateur ne voit aucune différence avec une app native.

---

## 📋 Prérequis

### 1. Héberger votre application
Votre PWA doit être accessible en ligne via HTTPS :
- **Option gratuite** : GitHub Pages, Netlify, Vercel
- **Option payante** : Votre propre domaine

### 2. Compte Google Play Developer
- Coût : 25$ (paiement unique)
- Inscription : https://play.google.com/console/signup

---

## 🚀 Étapes de publication

### Étape 1 : Héberger votre PWA

#### Option A : GitHub Pages (Gratuit)
```bash
# 1. Créer un repository GitHub
# 2. Pousser votre code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE_USERNAME/bonballon.git
git push -u origin main

# 3. Activer GitHub Pages
# Settings > Pages > Source: main branch
# URL: https://VOTRE_USERNAME.github.io/bonballon
```

#### Option B : Netlify (Gratuit, plus simple)
```bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Déployer
cd e:\GitHub\Bonballon
netlify deploy --prod

# Suivre les instructions
# URL: https://bonballon.netlify.app (ou votre domaine custom)
```

---

### Étape 2 : Utiliser Bubblewrap (Outil Google officiel)

Bubblewrap convertit automatiquement votre PWA en APK/AAB.

```bash
# 1. Installer Node.js (si pas déjà fait)
# Télécharger depuis https://nodejs.org

# 2. Installer Bubblewrap
npm install -g @bubblewrap/cli

# 3. Initialiser le projet TWA
bubblewrap init --manifest https://VOTRE_URL/manifest.json

# Répondre aux questions :
# - Domain: votre-domaine.com
# - Package name: com.bonballon.app
# - App name: Bonballon
# - Display mode: standalone
# - Orientation: portrait
# - Theme color: #23468C
# - Background color: #23468C
# - Icon URL: https://VOTRE_URL/images/icons/icon-512x512.png
# - Maskable icon: https://VOTRE_URL/images/icons/icon-512x512.png
# - Splash screen color: #23468C
# - Status bar color: #23468C

# 4. Générer le keystore (clé de signature)
keytool -genkey -v -keystore bonballon-key.keystore -alias bonballon -keyalg RSA -keysize 2048 -validity 10000

# Sauvegarder le mot de passe !

# 5. Builder l'APK/AAB
bubblewrap build

# Cela génère :
# - app-release-signed.apk (pour tester)
# - app-release-bundle.aab (pour le Play Store)
```

---

### Étape 3 : Obtenir le SHA-256 fingerprint

```bash
# Extraire le fingerprint de votre keystore
keytool -list -v -keystore bonballon-key.keystore -alias bonballon

# Copier la ligne "SHA256:"
# Exemple: A1:B2:C3:D4:E5:F6:...
```

Mettre à jour `assetlinks.json` avec ce fingerprint.

---

### Étape 4 : Héberger assetlinks.json

Placer le fichier `assetlinks.json` à la racine de votre site :
```
https://VOTRE_URL/.well-known/assetlinks.json
```

Créer le dossier `.well-known` si nécessaire.

---

### Étape 5 : Tester l'application

```bash
# Installer l'APK sur un appareil Android
adb install app-release-signed.apk

# Ou utiliser l'émulateur Android Studio
```

---

### Étape 6 : Préparer les assets pour le Play Store

#### Screenshots requis (minimum 2 par type)
- **Téléphone** : 1080x1920 ou 1080x2340
- **Tablette 7"** : 1200x1920 (optionnel)
- **Tablette 10"** : 1920x1200 (optionnel)

#### Icône de l'application
- **512x512 PNG** (déjà disponible ✅)

#### Bannière (Feature Graphic)
- **1024x500 PNG**

#### Description
- **Titre** : max 50 caractères
- **Description courte** : max 80 caractères
- **Description complète** : max 4000 caractères

---

### Étape 7 : Publier sur le Play Store

1. **Créer une application** dans la Play Console
   - https://play.google.com/console

2. **Remplir les informations**
   - Nom : Bonballon
   - Catégorie : Sports
   - Type de contenu : Tous publics
   - Politique de confidentialité : URL (voir ci-dessous)

3. **Uploader l'AAB**
   - Production > Créer une version
   - Uploader `app-release-bundle.aab`

4. **Ajouter les screenshots et descriptions**

5. **Remplir le questionnaire de contenu**

6. **Soumettre pour révision**
   - Délai : 1-7 jours généralement

---

## 📄 Documents requis

### Politique de confidentialité

Créer un fichier `privacy-policy.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Politique de confidentialité - Bonballon</title>
</head>
<body>
    <h1>Politique de confidentialité</h1>
    <p>Dernière mise à jour : [DATE]</p>
    
    <h2>Collecte de données</h2>
    <p>Bonballon ne collecte aucune donnée personnelle. Toutes les données sont stockées localement sur votre appareil.</p>
    
    <h2>Stockage local</h2>
    <p>L'application utilise le stockage local (localStorage) de votre navigateur pour sauvegarder :</p>
    <ul>
        <li>Vos tirages d'équipes</li>
        <li>L'historique des matchs</li>
        <li>Les contraintes personnalisées</li>
        <li>Les statistiques de compétition</li>
    </ul>
    
    <h2>Partage de données</h2>
    <p>Aucune donnée n'est partagée avec des tiers. Toutes vos informations restent sur votre appareil.</p>
    
    <h2>Contact</h2>
    <p>Pour toute question : contact@bonballon.com</p>
</body>
</html>
```

Héberger ce fichier et fournir l'URL dans le Play Store.

---

## 🎨 Créer les assets visuels

### Screenshots recommandés

Capturer des screenshots de :
1. **Page d'accueil** avec le formulaire
2. **Résultats** d'un tirage avec équipes
3. **Mode compétition** avec classement
4. **Statistiques** avec graphiques
5. **Contraintes personnalisées**

### Bannière Feature Graphic (1024x500)

Créer une image avec :
- Logo Bonballon
- Slogan : "Créez des équipes équilibrées en un clic"
- Couleur de fond : #23468C
- Icônes de sport

---

## 📝 Descriptions suggérées

### Titre (50 caractères max)
```
Bonballon - Générateur d'équipes
```

### Description courte (80 caractères max)
```
Créez des équipes équilibrées pour vos activités sportives en quelques clics
```

### Description complète
```
🏃 Bonballon - Le générateur d'équipes intelligent

Organisez vos matchs et activités sportives en créant des équipes parfaitement équilibrées !

✨ FONCTIONNALITÉS PRINCIPALES

🎲 Génération aléatoire
• Créez des équipes équilibrées instantanément
• Mode normal ou mode niveau (équilibrage par compétence)
• Algorithme optimisé pour un équilibrage parfait

⚙️ Contraintes personnalisées
• Joueurs qui doivent jouer ensemble
• Joueurs qui doivent être séparés
• Désignation de capitaines par équipe

🏆 Mode compétition
• Suivez les victoires de chaque équipe
• Classement automatique avec podium
• Historique complet des matchs
• Déclaration du vainqueur après coup

📊 Statistiques avancées
• Graphiques de répartition des niveaux
• Indicateur d'équilibrage (écart-type)
• Évolution de la qualité des tirages
• Distribution des joueurs par niveau

📱 AVANTAGES

✅ 100% gratuit, sans publicité
✅ Fonctionne hors ligne
✅ Données stockées localement (vie privée)
✅ Interface moderne et intuitive
✅ Import/Export des données
✅ Partage WhatsApp des résultats
✅ Export PDF des équipes

🎯 PARFAIT POUR

• Football, basketball, volleyball
• Badminton, tennis, padel
• Jeux de société en équipe
• Activités scolaires et associatives
• Tournois et compétitions

📥 Téléchargez Bonballon et simplifiez l'organisation de vos matchs !
```

---

## ⚠️ Checklist avant publication

- [ ] PWA hébergée en HTTPS
- [ ] manifest.json valide
- [ ] Service Worker fonctionnel
- [ ] Toutes les icônes présentes (48 à 512px)
- [ ] assetlinks.json configuré et hébergé
- [ ] AAB généré et signé
- [ ] Screenshots préparés (min 2)
- [ ] Feature graphic créé (1024x500)
- [ ] Politique de confidentialité publiée
- [ ] Description rédigée
- [ ] Compte Play Developer créé (25$)
- [ ] Application testée sur appareil réel

---

## 🆘 Ressources utiles

- **Bubblewrap** : https://github.com/GoogleChromeLabs/bubblewrap
- **TWA Guide** : https://developer.chrome.com/docs/android/trusted-web-activity/
- **Play Console** : https://play.google.com/console
- **Asset Studio** : https://romannurik.github.io/AndroidAssetStudio/
- **Screenshot Generator** : https://screenshots.pro/

---

## 💡 Conseils

1. **Testez d'abord en interne** : Utilisez la version "Internal Testing" du Play Store
2. **Demandez des retours** : Partagez avec des amis avant la publication publique
3. **Optimisez les screenshots** : Ajoutez du texte explicatif sur les images
4. **Mots-clés** : Utilisez "équipes", "sport", "tirage", "football" dans la description
5. **Mises à jour** : Prévoyez des mises à jour régulières (Google favorise les apps actives)

---

## 🎉 Après la publication

- Répondez aux avis utilisateurs
- Surveillez les crashs (Play Console > Qualité)
- Ajoutez des fonctionnalités demandées
- Faites la promotion sur les réseaux sociaux

Bonne chance ! 🚀
