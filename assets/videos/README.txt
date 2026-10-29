VIDEO D'AMBIANCE DU HERO

La vidéo actuelle est hero.mp4 ; son chemin est défini dans l'attribut
data-video-src de l'élément #hero-vortex-video dans index.html. Le JavaScript
assigne immédiatement cette source avec preload="auto" ; cette affectation
démarre le chargement. Ne pas appeler load() après cette affectation, car cela
redémarre la requête.
Remplacez-la ici et mettez à jour ce chemin pour utiliser un autre fichier.

Formats acceptés : MP4 (H.264) ou WebM.
Préférences : boucle courte et fluide, mouvement lent, contraste modéré,
aucun flash, aucune piste audio nécessaire.
La vidéo actuelle dure environ 10 secondes, mesure 1280 × 720 et pèse environ
5,5 Mo. Son index MP4 précède les images vidéo pour permettre la lecture
progressive. L'attribut preload="auto" permet le chargement dès l'affectation
de la source ; la vitesse réelle dépend aussi de la connexion et de
l'hébergement.
