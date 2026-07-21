document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuButton && navLinks) {
    const setMenu = (isOpen) => {
      navLinks.classList.toggle("is-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    };

    menuButton.addEventListener("click", () =>
      setMenu(!navLinks.classList.contains("is-open")),
    );
    navLinks
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", () => setMenu(false)));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  document.querySelectorAll(".footer-brand").forEach((brand) => {
    brand.insertAdjacentHTML(
      "beforeend",
      '<div class="footer-social" aria-label="Social Media"><a href="https://www.instagram.com/hairdesignbarbaraleitner?igsh=a3U0dmJzaHV0cWVq" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.facebook.com/hairdesignleitner/?locale=de_DE" target="_blank" rel="noopener noreferrer">Facebook</a></div>',
    );
  });
  document.querySelectorAll(".footer-legal").forEach((legal) => {
    legal.insertAdjacentHTML(
      "beforeend",
      '<button class="consent-settings" type="button">Datenschutz-Einstellungen</button>',
    );
  });

  const consentKey = "hairdesign-cookie-settings";
  const legacyConsentKey = "hairdesign-external-content";
  const mapEmbeds = document.querySelectorAll("[data-map-src]");
  let consent = null;

  const getConsent = () => {
    try {
      const savedConsent = localStorage.getItem(consentKey);
      if (savedConsent) return JSON.parse(savedConsent);

      const legacyConsent = localStorage.getItem(legacyConsentKey);
      if (legacyConsent === "accepted") return { googleMaps: true };
      if (legacyConsent === "declined") return { googleMaps: false };
    } catch {
      // Without local storage, external content remains blocked by default.
    }
    return null;
  };

  const loadMaps = () => {
    mapEmbeds.forEach((map) => {
      if (!map.getAttribute("src")) map.setAttribute("src", map.dataset.mapSrc);
      map.closest(".map-embed")?.classList.add("is-map-loaded");
    });
  };
  const unloadMaps = () => {
    mapEmbeds.forEach((map) => {
      map.removeAttribute("src");
      map.closest(".map-embed")?.classList.remove("is-map-loaded");
    });
  };
  const saveConsent = (settings) => {
    consent = { googleMaps: Boolean(settings.googleMaps) };
    try {
      localStorage.setItem(consentKey, JSON.stringify(consent));
      localStorage.removeItem(legacyConsentKey);
    } catch {
      // The selection only applies to this page if browser storage is unavailable.
    }

    if (consent.googleMaps) loadMaps();
    else unloadMaps();
    document.querySelector(".cookie-banner")?.remove();
    document.querySelector(".cookie-settings")?.remove();
  };

  const renderSettings = () => {
    if (document.querySelector(".cookie-settings")) return;

    const mapsAllowed = consent?.googleMaps ? "checked" : "";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="cookie-settings" role="presentation">
        <section class="cookie-settings-panel" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
          <button class="cookie-close" type="button" aria-label="Datenschutz-Einstellungen schließen">×</button>
          <p class="eyebrow">Ihre Auswahl</p>
          <h2 id="cookie-settings-title">Datenschutz-Einstellungen</h2>
          <p>Notwendige Speicherungen sind für die Funktion der Website erforderlich und immer aktiv.</p>
          <label class="cookie-option">
            <span><strong>Google Maps</strong><small>Zeigt die Karte auf der Kontaktseite. Dabei können Daten an Google übermittelt werden.</small></span>
            <input class="cookie-maps-toggle" type="checkbox" ${mapsAllowed} />
          </label>
          <div class="cookie-actions">
            <button class="cookie-save" type="button">Auswahl speichern</button>
          </div>
          <a href="datenschutz.html">Mehr in der Datenschutzerklärung</a>
        </section>
      </div>`,
    );

    const settings = document.querySelector(".cookie-settings");
    settings.querySelector(".cookie-close")?.addEventListener("click", () =>
      settings.remove(),
    );
    settings.addEventListener("click", (event) => {
      if (event.target === settings) settings.remove();
    });
    settings.querySelector(".cookie-save")?.addEventListener("click", () =>
      saveConsent({
        googleMaps: settings.querySelector(".cookie-maps-toggle").checked,
      }),
    );
  };

  const renderBanner = () => {
    if (consent || document.querySelector(".cookie-banner")) return;

    document.body.insertAdjacentHTML(
      "beforeend",
      `<aside class="cookie-banner" aria-label="Cookie-Einstellungen">
        <p class="eyebrow">Datenschutz</p>
        <h2>Ihre Privatsphäre ist uns wichtig.</h2>
        <p>Wir verwenden nur notwendige Speicherungen für Ihre Auswahl. Google Maps laden wir ausschließlich nach Ihrer Zustimmung.</p>
        <div class="cookie-actions">
          <button class="cookie-accept" type="button">Alle akzeptieren</button>
          <button class="cookie-necessary" type="button">Nur notwendige</button>
        </div>
        <div class="cookie-links"><button class="cookie-open-settings" type="button">Einstellungen</button><a href="datenschutz.html">Datenschutz</a></div>
      </aside>`,
    );

    const banner = document.querySelector(".cookie-banner");
    banner.querySelector(".cookie-accept")?.addEventListener("click", () =>
      saveConsent({ googleMaps: true }),
    );
    banner.querySelector(".cookie-necessary")?.addEventListener("click", () =>
      saveConsent({ googleMaps: false }),
    );
    banner.querySelector(".cookie-open-settings")?.addEventListener("click", renderSettings);
  };

  consent = getConsent();
  if (consent?.googleMaps) {
    loadMaps();
  }
  renderBanner();

  document
    .querySelectorAll(".map-consent-button")
    .forEach((button) =>
      button.addEventListener("click", () => saveConsent({ googleMaps: true })),
    );
  document.querySelectorAll(".consent-settings").forEach((button) =>
    button.addEventListener("click", renderSettings),
  );

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.createElement("p");
    formStatus.className = "form-status";
    formStatus.setAttribute("role", "status");
    formStatus.setAttribute("aria-live", "polite");
    contactForm.append(formStatus);

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const formData = new FormData(contactForm);
      const customerName = formData.get("name")?.trim() || "Unbekannt";
      formData.set("_subject", `Anfrage - ${customerName}`);

      formStatus.textContent = "Ihre Nachricht wird versendet …";
      formStatus.className = "form-status is-pending";
      submitButton.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method || "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Formular konnte nicht versendet werden.");

        contactForm.reset();
        formStatus.textContent = "Ihre Nachricht wurde erfolgreich versendet!";
        formStatus.className = "form-status is-success";
      } catch {
        formStatus.textContent =
          "Ihre Nachricht konnte leider nicht versendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.";
        formStatus.className = "form-status is-error";
      } finally {
        submitButton.disabled = false;
      }
    });
  }
});
