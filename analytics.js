(() => {
  const measurementId = "G-FSP41EWM0Q";
  const consentKey = "tinytask-analytics-consent";
  const consent = localStorage.getItem(consentKey);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){ window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { analytics_storage: consent === "granted" ? "granted" : "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
  window.tinytaskTrack = (eventName, params = {}) => {
    if (localStorage.getItem(consentKey) === "granted") window.gtag("event", eventName, params);
  };
  if (consent === "granted") return;
  window.addEventListener("DOMContentLoaded", () => {
    const banner = document.createElement("aside");
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Analytics preference");
    banner.style.cssText = "position:fixed;z-index:9999;right:16px;bottom:16px;max-width:420px;padding:18px;border:2px solid #111;background:#fff;box-shadow:6px 6px 0 #111;font:14px/1.45 system-ui,sans-serif";
    banner.innerHTML = '<strong>Help us improve TinyTask Lab</strong><p>With your permission, we use Google Analytics for anonymous visit and feature-use trends. We never send tool inputs or uploaded files.</p><button type="button" data-choice="accept">Allow analytics</button> <button type="button" data-choice="reject">No thanks</button>';
    const choose = (value) => {
      localStorage.setItem(consentKey, value);
      if (value === "granted") { window.gtag("consent", "update", { analytics_storage: "granted" }); window.gtag("event", "page_view"); }
      banner.remove();
    };
    banner.querySelector('[data-choice="accept"]').onclick = () => choose("granted");
    banner.querySelector('[data-choice="reject"]').onclick = () => choose("denied");
    document.body.append(banner);
  });
})();
