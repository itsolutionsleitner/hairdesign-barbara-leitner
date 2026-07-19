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

  const consentKey = "hairdesign-external-content";
  const mapEmbeds = document.querySelectorAll("[data-map-src]");
  const loadMaps = () => {
    mapEmbeds.forEach((map) => {
      if (!map.getAttribute("src")) map.setAttribute("src", map.dataset.mapSrc);
      map.closest(".map-embed")?.classList.add("is-map-loaded");
    });
  };
  const setExternalConsent = () => {
    localStorage.setItem(consentKey, "accepted");
    loadMaps();
    document.querySelector(".consent-banner")?.remove();
  };
  const storedConsent = localStorage.getItem(consentKey);

  if (storedConsent === "accepted") {
    loadMaps();
  } else if (mapEmbeds.length && storedConsent !== "declined") {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<aside class="consent-banner" aria-label="Datenschutzhinweis"><p><strong>Externe Inhalte</strong> Google Maps wird erst nach Ihrer Zustimmung geladen. Dabei können Daten an Google übermittelt werden.</p><div><button class="consent-accept" type="button">Google Maps akzeptieren</button><button class="consent-decline" type="button">Ablehnen</button></div><a href="datenschutz.html">Datenschutz</a></aside>',
    );
    document
      .querySelector(".consent-accept")
      ?.addEventListener("click", setExternalConsent);
    document
      .querySelector(".consent-decline")
      ?.addEventListener("click", () => {
        localStorage.setItem(consentKey, "declined");
        document.querySelector(".consent-banner")?.remove();
      });
  }

  document
    .querySelectorAll(".map-consent-button")
    .forEach((button) => button.addEventListener("click", setExternalConsent));
  document.querySelectorAll(".consent-settings").forEach((button) =>
    button.addEventListener("click", () => {
      localStorage.removeItem(consentKey);
      window.location.reload();
    }),
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
