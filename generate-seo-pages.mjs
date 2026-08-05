import { mkdir, writeFile } from "node:fs/promises";

const origin = "https://tinytasklab.com";
const tools = [
  { slug: "image-compressor", name: "Image Squeeze", category: "Image", description: "Shrink JPG and PNG files locally without sending them to a server.", promise: "Smaller images in seconds", badge: "IMG", accent: "blue", score: 89 },
  { slug: "image-resizer", name: "Quick Resize", category: "Image", description: "Resize an image to exact pixel dimensions while keeping control of quality.", promise: "Exact dimensions, no install", badge: "PX", accent: "lime", score: 86 },
  { slug: "webp-converter", name: "WebP Switch", category: "Image", description: "Turn JPG or PNG files into lightweight WebP images in your browser.", promise: "Modern images for faster sites", badge: "W", accent: "peach", score: 84 },
  { slug: "json-formatter", name: "JSON Tidy", category: "Developer", description: "Validate, format, and minify JSON with precise error feedback.", promise: "Readable JSON instantly", badge: "{}", accent: "violet", score: 82 },
  { slug: "csv-to-json", name: "CSV Bridge", category: "Data", description: "Convert spreadsheet-style CSV data into clean JSON without uploading it.", promise: "Move tabular data into code", badge: "CSV", accent: "blue", score: 80 },
  { slug: "text-cleaner", name: "Text Polish", category: "Writing", description: "Fix spacing, line breaks, and casing for copied text in one pass.", promise: "Clean copy, fewer edits", badge: "Aa", accent: "lime", score: 78 },
  { slug: "slug-generator", name: "Slug Spark", category: "Marketing", description: "Turn titles into clean, search-friendly URL slugs.", promise: "Publish-ready URLs", badge: "/-", accent: "peach", score: 76 },
  { slug: "utm-builder", name: "UTM Craft", category: "Marketing", description: "Create consistent campaign URLs without broken parameters.", promise: "Track every campaign cleanly", badge: "↗", accent: "violet", score: 75 },
  { slug: "timestamp-converter", name: "Time Shift", category: "Developer", description: "Convert Unix timestamps and local dates in both directions.", promise: "Human time and machine time", badge: "00", accent: "blue", score: 73 },
  { slug: "contrast-checker", name: "Contrast Check", category: "Developer", description: "Check WCAG contrast ratios before shipping a color combination.", promise: "Accessible colors at a glance", badge: "◐", accent: "lime", score: 71 },
];

const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function seoDetails(tool) {
  if (tool.slug === "contrast-checker") {
    return {
      title: "Free WCAG Contrast Checker (AA & AAA) | TinyTask Lab",
      ogTitle: "Free WCAG Contrast Checker (AA & AAA) | TinyTask Lab",
      description: "Check foreground and background color contrast against WCAG AA and AAA requirements. Free, private, and runs locally in your browser.",
      heading: tool.name,
      content: `<h2>Free WCAG contrast checker for accessible color pairs</h2>
        <p>Check whether text and background colors have enough contrast before you publish a page, interface, or design handoff. This WCAG contrast checker runs locally in your browser, so no color values or design files are uploaded.</p>
        <h3>Check WCAG AA and AAA contrast</h3>
        <p>For normal-size text, WCAG AA requires a contrast ratio of at least 4.5:1 and AAA requires 7:1. For large text, the thresholds are 3:1 for AA and 4.5:1 for AAA. Use the result as a quick accessibility check, then review the full design in its real context.</p>
        <h3>How to use this contrast checker</h3>
        <ol><li>Enter or select a foreground text color and a background color.</li><li>Review the contrast ratio and the AA or AAA result.</li><li>Adjust either color until the pair meets the level you need.</li></ol>
        <h3>Does this work for WCAG 2.1 and mobile?</h3>
        <p>Yes. Contrast-ratio requirements apply across modern web and mobile interfaces. The checker works in current phone, tablet, and desktop browsers.</p>
        <h3>Is this color contrast checker private?</h3>
        <p>Yes. It processes color values in the current browser tab. No account is required and nothing is uploaded to TinyTask Lab.</p>`,
      faq: [
        {
          question: "What contrast ratio passes WCAG AA?",
          answer: "Normal-size text needs at least 4.5:1 for WCAG AA. Large text needs at least 3:1.",
        },
        {
          question: "What contrast ratio passes WCAG AAA?",
          answer: "Normal-size text needs at least 7:1 for WCAG AAA. Large text needs at least 4.5:1.",
        },
        {
          question: "Are my colors uploaded?",
          answer: "No. The checker runs in your current browser tab and does not require an account.",
        },
      ],
    };
  }

  return {
    title: `${tool.name} — Free Online ${tool.category} Tool | TinyTask Lab`,
    ogTitle: `${tool.name} — TinyTask Lab`,
    description: tool.description,
    heading: tool.name,
    content: `<h2>Use ${tool.name} online for free</h2>
        <p>${tool.description} Use it when you need ${tool.promise}. The tool runs directly in your browser, so you can finish a small task without installing another app or opening a new account.</p>
        <h3>How to use ${tool.name}</h3>
        <ol><li>Add the file or text you want to process.</li><li>Choose the available settings for your result.</li><li>Run the tool, then copy or download the output.</li></ol>
        <h3>Is my data uploaded?</h3>
        <p>No. Processing happens inside your current browser tab. TinyTask Lab does not require an account for this tool.</p>
        <h3>Does ${tool.name} work on mobile?</h3>
        <p>Yes. The interface adapts to modern phone, tablet, and desktop browsers.</p>`,
    faq: [],
  };
}

