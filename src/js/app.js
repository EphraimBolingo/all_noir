(function () {
  "use strict";

  const content = window.DUALITY_CONTENT;
  if (!content) {
    throw new Error("DUALITY_CONTENT est introuvable. Vérifiez le chargement de src/data/content.js.");
  }

  const documentRef = window.document;
  const appScript = documentRef.currentScript;
  const assetVersion = appScript ? new URL(appScript.src, documentRef.baseURI).searchParams.get("v") : "";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toolIcons = {
    html5: {
      color: "#e34f26",
      shapes: [
        ["path", { d: "M8 5h32l-3 33-13 6-13-6z" }],
        ["path", { d: "M15 13h18l-.6 6H21l.4 4h10.5l-1.2 10-6.7 3-6.7-3-.4-5h6l.2 1.2 1 .5 1-.5.3-3.2H18z", fill: "#fff" }]
      ]
    },
    css3: {
      color: "#1572b6",
      shapes: [
        ["path", { d: "M8 5h32l-3 33-13 6-13-6z" }],
        ["path", { d: "M15 13h19l-.6 6-12.5 0-.3 3h12.5l-1.2 11-8.9 2.8-8.5-2.8-.5-5.3h6l.2 1.8 3.1 1 3.2-1 .4-3.5H16z", fill: "#fff" }]
      ]
    },
    javascript: {
      color: "#f7df1e",
      shapes: [
        ["rect", { x: "5", y: "5", width: "38", height: "38", rx: "3" }],
        ["text", { x: "11", y: "34", fill: "#111", "font-size": "17", "font-weight": "700" }, "JS"]
      ]
    },
    php: {
      color: "#777bb4",
      shapes: [
        ["ellipse", { cx: "24", cy: "24", rx: "21", ry: "14" }],
        ["text", { x: "7", y: "29", fill: "#fff", "font-size": "14", "font-weight": "700" }, "PHP"]
      ]
    },
    vue: {
      color: "#42b883",
      shapes: [
        ["path", { d: "M4 9h10l10 16L34 9h10L24 41z" }],
        ["path", { d: "M14 9h7l3 5 3-5h7L24 25z", fill: "#35495e" }]
      ]
    },
    web: {
      color: "#38d7ef",
      shapes: [
        ["rect", { x: "5", y: "8", width: "38", height: "32", rx: "2", fill: "none", stroke: "currentColor", "stroke-width": "3" }],
        ["path", { d: "M6 16h36M12 12h1m4 0h1m4 0h1", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }],
        ["path", { d: "m18 24-5 4 5 4m12-8 5 4-5 4m-3-10-4 12", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }]
      ]
    },
    database: {
      color: "#42b883",
      shapes: [
        ["ellipse", { cx: "24", cy: "11", rx: "15", ry: "6", fill: "none", stroke: "currentColor", "stroke-width": "3" }],
        ["path", { d: "M9 11v25c0 3 7 6 15 6s15-3 15-6V11M9 23c0 3 7 6 15 6s15-3 15-6M9 35c0 3 7 6 15 6s15-3 15-6", fill: "none", stroke: "currentColor", "stroke-width": "3" }]
      ]
    },
    git: {
      color: "#f05032",
      shapes: [
        ["path", { d: "M22 4 4 22a3 3 0 0 0 0 4l18 18a3 3 0 0 0 4 0l18-18a3 3 0 0 0 0-4L26 4a3 3 0 0 0-4 0z" }],
        ["path", { d: "M17 16v16m0-8h14m0 0-5-5m5 5-5 5", fill: "none", stroke: "#fff", "stroke-width": "3", "stroke-linecap": "round", "stroke-linejoin": "round" }],
        ["circle", { cx: "17", cy: "14", r: "3", fill: "#fff" }],
        ["circle", { cx: "17", cy: "34", r: "3", fill: "#fff" }],
        ["circle", { cx: "31", cy: "24", r: "3", fill: "#fff" }]
      ]
    },
    github: {
      color: "#c9d1d9",
      shapes: [
        ["path", { d: "M24 4a20 20 0 0 0-6.3 39c1 .2 1.3-.4 1.3-.9v-3.4c-5.4 1.2-6.5-2.3-6.5-2.3-.9-2.2-2.2-2.8-2.2-2.8-1.8-1.2.1-1.2.1-1.2 2 .1 3 2 3 2 1.8 3 4.7 2.1 5.8 1.6.2-1.3.7-2.1 1.3-2.6-4.3-.5-8.8-2.2-8.8-9.7 0-2.1.8-3.9 2-5.3-.2-.5-.9-2.5.2-5.2 0 0 1.7-.5 5.5 2a19 19 0 0 1 10 0c3.8-2.5 5.5-2 5.5-2 1.1 2.7.4 4.7.2 5.2a7.7 7.7 0 0 1 2 5.3c0 7.5-4.5 9.2-8.8 9.7.7.6 1.4 1.8 1.4 3.6v5.1c0 .5.4 1.1 1.4.9A20 20 0 0 0 24 4z" }]
      ]
    },
    docker: {
      color: "#2496ed",
      shapes: [
        ["path", { d: "M5 24h7v7H5zm9 0h7v7h-7zm9 0h7v7h-7zm-9-9h7v7h-7zm9 0h7v7h-7zm9 9h7v7h-7zM5 33h30c-2 7-8 11-17 11-8 0-13-4-15-11zm27-9c2-3 5-4 9-3-1 3-3 5-7 5z" }]
      ]
    },
    desktop: {
      color: "#38d7ef",
      shapes: [
        ["rect", { x: "5", y: "7", width: "38", height: "27", rx: "2", fill: "none", stroke: "currentColor", "stroke-width": "3" }],
        ["path", { d: "M17 41h14m-7-7v7", fill: "none", stroke: "currentColor", "stroke-width": "3", "stroke-linecap": "round" }]
      ]
    },
    office: {
      color: "#7799ef",
      shapes: [
        ["path", { d: "M11 5h19l8 8v30H11a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" }],
        ["path", { d: "M29 5v9h9M15 23h18M15 29h18M15 35h13", fill: "none", stroke: "#fff", "stroke-width": "2", "stroke-linecap": "round" }]
      ]
    }
  };

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

  function versionedAssetUrl(path) {
    if (!assetVersion || !path) return path;
    const url = new URL(path, documentRef.baseURI);
    if (url.origin !== window.location.origin) return path;
    url.searchParams.set("v", assetVersion);
    return url.href;
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

  function renderTools(profileId, tools) {
    const list = documentRef.getElementById(profileId + "-tools");
    if (!list || !Array.isArray(tools)) return;
    list.replaceChildren();
    tools.forEach(function (tool) {
      const icon = toolIcons[tool.icon];
      if (!icon || !tool.name) return;
      const item = createElement("li", "profile-tool");
      item.title = tool.name;
      const graphic = documentRef.createElementNS("http://www.w3.org/2000/svg", "svg");
      graphic.setAttribute("viewBox", "0 0 48 48");
      graphic.setAttribute("aria-hidden", "true");
      graphic.setAttribute("focusable", "false");
      graphic.style.color = icon.color;
      icon.shapes.forEach(function (shape) {
        const element = documentRef.createElementNS("http://www.w3.org/2000/svg", shape[0]);
        Object.keys(shape[1]).forEach(function (attribute) {
          element.setAttribute(attribute, shape[1][attribute]);
        });
        if (shape[2]) element.textContent = shape[2];
        graphic.appendChild(element);
      });
      item.appendChild(graphic);
      item.appendChild(createElement("span", "sr-only", tool.name));
      list.appendChild(item);
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
    image.src = versionedAssetUrl(source);
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
        image.src = versionedAssetUrl(source);
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
    image.src = versionedAssetUrl(galleryImages.length
      ? galleryImages[0].src
      : normalizeDocumentPath(project.image) || defaultProjectImage(category));
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
    count.setAttribute("aria-live", "off");
    visual.setAttribute("role", "group");
    visual.setAttribute("aria-label", "Images du projet " + title);
    visual.setAttribute("aria-roledescription", "carrousel");

    function showImage(index) {
      activeIndex = (index + images.length) % images.length;
      image.src = versionedAssetUrl(images[activeIndex].src);
      image.alt = images[activeIndex].alt;
      count.textContent = String(activeIndex + 1).padStart(2, "0") + " / " + String(images.length).padStart(2, "0");
    }

    const galleryImagePreloads = [];

    function preloadGalleryImages() {
      const connection = navigator.connection;
      if (connection && (connection.saveData || connection.effectiveType === "2g" || connection.effectiveType === "slow-2g")) return;
      images.forEach(function (item, index) {
        if (index === activeIndex) return;
        const preloadedImage = new Image();
        preloadedImage.decoding = "async";
        if ("fetchPriority" in preloadedImage) preloadedImage.fetchPriority = "low";
        galleryImagePreloads.push(preloadedImage);
        preloadedImage.src = versionedAssetUrl(item.src);
      });
    }

    function scheduleGalleryPreload() {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadGalleryImages, { timeout: 1200 });
      } else {
        window.setTimeout(preloadGalleryImages, 200);
      }
    }

    previous.addEventListener("click", function () {
      showImage(activeIndex - 1);
    });
    next.addEventListener("click", function () {
      showImage(activeIndex + 1);
    });
    const autoplayTimer = window.setInterval(function () {
      if (!visual.isConnected) {
        window.clearInterval(autoplayTimer);
        return;
      }
      const bounds = visual.getBoundingClientRect();
      const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight
        && bounds.right > 0 && bounds.left < window.innerWidth;
      if (
        reducedMotion.matches
        || documentRef.hidden
        || !isVisible
        || visual.matches(":hover")
        || visual.contains(documentRef.activeElement)
      ) return;
      showImage(activeIndex + 1);
    }, 2000);
    if ("IntersectionObserver" in window) {
      const galleryObserver = new IntersectionObserver(function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        galleryObserver.disconnect();
        scheduleGalleryPreload();
      }, { rootMargin: "200px 0px" });
      galleryObserver.observe(visual);
    } else {
      scheduleGalleryPreload();
    }
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
    setText('[data-person="veufnoir-training"]', "Parcours communiqué : " + (remainingEducation.join(" ; ") || "à renseigner") + (ccnaTraining ? " ; " + ccnaTraining : "") + ". Les certificats CCNA 1, 2 et 3 sont présentés séparément.");
    setText('[data-education="allcod"]', allcod.education.join(" · "));
    setText('[data-education="veufnoir"]', veufnoir.education.join(" · "));
    setText('[data-education="allcod-degree"]', allcod.education[0] || "");
    setText('[data-education="veufnoir-degree"]', remainingEducation[0] || "");
    setText('[data-education="veufnoir-ccna"]', ccnaTraining || "");
    renderTools("allcod", allcod.tools);
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

    const carouselItems = documents.map(function (document, index) {
      return { data: document, index: index };
    });

    if (!carouselItems.length) {
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

    const availableFilters = [
      { key: "all", label: "Tous les documents" },
      { key: "ccna", label: "CCNA" },
      { key: "coursera", label: "Coursera" }
    ];
    filters.replaceChildren();
    gallery.classList.add("has-documents");
    let activeFilter = "all";
    const carousel = createElement("section", "credential-carousel");
    const carouselHeader = createElement("div", "credential-carousel-header");
    const carouselStatus = createElement("span", "mono credential-carousel-status");
    carouselStatus.setAttribute("aria-live", "polite");
    const carouselControls = createElement("div", "credential-carousel-controls");
    const previous = createElement("button", "credential-carousel-arrow", "Précédent");
    previous.type = "button";
    previous.setAttribute("aria-label", "Afficher les éléments précédents");
    const next = createElement("button", "credential-carousel-arrow", "Suivant");
    next.type = "button";
    next.setAttribute("aria-label", "Afficher les éléments suivants");
    const viewport = createElement("div", "credential-carousel-viewport");
    viewport.setAttribute("role", "region");
    viewport.setAttribute("aria-roledescription", "carrousel");
    viewport.setAttribute("aria-label", "Documents et parcours de formation");
    viewport.tabIndex = 0;
    const track = createElement("div", "credential-carousel-track");

    carouselControls.append(previous, next);
    carouselHeader.append(carouselStatus, carouselControls);
    viewport.appendChild(track);
    carousel.append(carouselHeader, viewport);

    availableFilters.forEach(function (filter) {
      const button = createElement("button", "filter-button", filter.label);
      button.type = "button";
      button.setAttribute("aria-pressed", filter.key === activeFilter ? "true" : "false");
      button.addEventListener("click", function () {
        activeFilter = filter.key;
        Array.from(filters.children).forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        renderCarousel();
      });
      filters.appendChild(button);
    });

    gallery.replaceChildren();
    gallery.appendChild(carousel);
    tools.hidden = false;

    function createCredentialCard(item) {
      const document = item.data;
      const button = createElement("button", "credential-card");
      button.type = "button";
      const hasPreview = Boolean(normalizeDocumentPath(document.preview));
      button.setAttribute("aria-label", (hasPreview ? "Consulter : " : "Image à ajouter pour : ") + (document.title || "Document sans titre renseigné"));
      const preview = createElement("span", "credential-preview");
      const previewPath = normalizeDocumentPath(document.preview);
      if (previewPath) {
        const image = documentRef.createElement("img");
        image.src = versionedAssetUrl(previewPath);
        image.alt = "";
        image.loading = "lazy";
        image.width = 560;
        image.height = 360;
        preview.appendChild(image);
      } else {
        preview.appendChild(createElement("span", "credential-placeholder-mark mono", document.category === "ccna" ? document.title : "DOCUMENT"));
        preview.appendChild(createElement("span", "credential-placeholder-copy", document.category === "ccna" ? "Image du certificat à ajouter" : "Aperçu à ajouter"));
      }
      preview.appendChild(createElement("span", "credential-open mono", hasPreview ? "CONSULTER ↗" : "FICHIER À AJOUTER"));
      const detail = createElement("span", "credential-card-detail");
      detail.appendChild(createElement("span", "mono credential-category", document.kind || "Type de document à préciser"));
      detail.appendChild(createElement("strong", "", document.title || "Titre à renseigner"));
      if (document.issuer) detail.appendChild(createElement("span", "", document.issuer));
      if (document.date) detail.appendChild(createElement("time", "", document.date));
      if (document.description) detail.appendChild(createElement("span", "credential-description", document.description));
      button.append(preview, detail);
      button.addEventListener("click", function () { openDocument(document, item.index); });
      return button;
    }

    function updateCarouselControls() {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      previous.disabled = viewport.scrollLeft <= 1;
      next.disabled = maxScroll <= 1 || viewport.scrollLeft >= maxScroll - 1;
    }

    function renderCarousel() {
      const visibleItems = carouselItems.filter(function (item) {
        return activeFilter === "all" || item.data.category === activeFilter;
      });
      track.replaceChildren();
      visibleItems.forEach(function (item) {
        track.appendChild(createCredentialCard(item));
      });
      carouselStatus.textContent = visibleItems.length + (visibleItems.length === 1 ? " élément" : " éléments");
      viewport.scrollLeft = 0;
      window.requestAnimationFrame(updateCarouselControls);
    }

    previous.addEventListener("click", function () {
      viewport.scrollBy({ left: -viewport.clientWidth, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
    next.addEventListener("click", function () {
      viewport.scrollBy({ left: viewport.clientWidth, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
    viewport.addEventListener("scroll", updateCarouselControls, { passive: true });
    viewport.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      viewport.scrollBy({
        left: (event.key === "ArrowRight" ? 1 : -1) * viewport.clientWidth,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
    });
    window.addEventListener("resize", updateCarouselControls, { passive: true });
    renderCarousel();
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
      frame.src = versionedAssetUrl(file);
      frame.title = item.title ? "Aperçu du document : " + item.title : "Aperçu du document PDF";
      frame.loading = "eager";
      viewerCanvas.appendChild(frame);
    } else if (file && /\.(png|jpe?g|webp|avif|svg)$/i.test(file)) {
      const image = documentRef.createElement("img");
      image.src = versionedAssetUrl(file);
      image.alt = item.title ? "Document consulté : " + item.title : "Document consulté";
      image.className = "viewer-image";
      viewerCanvas.appendChild(image);
      viewerZoom.hidden = false;
    } else if (preview) {
      const image = documentRef.createElement("img");
      image.src = versionedAssetUrl(preview);
      image.alt = item.title ? "Aperçu de démonstration : " + item.title : "Aperçu de démonstration du document";
      image.className = "viewer-image";
      viewerCanvas.appendChild(image);
      viewerZoom.hidden = false;
    } else {
      viewerCanvas.appendChild(createElement("p", "viewer-unavailable", "Ajoutez un fichier image ou PDF à ce document pour le consulter ici."));
    }

    if (file) {
      viewerOriginal.href = versionedAssetUrl(file);
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

    let networkRetryCount = 0;
    let networkRetryTimer = 0;

    function retryFailedVideo() {
      if (
        reducedMotion.matches
        || documentRef.hidden
        || !navigator.onLine
        || !video.error
        || video.error.code !== 2
        || networkRetryCount >= 2
      ) return;
      window.clearTimeout(networkRetryTimer);
      networkRetryCount += 1;
      networkRetryTimer = window.setTimeout(function () {
        if (documentRef.hidden || !navigator.onLine || !video.error || video.error.code !== 2) return;
        const retryUrl = new URL(versionedAssetUrl(source), documentRef.baseURI);
        retryUrl.searchParams.set("retry", String(networkRetryCount));
        video.src = retryUrl.href;
      }, networkRetryCount * 700);
    }

    function handleVideoError() {
      console.error("Impossible de charger la vidéo du hero : " + source);
      retryFailedVideo();
    }
    video.addEventListener("error", handleVideoError);

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    function resumePlayback() {
      if (reducedMotion.matches || documentRef.hidden || !video.paused || video.error) return;
      const playback = video.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch(function (error) {
          if (error.name !== "NotAllowedError" && error.name !== "AbortError") {
            console.error("Impossible de démarrer la vidéo du hero : " + error.message);
          }
        });
      }
    }

    video.addEventListener("loadeddata", resumePlayback, { once: true });
    video.addEventListener("canplay", resumePlayback);
    documentRef.addEventListener("visibilitychange", resumePlayback);
    window.addEventListener("pageshow", function () {
      retryFailedVideo();
      resumePlayback();
    });
    window.addEventListener("online", function () {
      retryFailedVideo();
      resumePlayback();
    });
    video.addEventListener("pause", function () {
      window.setTimeout(resumePlayback, 250);
    });
    if (video.error) handleVideoError();
    resumePlayback();
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
    initializeHeroVideo();
    renderProfiles();
    initializeProjects();
    initializePortraitViewer();
    renderContacts();
    renderCertificates();
    initializeViewer();
    initializeScene();
    initializeActiveNavigation();
    setText("#current-year", String(new Date().getFullYear()));
  }

  if (documentRef.readyState === "loading") {
    documentRef.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
}());
