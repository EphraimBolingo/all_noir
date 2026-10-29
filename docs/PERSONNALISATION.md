# Guide de personnalisation

Les contenus éditoriaux sont regroupés dans `src/data/content.js`. Modifiez ce fichier avec un éditeur de texte ; il n'est pas nécessaire de toucher aux animations pour mettre à jour les profils.

## Références des contenus

| Élément | Fichier / clé | Format | Si le champ reste vide |
|---|---|---|---|
| Noms, alias, spécialités, biographies | `src/data/content.js` → `profiles.allcod` / `profiles.veufnoir` | Texte | Le texte initial est conservé |
| Portraits | `profiles.allcod.portrait` / `profiles.veufnoir.portrait` | Chemin vers une photo locale dans `assets/images/` | `ephraim.webp` et `pedro.webp` sont associés aux profils correspondants |
| Outils affichés en icônes et formations | `profiles.allcod.tools` / `education` | Outils avec un nom accessible et un identifiant d’icône ; tableau de textes pour la formation | Les icônes apparaissent uniquement pour les outils configurés |
| Compétences détaillées | `profiles.<profil>.skills` | Tableau de textes | Informations éditoriales non rendues comme pastilles |
| Projets individuels | `profiles.<profil>.projects` | Tableau d'objets | Trois projets All Cod et deux projets VeufNoir sont renseignés |
| Projet commun | `collaborations` | Tableau d'objets | Net-Rapide regroupe son site et sa plateforme de suivi des clients |
| Image de projet | `projects[].image` ou `collaborations[].image` | Chemin vers un SVG/JPG/PNG/WebP local | Les illustrations sont signalées comme démonstrations tant qu'aucune capture authentique n'est fournie |
| Numéro partagé | `contact.sharedPhone` | Numéro international, sans espaces recommandés | « À renseigner » est affiché |
| E-mail et profils | `contact.allcod` / `contact.veufnoir` | E-mail ou URL HTTPS complète | Le contact vide n'est pas transformé en lien |
| Certificats et attestations | `certificates` | Tableau d'objets (voir ci-dessous) | Le carrousel est filtrable par organisme de formation |
| Couleurs et animations | `src/css/styles.css` → variables `:root` et règles `@keyframes` | CSS | La palette actuelle est conservée |
| Images d'illustration | `assets/images/` | SVG, PNG, JPG ou WebP | Utilisez les chemins d'image de démonstration existants |

## Modifier les profils

Dans `src/data/content.js`, mettez à jour les champs du profil correspondant. Les noms et biographies visibles sont rendus depuis ces champs. Les compétences sont une liste simple :

```js
skills: ["Réseaux informatiques", "Administration réseau"]
```

Les outils d’All Cod sont affichés sous forme de petits SVG définis par `tools`, avec leurs noms disponibles pour les lecteurs d’écran et au survol. `skills` conserve une liste détaillée pour référence. VeufNoir conserve ses pastilles textuelles `tags`. Conservez la formulation exacte des qualifications documentées et n’ajoutez des dates ou distinctions que si elles ont été vérifiées.

Les portraits actuels se trouvent dans `assets/images/ephraim.webp` et `assets/images/pedro.webp`. Pour remplacer une photo, mettez à jour le fichier ou le champ `portrait` du profil correspondant. Les formats JPG, PNG, WebP et AVIF sont acceptés ; si une image configurée est absente, la fiche affiche un emplacement de remplacement.

## Ajouter ou remplacer un projet

Chaque objet de projet accepte les champs suivants :

```js
{
  id: "allcod-01",
  isDemo: false,
  title: "Titre réel",
  description: "Description factuelle",
  image: "assets/images/mon-visuel.webp",
  imageIsDemo: false,
  gallery: [
    { src: "assets/images/capture-01.webp", alt: "Page d’accueil du projet" },
    { src: "assets/images/capture-02.webp", alt: "Espace de gestion du projet" }
  ],
  category: "allcod",
  status: "En ligne",
  role: "Contribution confirmée",
  technologies: ["HTML", "CSS"],
  demoUrl: "https://exemple.page.gd/",
  sourceUrl: ""
}
```

Pour les projets individuels, `category` vaut `allcod` ou `veufnoir` selon le tableau. Pour les projets communs, conservez `category: "collaborations"` et renseignez les rôles dans `roles.allcod` et `roles.veufnoir`. `role` complète les informations individuelles ; ne renseignez que des informations confirmées.

Retirez les champs inconnus ou laissez-les vides. `isDemo` indique un emplacement de projet fictif ; `imageIsDemo` permet de signaler séparément une illustration de remplacement pour un projet réel. `status` est facultatif. Les technologies, contributions facultatives et liens non renseignés ne sont pas affichés. Aucune date n'est affichée sur les cartes de projet. Les URL de site et de code source ne s'affichent que lorsqu'elles sont renseignées ; les URL externes doivent être en HTTPS.

Pour afficher plusieurs images d’un projet, ajoutez leurs chemins locaux et leurs descriptions dans `gallery`. À partir de deux images valides, la carte affiche un carrousel manuel avec commandes accessibles au clavier ; sans galerie ou avec une seule image, elle conserve un aperçu simple. Le carrousel ne défile pas automatiquement. Les projets UCKIM et Grand Hôtel Ledya de VeufNoir utilisent chacun quatre photos réelles dans leur carrousel.