for (const [index, tool] of tools.entries()) {
  const url = `${origin}/tools/${tool.slug}/`;
  const related = [tools[(index + 1) % tools.length], tools[(index + 2) % tools.length], tools[(index + 3) % tools.length]];
  const seo = seoDetails(tool);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url,
    applicationCategory: `${tool.category}Application`,
    operatingSystem: "Any",
    description: seo.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const schemaGraph = [structuredData];
  if (seo.faq.length > 0) {
    schemaGraph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seo.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${seo.title}</title>
  <meta name="description" content="${seo.description}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${seo.ogTitle}">
  <meta property="og:description" content="${seo.description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${origin}/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="../../styles.css?v=paypal2">
  <script type="application/ld+json">${escapeJson(schemaGraph.length === 1 ? structuredData : { "@context": "https://schema.org", "@graph": schemaGraph })}</script>
</head>
<body>
  <main id="toolPage">
    <nav class="site-nav shell"><a class="brand" href="../../"><span class="brand-mark">T</span>TinyTask Lab</a><a class="back-link" href="../../#tools">← All tools</a></nav>
    <header class="tool-header shell"><div id="toolHeroBadge" class="tool-hero-badge accent-${tool.accent}">${tool.badge}</div><div><p class="eyebrow" id="toolEyebrow">${tool.category} utility · Score ${tool.score}</p><h1 id="toolTitle">${seo.heading}</h1><p id="toolDescription">${seo.description}</p></div></header>
    <section class="shell"><div id="workbench" class="workbench-grid"></div></section>
    <section class="trust-row shell"><div><strong>Local first</strong><span>Inputs stay inside this browser tab.</span></div><div><strong>No account</strong><span>Complete the task before any signup.</span></div><div><strong>Free to use</strong><span>Start immediately with no installation.</span></div></section>
    <section class="seo-content shell">
      <article>
        ${seo.content}
      </article>
      <aside class="related-tools"><p class="eyebrow">More tiny tasks</p><h2>Related browser tools</h2>${related.map((item) => `<a href="../${item.slug}/">${item.name}<br><small>${item.description}</small></a>`).join("")}</aside>
    </section>
    <footer class="site-footer shell"><span>© 2026 TinyTask Lab</span><span class="footer-links"><a href="../../terms/index.html">Terms</a><a href="../../privacy/index.html">Privacy</a><a href="../../refunds/index.html">Refunds</a><a href="../../contact/index.html">Contact</a></span></footer>
  </main>
  <script src="../../app.js?v=live-checkout-2"></script>
</body>
</html>`;
  const directory = new URL(`./tools/${tool.slug}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${["terms", "privacy", "refunds", "contact"].map((page) => `  <url><loc>${origin}/${page}/index.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`).join("\n")}
${tools.map((tool) => `  <url><loc>${origin}/tools/${tool.slug}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("./sitemap.xml", import.meta.url), sitemap);
await writeFile(new URL("./robots.txt", import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
