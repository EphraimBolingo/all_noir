(function () {
  "use strict";

  const content = window.DUALITY_CONTENT;
  if (!content) {
    throw new Error("DUALITY_CONTENT est introuvable. Vérifiez le chargement de src/data/content.js.");
  }

  const documentRef = window.document;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setText(selector, value) {
    if (typeof value !== "string") return;
    documentRef.querySelectorAll(selector).forEach(function (element) {
      element.textContent = value;
    });
  }

  function createElement(tagName, className, text) {
    const element = documentRef.createElement(tagName);
    if (className) element.className = className;
    if (typeof text === "string") element.textContent = text;
    return element;
  }

  function createSafeLink(value, label, className) {
    if (!value || typeof value !== "string") return null;
    let url;
    try {
      url = new URL(value, documentRef.baseURI);
    } catch (error) {
      return null;
    }
    if (url.protocol !== "https:" && url.protocol !== "mailto:" && url.protocol !== "tel:") return null;
    const link = createElement("a", className, label);
    link.href = url.href;
    if (url.protocol === "https:") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    return link;
  }

  function renderTags(profileId, tags) {
    const list = documentRef.getElementById(profileId + "-tags");
    if (!list || !Array.isArray(tags)) return;
    list.replaceChildren();
    tags.forEach(function (tag) {
      list.appendChild(createElement("li", "", tag));
    });
  }

  function renderPortrait(profileId, profile) {
    const button = documentRef.querySelector('[data-profile-portrait="' + profileId + '"]');
    if (!button) return;
    const image = button.querySelector("img");
    const placeholder = button.querySelector(".profile-portrait-placeholder");
    const source = normalizeDocumentPath(profile.portrait);
    const isImage = /\.(png|jpe?g|webp|avif)$/i.test(source);
    if (!image || !placeholder) return;
    if (!isImage) {
      image.hidden = true;
      image.removeAttribute("src");
      placeholder.hidden = false;
      button.disabled = true;
      if (profile.portrait) {
        console.error("Chemin de portrait invalide pour " + profile.name + ". Utilisez une image locale JPG, PNG, WebP ou AVIF.");
      }
      return;
    }
    image.addEventListener("error", function () {
      image.hidden = true;
      placeholder.hidden = false;
      button.disabled = true;
      console.error("Impossible de charger le portrait de " + profile.name + " : " + source);
    }, { once: true });
    image.addEventListener("load", function () {
      button.disabled = false;
      placeholder.hidden = true;
    }, { once: true });
    image.src = source;
    image.alt = "Portrait de " + profile.name;
    image.hidden = false;
    button.setAttribute("aria-label", "Afficher le portrait de " + profile.name + " en grand");
  }

  function initializePortraitViewer() {
    const viewer = documentRef.getElementById("portrait-viewer");
    const image = documentRef.getElementById("portrait-viewer-image");
    const title = documentRef.getElementById("portrait-viewer-title");
    const close = documentRef.getElementById("portrait-viewer-close");
    if (!viewer || !image || !title || !close) return;

    documentRef.querySelectorAll("[data-profile-portrait]").forEach(function (button) {
      button.addEventListener("click", function () {
        const profile = content.profiles[button.getAttribute("data-profile-portrait")];
        const source = profile && normalizeDocumentPath(profile.portrait);
        if (!profile || !source) {
          console.error("Impossible d’ouvrir le portrait : profil ou image introuvable.");
          return;
        }
        title.textContent = profile.name;
        image.src = source;
        image.alt = "Portrait de " + profile.name;
        viewer.showModal();
      });
    });

    close.addEventListener("click", function () {
      viewer.close();
    });
    viewer.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && viewer.open) {
        event.preventDefault();
        viewer.close();
      }
    });
    viewer.addEventListener("click", function (event) {
      if (event.target === viewer) viewer.close();
    });
    viewer.addEventListener("close", function () {
      image.removeAttribute("src");
    });
  }

  function renderProject(project, index) {
    const category = project.category;
    const title = project.title && project.title.trim()
      ? project.title
      : (category === "collaborations" ? "Projet commun " : "Projet individuel ") + String(index + 1).padStart(2, "0");
    const article = createElement("article", "project-entry project-entry-" + category);
    const visual = createElement("div", "project-visual");
    const galleryImages = getProjectGalleryImages(project);
    const image = documentRef.createElement("img");
    image.src = galleryImages.length
      ? galleryImages[0].src
      : normalizeDocumentPath(project.image) || defaultProjectImage(category);
    image.alt = galleryImages.length
      ? galleryImages[0].alt
      : project.imageAlt || "Aperçu de " + title;
    image.width = 680;
    image.height = 360;
    image.loading = "lazy";
    image.decoding = "async";
    visual.appendChild(image);
    if (project.imageFit === "contain") visual.classList.add("project-visual-contain");
    if (project.imagePosition === "top") visual.classList.add("project-visual-top");
    if (!galleryImages.length && (project.imageIsDemo || project.isDemo)) {
      visual.appendChild(createElement("span", "demo-watermark mono", "ILLUSTRATION DE DÉMONSTRATION"));
    }
    if (galleryImages.length > 1) {
      visual.classList.add("project-visual-carousel");
      renderProjectCarousel(visual, image, galleryImages, title);
    }
    visual.appendChild(createElement("span", "project-number mono", String(index + 1).padStart(2, "0")));

    const detail = createElement("div", "project-detail");
    const meta = createElement("div", "project-meta");
    const isShared = category === "collaborations";
    meta.appendChild(createElement("span", "mono", isShared ? "PROJET COLLABORATIF" : "PROJET INDIVIDUEL"));
    meta.appendChild(createElement("span", "demo-label", project.isDemo ? "EMPLACEMENT À REMPLACER" : project.status || "PROJET RÉALISÉ"));
    detail.appendChild(meta);

    detail.appendChild(createElement("h3", "project-title", title));
    detail.appendChild(createElement("p", "project-description", project.description || "Description à renseigner."));

    if (Array.isArray(project.deliverables) && project.deliverables.length) {
      const deliverables = createElement("ul", "project-deliverables");
      project.deliverables.forEach(function (item) {
        const entry = createElement("li");
        entry.appendChild(createElement("h4", "", item.title));
        entry.appendChild(createElement("p", "", item.description));
        deliverables.appendChild(entry);
      });
      detail.appendChild(deliverables);
    }

    const facts = createElement("div", "project-facts");
    const factEntries = isShared
      ? [
          ["RÔLE · ALL COD", project.roles && project.roles.allcod || ""],
          ["RÔLE · VEUFNOIR", project.roles && project.roles.veufnoir || ""]
        ]
      : [
          ["AUTEUR", category === "allcod" ? content.profiles.allcod.alias : content.profiles.veufnoir.alias],
          ["CONTRIBUTION", project.role || ""]
        ];
    factEntries.forEach(function (entry) {
      if (!entry[1]) return;
      const fact = createElement("div", "project-fact");
      fact.appendChild(createElement("span", "project-fact-icon", "＋"));
      const copy = createElement("span");
      copy.appendChild(createElement("b", "", entry[0]));
      copy.appendChild(createElement("span", "", entry[1]));
      fact.appendChild(copy);
      facts.appendChild(fact);
    });
    if (facts.childElementCount) detail.appendChild(facts);

    const footer = createElement("div", "project-footer");
    let hasFooterContent = false;
    if (Array.isArray(project.technologies) && project.technologies.length) {
      const technologies = createElement("ul", "project-technologies");
      project.technologies.forEach(function (technology) {
        technologies.appendChild(createElement("li", "", technology));
      });
      footer.appendChild(technologies);
      hasFooterContent = true;
    }
    const links = createElement("div", "project-links");
    const demoLink = createSafeLink(project.demoUrl, "Visiter le site ↗", "project-link");
    const sourceLink = createSafeLink(project.sourceUrl, "Code source ↗", "project-link");
    if (demoLink) links.appendChild(demoLink);
    if (sourceLink) links.appendChild(sourceLink);
    if (demoLink || sourceLink) {
      footer.appendChild(links);
      hasFooterContent = true;
    }
    if (hasFooterContent) detail.appendChild(footer);
    article.append(visual, detail);
    return article;
  }

  function getProjectGalleryImages(project) {
    if (!Array.isArray(project.gallery)) return [];
    return project.gallery.reduce(function (images, item, index) {
      const source = item && typeof item === "object" ? normalizeDocumentPath(item.src) : "";
      if (!source || !/\.(png|jpe?g|webp|avif|svg)$/i.test(source)) {
        console.error("Image de galerie invalide pour le projet " + project.title + ".");
        return images;
      }
      images.push({
        src: source,
        alt: typeof item.alt === "string" && item.alt.trim()
          ? item.alt
          : "Image " + (index + 1) + " du projet " + project.title
      });
      return images;
    }, []);
  }

  function renderProjectCarousel(visual, image, images, title) {
    const controls = createElement("div", "project-carousel-controls");
    const previous = createElement("button", "project-carousel-arrow", "←");
    const count = createElement("span", "project-carousel-count mono");
    const next = createElement("button", "project-carousel-arrow", "→");
    let activeIndex = 0;

    previous.type = "button";
    previous.setAttribute("aria-label", "Image précédente de " + title);
    next.type = "button";
    next.setAttribute("aria-label", "Image suivante de " + title);
    count.setAttribute("aria-live", "polite");

    function showImage(index) {
      activeIndex = (index + images.length) % images.length;
      image.src = images[activeIndex].src;
      image.alt = images[activeIndex].alt;
      count.textContent = String(activeIndex + 1).padStart(2, "0") + " / " + String(images.length).padStart(2, "0");
    }

    previous.addEventListener("click", function () {
      showImage(activeIndex - 1);
    });
    next.addEventListener("click", function () {
      showImage(activeIndex + 1);
    });
    showImage(activeIndex);
    controls.append(previous, count, next);
    visual.appendChild(controls);
  }

  function defaultProjectImage(category) {
    if (category === "veufnoir") return "assets/images/network-topology.svg";
    if (category === "collaborations") return "assets/images/dual-system.svg";
    return "assets/images/code-structure.svg";
  }

  function getProjects() {
    return content.collaborations
      .concat(content.profiles.allcod.projects, content.profiles.veufnoir.projects)
      .map(function (project, index) {
        return { project: project, index: index };
      });
  }

  function initializeProjects() {
    const target = documentRef.getElementById("project-list");
    const filters = documentRef.getElementById("project-filters");
    const sort = documentRef.getElementById("project-sort");
    if (!target || !filters || !sort) return;

    const projects = getProjects();
    const validCategories = ["collaborations", "allcod", "veufnoir"];
    const activeCounts = {
      collaborations: projects.filter(function (entry) { return entry.project.category === "collaborations"; }).length,
      allcod: projects.filter(function (entry) { return entry.project.category === "allcod"; }).length,
      veufnoir: projects.filter(function (entry) { return entry.project.category === "veufnoir"; }).length
    };
    activeCounts.all = projects.length;
    documentRef.querySelectorAll("[data-filter-count]").forEach(function (count) {
      const category = count.getAttribute("data-filter-count");
      count.textContent = String(activeCounts[category] || 0);
    });

    let activeFilter = "all";
    function render() {
      const visible = projects.filter(function (entry) {
        return activeFilter === "all" || entry.project.category === activeFilter;
      });
      if (sort.value === "title") {
        visible.sort(function (a, b) {
          return (a.project.title || "").localeCompare(b.project.title || "", "fr", { sensitivity: "base" });
        });
      } else {
        visible.sort(function (a, b) { return a.index - b.index; });
      }
      target.replaceChildren();
      visible.forEach(function (entry, index) {
        target.appendChild(renderProject(entry.project, index));
      });
    }

    filters.addEventListener("click", function (event) {
      const button = event.target.closest("button[data-filter]");
      if (!button || !filters.contains(button)) return;
      const category = button.getAttribute("data-filter");
      if (category !== "all" && validCategories.indexOf(category) === -1) return;
      activeFilter = category;
      filters.querySelectorAll("button[data-filter]").forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
      render();
    });
    sort.addEventListener("change", render);
    render();
  }

  function renderProfiles() {
    const allcod = content.profiles.allcod;
    const veufnoir = content.profiles.veufnoir;
    setText('[data-person="allcod-alias"]', allcod.alias);
    setText('[data-person="veufnoir-alias"]', veufnoir.alias);
    setText('[data-specialty="allcod"]', allcod.specialty);
    setText('[data-specialty="veufnoir"]', veufnoir.specialty);
    setText('[data-person="allcod-nav-alias"]', allcod.alias);
    setText('[data-person="veufnoir-nav-alias"]', veufnoir.alias);
    setText('[data-person="allcod-name"]', allcod.name);
    setText('[data-person="allcod-name-short"]', allcod.name);
    setText('[data-person="allcod-bio"]', allcod.biography);
    setText('[data-person="veufnoir-name"]', veufnoir.name);
    setText('[data-person="veufnoir-name-short"]', veufnoir.name);
    setText('[data-person="veufnoir-bio"]', veufnoir.biography);
    const veufnoirEducation = veufnoir.education.filter(Boolean);
    const ccnaTraining = veufnoirEducation.find(function (item) { return item.indexOf("CCNA") !== -1; });
    const remainingEducation = veufnoirEducation.filter(function (item) { return item !== ccnaTraining; });
    setText('[data-person="veufnoir-training"]', "Parcours communiqué : " + (remainingEducation.join(" ; ") || "à renseigner") + (ccnaTraining ? " ; " + ccnaTraining : "") + ". Aucune certification CCNA n’est revendiquée ici.");
    setText('[data-education="allcod"]', allcod.education.join(" · "));
    setText('[data-education="veufnoir"]', veufnoir.education.join(" · "));
    setText('[data-education="allcod-degree"]', allcod.education[0] || "");
    setText('[data-education="veufnoir-degree"]', remainingEducation[0] || "");
    setText('[data-education="veufnoir-ccna"]', ccnaTraining || "");
    renderTags("allcod", allcod.tags);
    renderTags("veufnoir", veufnoir.tags);
    renderPortrait("allcod", allcod);
    renderPortrait("veufnoir", veufnoir);
  }

  function normalizeDocumentPath(path) {
    if (!path || typeof path !== "string" || path.includes("\\") || path.startsWith("//")) return "";
    if (!/^\.?\/?assets\/[A-Za-z0-9._/-]+$/.test(path) || path.split("/").includes("..")) return "";
    return path;
  }

  function renderContacts() {
    const target = documentRef.getElementById("contact-list");
    if (!target) return;
    const entries = [
      { label: "TÉLÉPHONE PARTAGÉ", value: content.contact.sharedPhone, protocol: "tel:" },
      { label: "ALL COD / E-MAIL", value: content.contact.allcod.email, protocol: "mailto:" },
      { label: "ALL COD / GITHUB", value: content.contact.allcod.github },
      { label: "ALL COD / LINKEDIN", value: content.contact.allcod.linkedin },
      { label: "ALL COD / SITE", value: content.contact.allcod.website },
      { label: "VEUFNOIR / E-MAIL", value: content.contact.veufnoir.email, protocol: "mailto:" },
      { label: "VEUFNOIR / GITHUB", value: content.contact.veufnoir.github },
      { label: "VEUFNOIR / LINKEDIN", value: content.contact.veufnoir.linkedin },
      { label: "VEUFNOIR / SITE", value: content.contact.veufnoir.website }
    ];
    target.replaceChildren();
    entries.forEach(function (entry) {
      const row = createElement("div", "contact-row");
      row.appendChild(createElement("span", "mono", entry.label));
      if (!entry.value) {
        row.appendChild(createElement("span", "contact-value", "À renseigner"));
      } else {
        const href = entry.protocol ? entry.protocol + entry.value : entry.value;
        const link = createSafeLink(href, entry.value, "contact-value");
        row.appendChild(link || createElement("span", "contact-value", entry.value));
      }
      target.appendChild(row);
    });
  }

  function validVerificationUrl(value) {
    if (!value) return "";
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function renderCertificates() {
    const documents = Array.isArray(content.certificates) ? content.certificates : [];
    const gallery = documentRef.getElementById("credential-gallery");
    const tools = documentRef.getElementById("credential-tools");
    const filters = documentRef.getElementById("credential-filters");
    if (!gallery || !tools || !filters) return;

    if (!documents.length) {
      gallery.classList.remove("has-documents");
      gallery.replaceChildren();
      const empty = createElement("div", "empty-state");
      empty.appendChild(createElement("span", "empty-state-index mono", "ARCHIVE / EN ATTENTE"));
      empty.appendChild(createElement("h3", "", "Aucun document ajouté pour le moment."));
      empty.appendChild(createElement("p", "", "Déposez les fichiers authentiques dans assets/certificates/, puis ajoutez leurs informations dans src/data/content.js. La galerie et sa visionneuse se rempliront automatiquement."));
      const organizations = createElement("span", "empty-organizations", "Documents authentiques à ajouter : Coursera / Orange Digital Center");
      empty.appendChild(organizations);
      gallery.appendChild(empty);
      tools.hidden = true;
      return;
    }

    const availableFilters = [{ key: "all", label: "Tous les documents" }];
    const issuers = Array.from(new Set(documents.map(function (item) { return item.issuer; }).filter(Boolean)));
    const people = Array.from(new Set(documents.map(function (item) { return item.person; }).filter(Boolean)));
    if (documents.length > 3) {
      issuers.forEach(function (issuer) { availableFilters.push({ key: "issuer:" + issuer, label: issuer }); });
      people.forEach(function (person) {
        const label = person === "allcod" ? content.profiles.allcod.alias : person === "veufnoir" ? content.profiles.veufnoir.alias : person;
        availableFilters.push({ key: "person:" + person, label: label });
      });
    }
    tools.hidden = availableFilters.length === 1;
    filters.replaceChildren();
    gallery.classList.add("has-documents");
    let activeFilter = "all";
    const galleryItems = [];

    availableFilters.forEach(function (filter) {
      const button = createElement("button", "filter-button", filter.label);
      button.type = "button";
      button.setAttribute("aria-pressed", filter.key === activeFilter ? "true" : "false");
      button.addEventListener("click", function () {
        activeFilter = filter.key;
        Array.from(filters.children).forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        galleryItems.forEach(function (item) {
          const visible = filter.key === "all" ||
            (filter.key.startsWith("issuer:") && item.data.issuer === filter.key.slice(7)) ||
            (filter.key.startsWith("person:") && item.data.person === filter.key.slice(7));
          item.element.hidden = !visible;
        });
      });
      filters.appendChild(button);
    });

    gallery.replaceChildren();
    documents.forEach(function (item, index) {
      const button = createElement("button", "credential-card");
      button.type = "button";
      button.setAttribute("aria-label", "Consulter : " + (item.title || "Document sans titre renseigné"));
      const preview = createElement("span", "credential-preview");
      const previewPath = normalizeDocumentPath(item.preview);
      if (previewPath) {
        const image = documentRef.createElement("img");
        image.src = previewPath;
        image.alt = "";
        image.loading = "lazy";
        image.width = 560;
        image.height = 360;
        preview.appendChild(image);
      } else {
        preview.appendChild(createElement("span", "credential-placeholder-mark mono", "DOCUMENT"));
        preview.appendChild(createElement("span", "credential-placeholder-copy", "Aperçu à ajouter"));
      }
      preview.appendChild(createElement("span", "credential-open mono", "CONSULTER ↗"));
      const detail = createElement("span", "credential-card-detail");
      detail.appendChild(createElement("span", "mono credential-category", item.kind || "Type de document à préciser"));
      detail.appendChild(createElement("strong", "", item.title || "Titre à renseigner"));
      detail.appendChild(createElement("span", "", item.issuer || "Organisme à renseigner"));
      if (item.date) detail.appendChild(createElement("time", "", item.date));
      if (item.description) detail.appendChild(createElement("span", "credential-description", item.description));
      button.append(preview, detail);
      button.addEventListener("click", function () { openDocument(item, index); });
      gallery.appendChild(button);
      galleryItems.push({ element: button, data: item });
    });
    tools.hidden = availableFilters.length === 1;
  }

  const viewer = documentRef.getElementById("document-viewer");
  const viewerTitle = documentRef.getElementById("viewer-title");
  const viewerMeta = documentRef.getElementById("viewer-meta");
  const viewerDescription = documentRef.getElementById("viewer-description");
  const viewerCanvas = documentRef.getElementById("viewer-canvas");
  const viewerOriginal = documentRef.getElementById("viewer-original");
  const viewerVerification = documentRef.getElementById("viewer-verification");
  const viewerZoom = documentRef.getElementById("viewer-zoom");

  function openDocument(item, index) {
    if (!viewer || typeof viewer.showModal !== "function") {
      const path = normalizeDocumentPath(item.file);
      if (path) window.open(path, "_blank", "noopener,noreferrer");
      return;
    }
    viewerTitle.textContent = item.title || "Document à renseigner";
    viewerMeta.replaceChildren();
    viewerDescription.textContent = item.description || "";
    viewerDescription.hidden = !item.description;
    [item.issuer, item.person === "allcod" ? content.profiles.allcod.alias : item.person === "veufnoir" ? content.profiles.veufnoir.alias : item.person, item.kind, item.date]
      .filter(Boolean)
      .forEach(function (value) { viewerMeta.appendChild(createElement("span", "", value)); });
    viewerCanvas.replaceChildren();
    viewerZoom.hidden = true;
    viewerZoom.setAttribute("aria-pressed", "false");
    viewerZoom.textContent = "Agrandir l’image";
    const file = normalizeDocumentPath(item.file);
    const preview = normalizeDocumentPath(item.preview);
    const isPdf = (item.fileType || "").toLowerCase() === "pdf" || /\.pdf$/i.test(file);
    if (isPdf && file) {
      const frame = documentRef.createElement("iframe");
      frame.src = file;
      frame.title = item.title ? "Aperçu du document : " + item.title : "Aperçu du document PDF";
      frame.loading = "eager";
      viewerCanvas.appendChild(frame);
    } else if (file && /\.(png|jpe?g|webp|avif|svg)$/i.test(file)) {
      const image = documentRef.createElement("img");
      image.src = file;
      image.alt = item.title ? "Document consulté : " + item.title : "Document consulté";
      image.className = "viewer-image";
      viewerCanvas.appendChild(image);
      viewerZoom.hidden = false;
    } else if (preview) {
      const image = documentRef.createElement("img");
      image.src = preview;
      image.alt = item.title ? "Aperçu de démonstration : " + item.title : "Aperçu de démonstration du document";
      image.className = "viewer-image";
      viewerCanvas.appendChild(image);
      viewerZoom.hidden = false;
    } else {
      viewerCanvas.appendChild(createElement("p", "viewer-unavailable", "Ajoutez un fichier image ou PDF à ce document pour le consulter ici."));
    }

    if (file) {
      viewerOriginal.href = file;
      viewerOriginal.hidden = false;
    } else {
      viewerOriginal.hidden = true;
      viewerOriginal.removeAttribute("href");
    }
    const verification = validVerificationUrl(item.verificationUrl);
    if (verification) {
      viewerVerification.href = verification;
      viewerVerification.hidden = false;
    } else {
      viewerVerification.hidden = true;
      viewerVerification.removeAttribute("href");
    }
    viewer.dataset.documentIndex = String(index);
    viewer.showModal();
  }

  function initializeViewer() {
    if (!viewer) return;
    documentRef.getElementById("viewer-close").addEventListener("click", function () {
      viewer.close();
    });
    viewer.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && viewer.open) {
        event.preventDefault();
        viewer.close();
      }
    });
    viewer.addEventListener("click", function (event) {
      if (event.target === viewer) viewer.close();
    });
    viewer.addEventListener("close", function () {
      viewerCanvas.replaceChildren();
      viewerZoom.setAttribute("aria-pressed", "false");
    });
    viewerZoom.addEventListener("click", function () {
      const image = viewerCanvas.querySelector("img");
      if (!image) return;
      const zoomed = image.classList.toggle("is-zoomed");
      viewerZoom.setAttribute("aria-pressed", String(zoomed));
      viewerZoom.textContent = zoomed ? "Réduire l’image" : "Agrandir l’image";
    });
  }

  function initializeScene() {
    const scene = documentRef.getElementById("home");
    const skip = documentRef.getElementById("scene-skip");
    const status = documentRef.getElementById("scene-status");
    if (!scene || !skip) return;
    let finishTimer;

    function finishScene() {
      scene.classList.add("scene-finished");
      skip.hidden = true;
      window.clearTimeout(finishTimer);
      if (status) status.textContent = "Animation d’introduction passée. Le contenu reste disponible.";
    }

    if (reducedMotion.matches) {
      finishScene();
    } else {
      skip.addEventListener("click", finishScene);
      finishTimer = window.setTimeout(finishScene, 1800);
      documentRef.addEventListener("visibilitychange", function () {
        documentRef.documentElement.classList.toggle("animations-paused", documentRef.hidden);
      });
    }
  }

  function initializeHeroVideo() {
    const video = documentRef.getElementById("hero-vortex-video");
    if (!video || reducedMotion.matches) return;
    const source = video.dataset.videoSrc.trim();
    if (!source) return;
    if (!/^assets\/videos\/[A-Za-z0-9._/-]+\.(mp4|webm)$/i.test(source) || source.split("/").includes("..")) {
      console.error("La vidéo du hero doit être un fichier MP4 ou WebM local dans assets/videos/.");
      return;
    }

    video.addEventListener("error", function () {
      console.error("Impossible de charger la vidéo du hero : " + source);
    }, { once: true });
    video.src = source;
    video.load();
  }

  function initializeActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;
    const navLinks = Array.from(documentRef.querySelectorAll(".main-nav a"));
    const sections = navLinks
      .map(function (link) { return documentRef.querySelector(link.getAttribute("href")); })
      .filter(Boolean);
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-32% 0px -58% 0px" });
    sections.forEach(function (section) { observer.observe(section); });
  }

  function initialize() {
    documentRef.documentElement.classList.add("js");
    renderProfiles();
    initializeProjects();
    initializePortraitViewer();
    renderContacts();
    renderCertificates();
    initializeViewer();
    initializeScene();
    initializeHeroVideo();
    initializeActiveNavigation();
    setText("#current-year", String(new Date().getFullYear()));
  }

  if (documentRef.readyState === "loading") {
    documentRef.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
}());