Le portfolio comprend actuellement trois projets All Cod, deux projets VeufNoir et un projet commun Net-Rapide. Pour présenter plusieurs livrables sous un seul projet commun, renseignez `deliverables` :

```js
deliverables: [
  { title: "Site web", description: "Présentation du site." },
  { title: "Plateforme client", description: "Suivi et gestion des clients." }
]
```

Les projets communs peuvent en plus renseigner `status` et les rôles `roles.allcod` et `roles.veufnoir`. Ne complétez ces informations qu'à partir des contributions réelles.

## Ajouter des attestations ou certificats

1. Copiez le document authentique dans `assets/certificates/`. Les formats image conseillés sont WebP, PNG ou JPG ; un PDF peut être affiché dans la visionneuse si le navigateur le prend en charge.
2. Ouvrez `src/data/content.js` et ajoutez un objet à `certificates`.
3. Renseignez uniquement les informations effectivement visibles ou vérifiées :

```js
certificates: [
  {
    id: "document-01",
    title: "REMPLACEZ PAR LE TITRE EXACT",
    issuer: "Nom réel de l’organisme",
    person: "allcod",
    kind: "Attestation de formation",
    category: "coursera",
    date: "",
    description: "",
    preview: "assets/certificates/document-01.webp",
    file: "assets/certificates/document-01.pdf",
    fileType: "pdf",
    verificationUrl: ""
  }
]
```

Valeurs reconnues pour `person` : `allcod` ou `veufnoir`. `kind` décrit le document réel (diplôme, attestation ou certificat). `date`, `description` et `verificationUrl` sont facultatifs. N'ajoutez un lien de vérification que s'il mène à une page authentique en HTTPS. Ne créez pas de faux certificat, de numéro ou de date.

Valeurs de `category` utilisées par les filtres : `coursera` et `ccna`. Les certificats Coursera de Pedro peuvent être ajoutés ici avec `person: "veufnoir"` et `category: "coursera"`. CCNA 1, CCNA 2 et CCNA 3 sont trois documents distincts : créez un objet par certificat et associez à chacun son propre `preview` et son propre `file` dès que les images sont disponibles.

Pour une image seule, indiquez `file` avec le chemin de l'image et le type d'image correspondant, ou laissez `fileType` vide : le fichier image sera détecté par son extension. `preview` est facultatif ; si absent, la vignette présente un emplacement sans fabriquer d'aperçu. Le fichier original peut être ouvert séparément depuis la visionneuse. Si un PDF ne s'affiche pas intégré dans un navigateur, le lien du fichier original reste disponible.

Pour retirer ou remplacer un document, supprimez ou modifiez son objet dans `certificates`, puis ajoutez ou remplacez les fichiers correspondants dans `assets/certificates/`. Les filtres d'organisme et de personne sont calculés à partir des documents réellement présents.

## Modifier les coordonnées

Renseignez `contact.sharedPhone`, puis les champs `email`, `github`, `linkedin` et `website` sous chaque profil de contact dans `src/data/content.js`. Les adresses e-mail deviennent des liens `mailto:` ; les liens sociaux et sites externes doivent être des URL HTTPS. Aucun formulaire d'envoi n'est inclus.

## Remplacer les illustrations

Les illustrations incluses dans `assets/images/` sont des schémas abstraits de démonstration. Remplacez-les par des fichiers locaux en conservant les chemins et noms actuels, ou mettez à jour le champ `image` correspondant. Dimensions indicatives des illustrations de projet : ratio proche de 1,85:1. L'affichage conserve le cadrage sans étirer l'image.

## Ajouter la vidéo du hero

La vidéo d'ambiance actuelle se trouve dans `assets/videos/hero.mp4`. Elle couvre toute la section hero, avec le titre et les quatre accès rapides au premier plan. Pour la remplacer, copiez un fichier MP4 ou WebM dans `assets/videos/`, puis modifiez `data-video-src` sur l'élément `#hero-vortex-video` de `index.html`. Une image de repli demeure visible si la vidéo ne peut pas être chargée. La vidéo est muette, en boucle, sans contrôles et elle n'est pas chargée si `prefers-reduced-motion` est activé. Pour conserver un rendu professionnel, privilégiez une boucle courte et fluide, un mouvement lent, une luminosité maîtrisée, sans flash ni texte incrusté ; gardez tout élément ajouté au premier plan lisible sur la vidéo. N'y montrez pas d'adresses IP, de comptes ou de données de réseau réels.

## Simplifier les animations et tester

- Les animations principales sont décrites par les règles `@keyframes` de `src/css/styles.css`.
- La préférence système `prefers-reduced-motion` coupe les animations et le défilement fluide.
- Le bouton « Passer l’introduction » termine la séquence d'ouverture immédiatement.
- Le site utilise seulement HTML, CSS, JS et SVG locaux. Ouvrez `index.html` directement ou lancez `python -m http.server 8000` depuis le dossier du site.
- Testez les changements au clavier, sur une fenêtre étroite et avec la réduction des animations activée dans le système.
