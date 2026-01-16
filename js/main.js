/* ---------------------------
   Helpers
--------------------------- */

function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("is-open");
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!expanded));
  });

  // Close menu after clicking a link
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    if (nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

function applyCardBackgrounds() {
  document.querySelectorAll(".card-img[data-bg]").forEach((el) => {
    const url = el.dataset.bg;
    if (url) el.style.backgroundImage = `url("${url}")`;
  });
}

/* ---------------------------
   Modal system 
--------------------------- */

function wireBasicModal({ buttonId, overlayId, closeId, ctaId }) {
  const btn = document.getElementById(buttonId);
  const overlay = document.getElementById(overlayId);
  const closeBtn = document.getElementById(closeId);
  const cta = ctaId ? document.getElementById(ctaId) : null;

  if (!btn || !overlay || !closeBtn) return;

  const open = () => {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });

  closeBtn.addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });

  cta?.addEventListener("click", () => close());
}

/* ---------------------------
   Sponsor modal
--------------------------- */

function initSponsorModalOnce() {
  const overlay = document.getElementById("sponsorModal");
  const closeBtn = document.getElementById("sponsorModalClose");
  const titleEl = document.getElementById("sponsorModalTitle");
  const logoEl = document.getElementById("sponsorModalLogo");
  const descEl = document.getElementById("sponsorModalDesc");
  const linkEl = document.getElementById("sponsorModalLink");

  if (!overlay || !closeBtn || !titleEl || !logoEl || !descEl || !linkEl) return;
  if (overlay.dataset.bound === "true") return; 
  overlay.dataset.bound = "true";

  const open = ({ name, logo, desc, link }) => {
    titleEl.textContent = name || "Sponsor";

    if (logo) {
      logoEl.src = logo;
      logoEl.alt = `${name || "Sponsor"} logo`;
      logoEl.style.display = "";
    } else {
      logoEl.removeAttribute("src");
      logoEl.alt = "";
      logoEl.style.display = "none";
    }

    descEl.textContent = desc || "";

    if (link) {
      linkEl.href = link;
      linkEl.style.display = "";
    } else {
      linkEl.href = "#";
      linkEl.style.display = "none";
    }

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });

  // sponsor clicks
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".sponsor-card");
    if (!card) return;

    // ✅ Only needed if sponsors are <a href="..."> (marquee tiles)
    if (card.tagName === "A") e.preventDefault();

    open({
      name: card.dataset.name,
      logo: card.dataset.logo,
      desc: card.dataset.desc,
      link: card.dataset.link,
    });
  });
}


function initSponsorsMarquee() {
  const track = document.querySelector(".marquee-track");
  if (!track) return;

  if (track.dataset.cloned === "true") return;
  track.dataset.cloned = "true";

  // Get original items
  const items = Array.from(track.children);

  // Deduplicate by sponsor name (safety)
  const seen = new Set();
  const uniqueItems = items.filter(el => {
    const name = el.dataset.name;
    if (!name || seen.has(name)) return false;
    seen.add(name);
    return true;
  });

  // Reset track to clean originals
  track.innerHTML = "";
  uniqueItems.forEach(el => track.appendChild(el));

  // Clone once — SAME ORDER
  uniqueItems.forEach(el => {
    track.appendChild(el.cloneNode(true));
  });
}





/* ---------------------------
   Init
--------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initMobileMenu();

  // Hero modals
  wireBasicModal({
    buttonId: "sessionFormatBtn",
    overlayId: "sessionModal",
    closeId: "sessionModalClose",
    ctaId: "sessionModalCta",
  });

  wireBasicModal({
    buttonId: "upcomingSessionsBtn",
    overlayId: "sessionsModal",
    closeId: "sessionsModalClose",
    ctaId: "sessionsModalCta",
  });
});

/* ---------------------------
   Featured Launch Session
--------------------------- */

const featuredSessions = [
  {
    title: "Session 1",
    day: "Saturday",
    date: "Jan 31",
    time: "12 pm - 1 pm",
    location: "Street Soccer USA SF Fields at East Cut",
    price: "$10",
    spots: "30 total spots",
    link: "https://partiful.com/e/ecZAakLEdw3LcLONksJI"
  },
  {
    title: "Session 2",
    day: "Saturday",
    date: "Jan 31",
    time: "1 pm - 2 pm",
    location: "Street Soccer USA SF Fields at East Cut",
    price: "$10",
    spots: "25 total spots",
    link: "https://partiful.com/e/mdOjDXN8aYD19EmHjB4Q"
  }
];


function initFeaturedSession() {
  const el = document.getElementById("featuredSession");
  if (!el) return;
  if (el.dataset.bound === "true") return;
  el.dataset.bound = "true";

  el.classList.remove("featured-session"); // prevent nested styling
  el.innerHTML = featuredSessions.map(s => `
    <div class="featured-session" style="margin-bottom:12px;">
      <h4 class="featured-title">${s.title}</h4>
      <p class="featured-meta">
        <strong>${s.day}</strong> • ${s.date} • ${s.time}<br>
        ${s.location}
      </p>
      <div class="featured-row">
        <span class="badge">${s.price} • ${s.spots}</span>
        <a class="reserve" href="${s.link}" target="_blank" rel="noopener">Reserve</a>
      </div>
    </div>
  `).join("");
}



window.addEventListener("sections:loaded", () => {
  applyCardBackgrounds();
  initSponsorModalOnce();
  initSponsorsMarquee();
  initFeaturedSession(); 
});
