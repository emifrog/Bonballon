# 🚀 Guide rapide de déploiement

## Option la plus simple : Netlify (5 minutes)

### 1. Installer Netlify CLI

```bash
npm install -g netlify-cli
```

### 2. Déployer

```bash
cd e:\GitHub\Bonballon
netlify login
netlify deploy --prod
```

Suivez les instructions :
- Create & configure a new site
- Team: Votre compte
- Site name: `bonballon` (ou autre nom disponible)
- Publish directory: `.` (point)

Votre app sera disponible à : `https://bonballon.netlify.app`

### 3. Générer l'app Android

```bash
# Installer Bubblewrap
npm install -g @bubblewrap/cli

# Initialiser
bubblewrap init --manifest https://bonballon.netlify.app/manifest.json

# Créer la clé de signature
keytool -genkey -v -keystore bonballon-key.keystore -alias bonballon -keyalg RSA -keysize 2048 -validity 10000

# Builder
bubblewrap build
```

### 4. Obtenir le SHA-256

```bash
keytool -list -v -keystore bonballon-key.keystore -alias bonballon
```

Copier la valeur SHA256 et la mettre dans `.well-known/assetlinks.json`

### 5. Redéployer avec assetlinks

```bash
netlify deploy --prod
```

### 6. Tester

```bash
# Installer sur un appareil Android
adb install app-release-signed.apk
```

### 7. Publier sur Play Store

1. Créer un compte Play Developer (25$)
2. Créer une application
3. Uploader `app-release-bundle.aab`
4. Remplir la fiche (voir DEPLOYMENT_CHECKLIST.md)
5. Soumettre pour révision

---

## Fichiers importants

- `PLAYSTORE_GUIDE.md` - Guide complet étape par étape
- `DEPLOYMENT_CHECKLIST.md` - Checklist détaillée
- `privacy-policy.html` - Politique de confidentialité
- `.well-known/assetlinks.json` - Configuration TWA
- `netlify.toml` - Configuration Netlify

---

## Support

En cas de problème, consultez :
- PLAYSTORE_GUIDE.md pour les détails
- DEPLOYMENT_CHECKLIST.md pour la checklist complète
- https://github.com/GoogleChromeLabs/bubblewrap pour Bubblewrap

Bonne chance ! 🎉
