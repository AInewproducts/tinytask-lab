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
        <p><a href="../../guides/wcag-contrast-ratio/">Read the WCAG contrast-ratio guide</a> for the thresholds, the large-text exception, and practical color-pair checks.</p>
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
  <script src="../../app.js?v=traffic-metrics-1"></script>
</body>
</html>`;
  const directory = new URL(`./tools/${tool.slug}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}

const guideUrl = `${origin}/guides/wcag-contrast-ratio/`;
const guideSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WCAG contrast ratio: a practical AA and AAA guide",
  description: "Understand WCAG color-contrast ratios, AA and AAA thresholds, and how to test a text color against its background.",
  mainEntityOfPage: guideUrl,
  author: { "@type": "Organization", name: "TinyTask Lab" },
  publisher: { "@type": "Organization", name: "TinyTask Lab" },
};
const guideHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>WCAG Contrast Ratio: AA & AAA Guide | TinyTask Lab</title>
  <meta name="description" content="Understand WCAG color contrast ratios, AA and AAA thresholds, and how to check text colors against their backgrounds.">
  <link rel="canonical" href="${guideUrl}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="WCAG contrast ratio: a practical AA and AAA guide">
  <meta property="og:description" content="The practical thresholds and checks behind accessible text color pairs.">
  <meta property="og:url" content="${guideUrl}">
  <meta property="og:image" content="${origin}/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="../../styles.css?v=paypal2">
  <script type="application/ld+json">${escapeJson(guideSchema)}</script>
</head>
<body>
  <main id="toolPage">
    <nav class="site-nav shell"><a class="brand" href="../../"><span class="brand-mark">T</span>TinyTask Lab</a><a class="back-link" href="../../tools/contrast-checker/">← Contrast checker</a></nav>
    <header class="tool-header shell"><div class="tool-hero-badge accent-lime">AA</div><div><p class="eyebrow">Accessibility guide</p><h1>WCAG contrast ratio: a practical AA and AAA guide</h1><p>Use contrast ratios to make text easier to read before a design reaches production.</p></div></header>
    <section class="seo-content shell">
      <article>
        <h2>What a WCAG contrast ratio measures</h2>
        <p>A contrast ratio compares the relative luminance of a foreground color and its background. It ranges from 1:1 for identical colors to 21:1 for black against white. The higher the ratio, the easier text is generally to distinguish from the surface behind it.</p>
        <p>Contrast is one part of accessibility, not a complete accessibility audit. Font size, weight, spacing, state changes, icons, and the surrounding interface still matter. But checking the ratio early prevents a common, avoidable problem.</p>
        <h2>WCAG AA and AAA thresholds</h2>
        <table><thead><tr><th>Content</th><th>AA minimum</th><th>AAA minimum</th></tr></thead><tbody><tr><td>Normal text</td><td>4.5:1</td><td>7:1</td></tr><tr><td>Large text</td><td>3:1</td><td>4.5:1</td></tr><tr><td>Non-text UI components and graphics</td><td>3:1 where the criterion applies</td><td>Review the relevant WCAG requirement</td></tr></tbody></table>
        <p>In WCAG 2.x, “large text” generally means at least 24 CSS pixels (about 18 pt) or at least 18.66 CSS pixels bold (about 14 pt bold). Do not treat a slightly larger paragraph as large text: use the normal-text threshold unless the definition is clearly met.</p>
        <h2>How to check a color pair</h2>
        <ol><li>Identify the actual foreground and background colors used in the interface state.</li><li>Check the ratio against the right threshold for the text size and target conformance level.</li><li>Test the same component in hover, focus, disabled, dark-mode, and error states.</li><li>Review the result in the final font, size, weight, and layout—not only on a color swatch.</li></ol>
        <p>A useful habit is to record approved text and surface pairs as design tokens. This prevents a one-off fix from drifting when the same component appears elsewhere.</p>
        <h2>Common contrast mistakes</h2>
        <ul><li><strong>Testing the wrong background:</strong> translucent layers, gradients, and images can change the effective contrast.</li><li><strong>Only checking default state:</strong> links, buttons, placeholders, focus rings, and errors all need their own review.</li><li><strong>Relying on color alone:</strong> an error message should retain meaning through text, icons, or structure as well as color.</li><li><strong>Assuming a passing ratio fixes readability:</strong> very thin fonts or dense text can remain hard to read even when the ratio passes.</li></ul>
        <h2>Check your colors locally</h2>
        <p><a href="../../tools/contrast-checker/">Open the free WCAG Contrast Check tool</a> to test a foreground and background pair. It runs in the browser, requires no account, and does not upload your color values.</p>
        <p>For formal compliance work, review the applicable WCAG success criteria and test the real product experience with people and assistive technology.</p>
      </article>
      <aside class="related-tools"><p class="eyebrow">Try it now</p><h2>Contrast Check</h2><a href="../../tools/contrast-checker/">Check a color pair<br><small>See AA and AAA results in your browser.</small></a><a href="../../tools/image-compressor/">Image Squeeze<br><small>Reduce image size without uploading files.</small></a></aside>
    </section>
    <footer class="site-footer shell"><span>© 2026 TinyTask Lab</span><span class="footer-links"><a href="../../terms/index.html">Terms</a><a href="../../privacy/index.html">Privacy</a><a href="../../refunds/index.html">Refunds</a><a href="../../contact/index.html">Contact</a></span></footer>
  </main>
</body>
</html>`;
const guideDirectory = new URL("./guides/wcag-contrast-ratio/", import.meta.url);
await mkdir(guideDirectory, { recursive: true });
await writeFile(new URL("index.html", guideDirectory), guideHtml);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${["terms", "privacy", "refunds", "contact"].map((page) => `  <url><loc>${origin}/${page}/index.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`).join("\n")}
  <url><loc>${guideUrl}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
${tools.map((tool) => `  <url><loc>${origin}/tools/${tool.slug}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("./sitemap.xml", import.meta.url), sitemap);
await writeFile(new URL("./robots.txt", import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
