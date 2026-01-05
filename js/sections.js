async function loadSection(mountId, filePath) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const res = await fetch(filePath, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${filePath}: ${res.status}`);
  mount.innerHTML = await res.text();
}

function scrollToHashIfPresent() {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

(async function initSections() {
  try {
    // Load in the same order as mount points
    await loadSection("mount-about", "sections/about.html");
    await loadSection("mount-kotp", "sections/kotp.html");
    await loadSection("mount-signup", "sections/signup.html");
    await loadSection("mount-sponsors", "sections/sponsors.html");
  } catch (err) {
    console.error(err);
  }

  // Let other scripts know sections are in the DOM
  window.dispatchEvent(new Event("sections:loaded"));

  // If user landed on /#signup, scroll after content is injected
  scrollToHashIfPresent();
})();
