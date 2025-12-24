const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const content = {
  mvp: {
    title: "This Week’s MVP",
    body: `
      <div>
        <div><strong>Player:</strong> session mvp</div>
        <div><strong>Highlight:</strong> headshot / highlight</div>
      </div>
    `
  },

  about: {
    title: "Who is FutSoul?",
    body: `
      <p><strong>Our mission is to bring the beautiful game back to the community.</strong></p>

      <p>
        As access to fields become limited and organizing games gets harder,
        FutSoul creates a space where players can simply show up, play,
        and reconnect through the game.
      </p>

      <div class="modal-cta">
        <button class="contact-btn" id="contactBtn" type="button">
          Get in Touch
        </button>
      </div>
    `
  },

  signup: {
    title: "Sign Up for a Session",
    body: `
      <p><strong>Spots are limited!</strong></p>

      <p>
        Games run in a <strong>4v4 or 5v5 format</strong> depending on field availability.
        Matches are played <strong>first to 3 goals or 5 minutes</strong>, whichever comes first.
      </p>

      <p>
        <strong>Winner stays on</strong>, with teams rotating after
        <strong>two wins in a row</strong> to keep play competitive and moving.
      </p>

      <div class="modal-cta">
        <a
          class="contact-btn"
          href="https://www.paypal.com/ncp/payment/P369522Z6PXGL"
          target="_blank"
          rel="noopener"
        >
          Reserve Your Spot
        </a>
      </div>
    `
  },

  sponsor: {
    title: "This Week’s Sponsor",
    body: `
      <div>
        More information coming soon!
      </div>
    `
  },

  thanks: {
    title: "You’re in ✅",
    body: `
      <p><strong>Thank you for reserving your spot!</strong></p>
      <p>Bring flat shoes and get ready to play — see you soon!</p>
    `
  }
};

function openModal(key) {
  const c = content[key];
  if (!c) return;

  modalTitle.textContent = c.title;
  modalBody.innerHTML = c.body;
  overlay.classList.add("open");

  // Attach "Get in Touch" handler only if that button exists in this modal
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      window.location.href = "mailto:futsoulcommunity@gmail.com";
    });
  }
}

function closeModal() {
  overlay.classList.remove("open");
}

document.querySelectorAll(".word-btn, .poster-btn").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.open));
});

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// Auto-open thank-you modal if redirected back with ?thanks=1
(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("thanks") === "1") {
    openModal("thanks");

    // remove the query so it doesn't pop up again on refresh
    const cleanUrl = window.location.pathname + window.location.hash;
    history.replaceState({}, "", cleanUrl);
  }
})();
