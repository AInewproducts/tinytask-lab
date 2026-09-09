(() => {
  const measurementId = "G-FSP41EWM0Q";
  const consentKey = "tinytask-analytics-consent";
  const safeTool = (value) => /^(home|[a-z0-9]+(?:-[a-z0-9]+)*)$/.test(value || "") ? value : "home";

  function loadAnalytics() {
    if (window.__tinytaskAnalyticsLoaded) return;
    window.__tinytaskAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }

  window.tinytaskAnalyticsTrack = (event, tool) => {
    if (localStorage.getItem(consentKey) !== "granted" || !window.gtag) return;
    window.gtag("event", event, { tool_name: safeTool(tool) });
  };

  function remember(choice) {
    localStorage.setItem(consentKey, choice);
    document.querySelector(".analytics-consent")?.remove();
    if (choice === "granted") loadAnalytics();
  }

  function resetPreference() {
    localStorage.removeItem(consentKey);
    document.querySelector(".analytics-consent")?.remove();
    showConsent();
  }

  function showConsent() {
    if (localStorage.getItem(consentKey)) {
      if (localStorage.getItem(consentKey) === "granted") loadAnalytics();
      return;
    }
    const banner = document.createElement("section");
    banner.className = "analytics-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Analytics preference");
    banner.innerHTML = `<p>Help us understand which public pages and tools are useful. With your permission, Google Analytics receives anonymous usage measurements. Tool inputs and files are never sent. <a href="/privacy/">Privacy</a></p><div><button class="button primary" type="button" data-choice="granted">Allow analytics</button><button class="button dark" type="button" data-choice="denied">Keep browsing privately</button></div>`;
    banner.addEventListener("click", (event) => {
      const choice = event.target.closest("button")?.dataset.choice;
      if (choice) remember(choice);
    });
    document.body.append(banner);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-analytics-reset]")) resetPreference();
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showConsent, { once: true });
  else showConsent();
})();
