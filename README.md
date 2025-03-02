# Bonballon
Générateur d'équipes aléatoires

## Description
Bonballon est une application web qui permet de générer des équipes aléatoires à partir d'une liste de participants. L'application propose plusieurs fonctionnalités pour personnaliser la génération des équipes, notamment un mode de tri par niveau.

## Fonctionnalités

### Génération d'équipes
- Création d'équipes aléatoires à partir d'une liste de participants
- Possibilité d'importer une liste de participants par copier-coller
- Personnalisation du nombre d'équipes

### Mode Niveau
Le mode niveau permet de créer des équipes équilibrées en fonction du niveau de chaque participant :
- Chaque participant peut se voir attribuer un niveau de 1 à 5
- L'algorithme de répartition utilise une approche de "bin packing" modifiée pour équilibrer les équipes
- Les équipes sont générées de manière à ce que la somme des niveaux soit la plus équilibrée possible
- Affichage des statistiques d'équilibrage (score moyen, écart-type)
- Possibilité de regénérer les équipes si le résultat n'est pas satisfaisant

### Affichage des résultats
- Affichage clair des équipes générées
- Mise en évidence des niveaux des joueurs avec un code couleur
- Affichage du score total de chaque équipe (somme des niveaux)
- Option pour copier les résultats

## Utilisation
1. Saisissez un titre pour votre tirage
2. Choisissez le type de tirage (Normal ou Niveau)
3. Ajoutez les participants et, si le mode niveau est activé, définissez leur niveau
4. Définissez le nombre d'équipes souhaité
5. Cliquez sur "Générer les équipes"
6. Consultez les résultats et, si nécessaire, regénérez les équipes

## Technologies utilisées
- HTML5
- CSS3
- JavaScript
- jQuery
- Bootstrap
