# Contenus à remplacer avant publication

Le site distingue les informations confirmées des éléments encore attendus. Les entrées marquées ci-dessous comme démonstration ne décrivent pas des réalisations réelles.

## Projets

| Emplacement actuel | Quantité | À fournir |
|---|---:|---|
| Projets individuels All Cod | 3 | Titre, résumé factuel, visuel authentique, technologies, état, liens de démo et de code source lorsqu'ils existent |
| Projets individuels VeufNoir | 2 | Titre, résumé factuel, visuel authentique, technologies, état, liens disponibles |
| Projets collaboratifs All Cod × VeufNoir | 2 | Titre, description, visuel authentique, technologies, état, rôle de chacun et liens disponibles |

Modifiez les tableaux `profiles.allcod.projects`, `profiles.veufnoir.projects` et `collaborations` dans `src/data/content.js`. Remplacez `isDemo: true` par `isDemo: false` lorsque l'entrée représente désormais un projet réel. Ne renseignez que les contributions confirmées.

## Documents de formation

Aucun fichier de certificat ou d'attestation n'est fourni dans cette version. Ajoutez les documents authentiques Coursera et Orange Digital Center (et tout autre document utile) dans `assets/certificates/`, puis leurs métadonnées dans `certificates` de `src/data/content.js`. Le type, le titulaire, les dates et les liens de vérification doivent être vérifiés sur les documents originaux.

## Coordonnées et liens

Les coordonnées ne sont pas encore fournies. Complétez `contact.sharedPhone`, `contact.allcod` et `contact.veufnoir` dans `src/data/content.js` avec le numéro partagé, les adresses e-mail, profils sociaux et liens professionnels réels.

## Visuels

Les SVG dans `assets/images/` sont des schémas abstraits de démonstration, pas des captures d'écran de projets. Remplacez les champs `image` d'un projet par un visuel réel que vous êtes autorisé à publier. La marque dans `assets/icons/duality-mark.svg` est une création locale provisoire, pas un logo institutionnel.

## Informations volontairement non inventées

- Les biographies sont modifiables et n'affirment aucune expérience professionnelle non communiquée.
- Aucun établissement, année d'obtention, intitulé de certificat ou référence de vérification n'est renseigné.
- La formation CCNA 1, 2 et 3 est indiquée comme suivie ; aucune certification CCNA n'est revendiquée.
