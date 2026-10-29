VIDEO D'AMBIANCE DU HERO

La vidéo actuelle est hero.mp4 ; son chemin est défini dans l'attribut
data-video-src de l'élément #hero-vortex-video dans index.html. Un petit script
placé juste après l'élément démarre son chargement prioritaire pendant l'analyse
du HTML, sauf si la réduction des animations est demandée. Le JavaScript différé
écoute ensuite le décodage et les erreurs. Ne pas appeler load() ni réassigner
la source après son chargement, car cela redémarre la requête.
Remplacez-la ici et mettez à jour ce chemin pour utiliser un autre fichier.

Formats acceptés : MP4 (H.264) ou WebM.
Préférences : boucle courte et fluide, mouvement lent, contraste modéré,
aucun flash, aucune piste audio nécessaire.
La vidéo actuelle dure environ 10 secondes, mesure 1280 × 720 et pèse environ
5,5 Mo. Son index MP4 précède les images vidéo pour permettre la lecture
progressive. Le poster WebP léger reste visible pendant le chargement et le
décodage de la première image. Un recadrage masque le logo du clip sur grand
écran ; le poster a été recadré de la même façon.
