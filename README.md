# DUALITY — All Cod × VeufNoir

Portfolio statique en français conçu à partir des maquettes transmises : interface sombre, repères techniques, typographie condensée, cyan pour All Cod et orange pour VeufNoir. Le contenu distingue les deux profils et leurs travaux individuels des projets communs. Les projets, visuels, certificats et coordonnées encore absents restent explicitement des emplacements à compléter.

## Technologies

- HTML sémantique, CSS et JavaScript natifs
- Illustrations SVG locales
- Aucun paquet à installer, aucune compilation et aucun service externe requis
- Le site peut être ouvert directement avec `index.html`. Un serveur local est conseillé pour tester les mêmes conditions qu'un hébergement web.

## Lancer localement

### Ouverture directe

Extrayez le ZIP, puis ouvrez `index.html` depuis le dossier extrait dans un navigateur récent.

### Serveur local (facultatif)

Avec Python 3, depuis le dossier `duality-portfolio` :

```powershell
python -m http.server 8000
```

Ouvrez ensuite <http://localhost:8000>. Arrêtez le serveur avec `Ctrl+C`.

Il n'y a pas de commande de construction ou de dépendance à installer.

## Structure

```text
duality-portfolio/
├── index.html
├── README.md
├── assets/
│   ├── certificates/       # Certificats authentiques de Coursera
│   ├── icons/              # Marque SVG locale
│   ├── images/             # Illustrations techniques locales
│   └── videos/             # Vidéo d'ambiance facultative pour le hero
├── docs/
│   └── PERSONNALISATION.md
└── src/
    ├── css/styles.css      # Palette, mise en page, responsive, animations
    ├── data/content.js     # Profils, compétences, projets, certificats, contacts
    └── js/app.js           # Rendu des données et interactions accessibles
```

## Personnalisation

Modifiez les informations regroupées dans `src/data/content.js`. Les biographies, portraits, compétences, tableaux de projets, coordonnées et la liste `certificates` y sont centralisés. Chaque fiche de profil dispose d'un emplacement photo configurable ; consultez le guide [`docs/PERSONNALISATION.md`](docs/PERSONNALISATION.md) et la [liste des contenus à remplacer](docs/CONTENUS-A-REMPLACER.md).

Le portfolio présente trois projets individuels d’All Cod, deux projets individuels de VeufNoir et un projet commun, Net-Rapide. La carte Net-Rapide regroupe son site et sa plateforme de suivi des clients. Les projets UCKIM et Grand Hôtel Ledya affichent chacun quatre photos réelles dans leur carrousel, qui défile automatiquement toutes les deux secondes et s’arrête au survol, au focus clavier, hors écran ou lorsque la réduction des animations est demandée. Les coordonnées laissées vides restent signalées comme à renseigner. La galerie propose un carrousel de documents et les filtres « Tous les documents », « Coursera » et « CCNA ». Elle contient quatre certificats Coursera authentiques d’Ephraïm et trois entrées CCNA distinctes obtenues par Pedro ; les images de ces certificats restent à ajouter.

Les ressources locales reçoivent une version dans leur URL pour éviter de réutiliser une ancienne copie en cache. À chaque publication, incrémentez la valeur `v` dans les références d’assets de `index.html` ; les images, vidéos et documents chargés par JavaScript reprennent automatiquement cette version.

## Limites et ressources externes

- Aucun formulaire d'envoi n'est simulé : ajoutez de vraies coordonnées avant diffusion.
- Les prochains certificats ou attestations devront être ajoutés avec leurs métadonnées dans `src/data/content.js`.
- Les trois certificats CCNA de Pedro sont enregistrés séparément ; leurs images manquantes sont explicitement signalées en attendant leur ajout.
- L'intégration d'un PDF dépend du navigateur ; un lien vers le fichier original est aussi proposé.
- Les polices système sont utilisées, sans chargement distant.
- La vidéo locale `assets/videos/hero.mp4` couvre toute la section hero ; le titre et les quatre accès rapides sont superposés à l’image. Son poster WebP de 28 Ko, recadré pour masquer le logo visible dans le clip, s’affiche pendant le chargement. La vidéo est chargée avec une priorité basse pour ne pas retarder les images ; sa lecture est relancée quand le navigateur réaffiche la page ou que la connexion revient. Sur grand écran, le même recadrage est appliqué à la vidéo. Le chargement est ignoré lorsque la réduction des animations est demandée. La vidéo dure environ 10 secondes, mesure 1280 × 720 et pèse environ 2,8 Mo ; son affichage animé dépend toujours de la connexion et de l’hébergement. Les carrousels de projets préchargent les images alternatives lorsque leurs cartes approchent de l’écran, sauf en mode économie de données ou sur une connexion 2G. Les panneaux de code et d’architecture réseau sont actuellement masqués. La vidéo est muette et en boucle.
- Les projets de Pedro utilisent les huit photos qu’il a fournies. Les schémas réseau de profil restent illustratifs et ne réalisent aucune analyse.
- L'introduction animée est courte, peut être passée et respecte `prefers-reduced-motion`. La navigation et le contenu ne dépendent ni de WebGL ni d'une connexion réseau.

## Vérifications effectuées

- Ouverture de `index.html` et exécution du JavaScript dans le navigateur intégré.
- Filtres vérifiés : 1 projet commun, 3 All Cod, 2 VeufNoir et 6 au total ; tri par titre également vérifié.
- Le SVG d'architecture réseau s'affiche sans erreur ; le maillage abstrait du hero a été retiré.
- Le paragraphe de présentation commune demandé a été retiré ; les portraits fournis sont associés aux deux fiches.
- Le code et l'architecture restent côte à côte dans deux panneaux de même largeur, y compris sur mobile ; le code et le schéma réseau ont des formats adaptés aux panneaux étroits.
- La disposition côte à côte a été contrôlée à 320, 360, 390, 520, 768 et 1 440 px. Le bouton pour passer l'introduction fonctionne et `prefers-reduced-motion` affiche un état stable.
- Sur mobile, la hauteur du hero suit son contenu au lieu de réserver artificiellement la hauteur de l'écran ; un schéma réseau vertical dédié limite les marges vides dans le panneau étroit.
- Le calque vidéo couvre toute la section hero à 390 et 1 440 px ; le titre et les quatre accès restent visibles au-dessus, sans débordement horizontal. Le navigateur intégré actuel ne décode pas le fichier vidéo remplacé ; sa lecture n’a donc pas pu être confirmée.

Le contenu réel de certificats et de coordonnées n'étant pas fourni, les parcours image/PDF de la visionneuse n'ont pas été rejoués dans cette vérification. Le PDF intégré dépend du navigateur. Aucun audit automatisé d'accessibilité, de Web Vitals ou de performance n'a été exécuté.
