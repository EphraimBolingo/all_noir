VIDEO D'AMBIANCE DU HERO

La vidéo actuelle est hero.mp4 ; son chemin est défini dans l'attribut
data-video-src de l'élément #hero-vortex-video dans index.html. Un petit script
placé juste après l'élément démarre son chargement pendant l'analyse du HTML avec
une priorité basse, sauf si la réduction des animations est demandée. Le JavaScript différé
écoute ensuite le décodage et les erreurs réseau ; il relance au maximum deux fois
une requête échouée, puis reprend la lecture au retour de la connexion. Ne pas
appeler load() ni réassigner la source après un chargement réussi.
Remplacez-la ici et mettez à jour ce chemin pour utiliser un autre fichier.

Formats acceptés : MP4 (H.264) ou WebM.
Préférences : boucle courte et fluide, mouvement lent, contraste modéré,
aucun flash, aucune piste audio nécessaire.
La vidéo actuelle dure environ 10 secondes, mesure 1280 × 720 et pèse environ
2,8 Mo. Son index MP4 précède les images vidéo pour permettre la lecture
progressive. La lecture est relancée lorsque la page redevient visible ou que la
connexion revient. Le poster WebP léger reste visible pendant le chargement et le
décodage de la première image. Un recadrage masque le logo du clip sur grand
écran ; le poster a été recadré de la même façon.
