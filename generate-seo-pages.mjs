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

const generatedGuidePages = [
  ["wcag-aa-vs-aaa", "WCAG AA vs AAA: Which Contrast Level to Use", "contrast-checker", "Compare WCAG AA and AAA contrast requirements before choosing a practical target for a product."],
  ["4-5-1-contrast-ratio", "4.5:1 Contrast Ratio Explained", "contrast-checker", "Understand when 4.5:1 applies to normal text and how to check a foreground and background pair."],
  ["7-1-contrast-ratio", "7:1 Contrast Ratio Explained", "contrast-checker", "Learn when a 7:1 ratio is useful and how it relates to WCAG AAA for normal-size text."],
  ["large-text-contrast-rules", "Large Text Contrast Rules in WCAG", "contrast-checker", "Use the correct contrast threshold when a heading or label may qualify as large text."],
  ["button-contrast-checklist", "Button Color Contrast Checklist", "contrast-checker", "Check button labels, borders, focus states, and disabled states before shipping an interface."],
  ["link-color-contrast", "How to Check Link Color Contrast", "contrast-checker", "Review link text against its background and distinguish links without relying on color alone."],
  ["placeholder-text-contrast", "Placeholder Text Contrast Guide", "contrast-checker", "Avoid low-contrast placeholder text that makes form fields difficult to read."],
  ["error-message-color-contrast", "Error Message Color Contrast", "contrast-checker", "Check error text, icons, and surfaces so validation feedback remains readable."],
  ["dark-mode-color-contrast", "Dark Mode Color Contrast Checklist", "contrast-checker", "Test dark-theme text and component states instead of assuming a light-theme pair will translate."],
  ["accessible-color-pairs", "How to Build Accessible Color Pairs", "contrast-checker", "Create repeatable foreground and background color pairs for a design system."],
  ["color-contrast-for-designers", "Color Contrast for Designers", "contrast-checker", "Add a lightweight contrast review to a design handoff without changing the design workflow."],
  ["color-contrast-for-developers", "Color Contrast for Developers", "contrast-checker", "Turn visual contrast decisions into practical CSS and component checks before release."],
  ["color-contrast-in-figma", "How to Review Color Contrast in Figma", "contrast-checker", "Use a simple color-pair review alongside Figma designs before engineering handoff."],
  ["color-contrast-in-css", "How to Check Color Contrast in CSS", "contrast-checker", "Review the colors actually used in CSS, including state and surface changes."],
  ["color-contrast-for-mobile-apps", "Mobile App Color Contrast Guide", "contrast-checker", "Apply contrast checks to mobile labels, controls, and small-screen conditions."],
  ["color-contrast-with-gradients", "Color Contrast Over Gradients", "contrast-checker", "Check the weakest part of a gradient when text sits over a changing background."],
  ["color-contrast-over-images", "Color Contrast Over Images", "contrast-checker", "Keep text readable over photos with overlays, placement, and contrast checks."],
  ["color-contrast-accessibility-checklist", "Color Contrast Accessibility Checklist", "contrast-checker", "Use a practical pre-release checklist for text, controls, states, and imagery."],
  ["wcag-contrast-testing-workflow", "A Practical WCAG Contrast Testing Workflow", "contrast-checker", "Build a repeatable contrast review from early design choices through final QA."],
  ["compress-jpg-in-browser", "Compress JPG Images in Your Browser", "image-compressor", "Reduce JPG file size locally before publishing an image to a website or email."],
  ["compress-png-in-browser", "Compress PNG Images in Your Browser", "image-compressor", "Reduce PNG file size in a browser while checking whether the new file is worthwhile."],
  ["reduce-image-size-for-web", "How to Reduce Image Size for the Web", "image-compressor", "Prepare web images with a smaller file size before they slow down a page."],
  ["image-compression-for-websites", "Image Compression for Websites", "image-compressor", "Use a simple image-compression workflow for pages that need to load efficiently."],
  ["image-compression-for-email", "Image Compression for Email", "image-compressor", "Reduce image weight before adding visual assets to an email campaign."],
  ["compress-screenshots", "How to Compress Screenshots", "image-compressor", "Shrink screenshots for bug reports, documentation, support, and product updates."],
  ["image-file-size-guide", "Image File Size Guide for Websites", "image-compressor", "Use practical file-size checks before publishing images on a fast-loading page."],
  ["jpg-vs-png-file-size", "JPG vs PNG File Size: What to Check", "image-compressor", "Choose an image format based on the visual content and the size trade-off."],
  ["when-image-compression-makes-file-larger", "Why Image Compression Can Make a File Larger", "image-compressor", "Understand why some images should keep their original file instead of a new export."],
  ["private-image-compression", "Private Image Compression Without Uploading Files", "image-compressor", "Use local browser processing when you do not want to send an image to a service."],
  ["local-image-compression", "Local Image Compression: A Browser-First Workflow", "image-compressor", "Keep a small image-compression task in the browser instead of adding an upload step."],
  ["image-compression-checklist", "Image Compression Checklist", "image-compressor", "Check source format, output size, quality, and the final page before publishing."],
  ["reduce-page-weight-images", "Reduce Page Weight With Smaller Images", "image-compressor", "Identify image assets that add unnecessary page weight before a launch."],
  ["compress-images-for-portfolio", "Compress Images for a Portfolio Website", "image-compressor", "Prepare portfolio imagery that looks clear without making a project page heavy."],
  ["compress-images-for-blog", "Compress Images for Blog Posts", "image-compressor", "Prepare article images that balance readability and load time."],
  ["preserve-image-quality", "How to Preserve Image Quality When Compressing", "image-compressor", "Review image quality and file size together before replacing a source asset."],
  ["browser-image-compression-limits", "Browser Image Compression Limits", "image-compressor", "Use practical image-size limits so a browser tab can process a file responsively."],
  ["resize-image-online-private", "Resize an Image Online Without Uploading It", "image-resizer", "Resize an image to exact dimensions in a browser-first workflow."],
  ["image-resize-dimensions", "How to Choose Image Resize Dimensions", "image-resizer", "Choose target pixel dimensions before resizing an image for a specific layout."],
  ["resize-image-for-social-media", "Resize Images for Social Media", "image-resizer", "Prepare a source image for a social post while keeping its aspect ratio in mind."],
  ["resize-image-for-web", "Resize Images for the Web", "image-resizer", "Create appropriately sized image assets instead of serving oversized originals."],
  ["image-resize-aspect-ratio", "Image Resize and Aspect Ratio Guide", "image-resizer", "Resize an image without accidentally distorting its proportions."],
  ["webp-vs-jpg", "WebP vs JPG for Website Images", "webp-converter", "Compare common web image formats before choosing an output for a page."],
  ["convert-jpg-to-webp", "Convert JPG to WebP in Your Browser", "webp-converter", "Turn a JPG into WebP locally when a modern web format fits the asset."],
  ["convert-png-to-webp", "Convert PNG to WebP in Your Browser", "webp-converter", "Convert a PNG to WebP while reviewing transparency and output needs."],
  ["webp-conversion-guide", "WebP Conversion Guide for Website Images", "webp-converter", "Use a practical browser-first workflow for testing a WebP conversion."],
  ["json-formatter-guide", "JSON Formatter Guide", "json-formatter", "Format and validate JSON before sharing it with a teammate or using it in code."],
  ["format-json-online", "Format JSON Online Without Uploading It", "json-formatter", "Use a local browser formatter for structured JSON text."],
  ["json-minify-guide", "How to Minify JSON", "json-formatter", "Create compact JSON output when whitespace is no longer needed."],
  ["json-parse-error-guide", "How to Read a JSON Parse Error", "json-formatter", "Use error location feedback to repair malformed JSON more quickly."],
  ["json-pretty-print-guide", "JSON Pretty Print Guide", "json-formatter", "Make nested JSON easier to read before reviewing its structure."],
  ["validate-json-in-browser", "Validate JSON in Your Browser", "json-formatter", "Check JSON syntax locally before adding it to a configuration or request."],
  ["json-formatting-workflow", "A Simple JSON Formatting Workflow", "json-formatter", "Use formatting, validation, and minification as separate steps in a JSON review."],
  ["json-for-developers", "JSON Cleanup for Developers", "json-formatter", "Prepare JSON samples for debugging, code review, and documentation."],
  ["json-for-marketers", "How Marketers Can Read JSON Campaign Data", "json-formatter", "Make exported JSON data easier to inspect before using it in a workflow."],
  ["csv-to-json-guide", "CSV to JSON Conversion Guide", "csv-to-json", "Convert tabular CSV data into JSON when a code or API workflow needs structured records."],
  ["convert-csv-to-json-online", "Convert CSV to JSON Online Without Uploading", "csv-to-json", "Transform a CSV in a browser-first workflow without sending its contents to a server."],
  ["csv-quoted-fields", "CSV Quoted Fields Explained", "csv-to-json", "Handle commas inside quoted CSV values when converting a table to JSON."],
  ["csv-delimiter-guide", "CSV Delimiter Guide: Comma, Tab, or Semicolon", "csv-to-json", "Check which delimiter a CSV uses before converting it to structured JSON."],
  ["csv-to-json-errors", "Common CSV to JSON Errors", "csv-to-json", "Fix uneven rows, missing headers, and delimiter issues before converting CSV data."],
  ["timestamp-converter-guide", "Timestamp Converter Guide", "timestamp-converter", "Convert between Unix timestamps and readable dates without guessing the unit."],
  ["unix-timestamp-seconds-vs-milliseconds", "Unix Timestamp: Seconds vs Milliseconds", "timestamp-converter", "Tell apart 10-digit seconds and 13-digit milliseconds before converting a time."],
  ["convert-unix-timestamp-to-date", "Convert Unix Timestamp to Date", "timestamp-converter", "Turn a machine timestamp into a readable date for debugging or reporting."],
  ["convert-date-to-unix-timestamp", "Convert a Date to Unix Timestamp", "timestamp-converter", "Create a Unix timestamp from a recognizable date and time."],
  ["timestamp-timezone-guide", "Timestamp and Time Zone Guide", "timestamp-converter", "Avoid confusion between machine timestamps and locally displayed dates."],
  ["utm-builder-guide", "UTM Builder Guide", "utm-builder", "Create campaign URLs with consistent source, medium, and campaign parameters."],
  ["utm-source-medium-campaign", "UTM Source, Medium, and Campaign Explained", "utm-builder", "Use the core UTM parameters consistently when building a campaign link."],
  ["utm-link-examples", "UTM Link Examples", "utm-builder", "Review clear examples of campaign URLs before sharing one publicly."],
  ["utm-parameters-checklist", "UTM Parameters Checklist", "utm-builder", "Check a campaign URL for a destination and consistent tracking parameters."],
  ["utm-builder-for-email", "How to Build UTM Links for Email", "utm-builder", "Prepare campaign URLs for an email without manually assembling query parameters."],
  ["slug-generator-guide", "Slug Generator Guide", "slug-generator", "Turn a title into a compact, readable URL slug for publishing."],
  ["how-to-write-url-slugs", "How to Write Better URL Slugs", "slug-generator", "Use short, readable slugs that describe a page without unnecessary characters."],
  ["slugify-title-guide", "How to Slugify a Title", "slug-generator", "Convert a headline into a URL-friendly string before creating a page."],
  ["seo-url-slug-checklist", "SEO URL Slug Checklist", "slug-generator", "Review a URL slug for readability, relevance, and a stable publishing structure."],
  ["text-cleaner-guide", "Text Cleaner Guide", "text-cleaner", "Clean copied text by fixing spacing, line breaks, and casing in a browser tab."],
  ["clean-copied-text", "How to Clean Copied Text", "text-cleaner", "Prepare copied text before pasting it into a document, CMS, or email."],
  ["remove-extra-spaces", "How to Remove Extra Spaces From Text", "text-cleaner", "Fix repeated spaces and inconsistent line breaks in a block of text."],
  ["title-case-text-guide", "Title Case Text Guide", "text-cleaner", "Apply a consistent title case when preparing a heading or label."],
  ["clean-text-for-cms", "Clean Text Before Pasting Into a CMS", "text-cleaner", "Remove messy copied formatting before publishing text in a content system."],
  ["text-cleanup-checklist", "Text Cleanup Checklist", "text-cleaner", "Review spacing, blank lines, and casing before sharing a text draft."],
  ["free-browser-image-tools", "Free Browser Image Tools", "image-compressor", "Find small browser-first workflows for compressing, resizing, and converting image files."],
  ["private-browser-tools", "Private Browser Tools for Small Tasks", "text-cleaner", "Use browser-first utilities when a small task does not need an account or upload."],
  ["developer-utility-tools", "Free Developer Utility Tools", "json-formatter", "Find practical browser tools for JSON, CSV, timestamps, and accessibility checks."],
  ["marketing-utility-tools", "Free Marketing Utility Tools", "utm-builder", "Find small browser tools for campaign URLs, URL slugs, and text cleanup."],
  ["browser-productivity-tools", "Browser Productivity Tools for Everyday Tasks", "text-cleaner", "Use focused utilities to finish small file, text, data, and link tasks quickly."],
].map(([slug, title, tool, description]) => ({ slug, title, tool, description }));

function generatedGuideHtml(page, index) {
  const tool = tools.find((item) => item.slug === page.tool);
  const url = `${origin}/guides/${page.slug}/`;
  const related = generatedGuidePages.filter((item) => item.tool === page.tool && item.slug !== page.slug).slice(0, 2);
  const alternate = generatedGuidePages[(index + 17) % generatedGuidePages.length];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "TinyTask Lab" },
    publisher: { "@type": "Organization", name: "TinyTask Lab" },
  };
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${page.title} | TinyTask Lab</title><meta name="description" content="${page.description}"><link rel="canonical" href="${url}">
<meta property="og:type" content="article"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/og.png"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../../styles.css?v=paypal2"><script type="application/ld+json">${escapeJson(schema)}</script></head>
<body><main id="toolPage"><nav class="site-nav shell"><a class="brand" href="../../"><span class="brand-mark">T</span>TinyTask Lab</a><a class="back-link" href="../../tools/${tool.slug}/">← ${tool.name}</a></nav>
<header class="tool-header shell"><div class="tool-hero-badge accent-${tool.accent}">${tool.badge}</div><div><p class="eyebrow">${tool.category} guide</p><h1>${page.title}</h1><p>${page.description}</p></div></header>
<section class="seo-content shell"><article><h2>What to check</h2><p>${page.description} Start with the real input, state, or output you are working with rather than a generic example. A focused check prevents small details from becoming rework later.</p>
<h2>A practical workflow</h2><ol><li>Define the specific result you need before opening a tool.</li><li>Use a small, representative sample and review the output in context.</li><li>Keep the result only when it matches the requirement for the page, product, or campaign.</li></ol>
<h2>Use ${tool.name} locally</h2><p>TinyTask Lab provides a browser-first ${tool.name} workflow for this task. It does not require an account, and the tool input stays in the current browser tab.</p>
<p><a class="button primary" href="../../tools/${tool.slug}/">Open ${tool.name} →</a></p>
<h2>Next step</h2><p>After completing this check, review the related guide below for another practical part of the same workflow.</p></article>
<aside class="related-tools"><p class="eyebrow">Related guides</p><h2>Continue the workflow</h2>${related.map((item) => `<a href="../${item.slug}/">${item.title}<br><small>${item.description}</small></a>`).join("")}<a href="../${alternate.slug}/">${alternate.title}<br><small>${alternate.description}</small></a></aside></section>
<footer class="site-footer shell"><span>© 2026 TinyTask Lab</span><span class="footer-links"><a href="../../terms/index.html">Terms</a><a href="../../privacy/index.html">Privacy</a><a href="../../refunds/index.html">Refunds</a><a href="../../contact/index.html">Contact</a></span></footer></main></body></html>`;
}

for (const [index, page] of generatedGuidePages.entries()) {
  const directory = new URL(`./guides/${page.slug}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), generatedGuideHtml(page, index));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${["terms", "privacy", "refunds", "contact"].map((page) => `  <url><loc>${origin}/${page}/index.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`).join("\n")}
  <url><loc>${guideUrl}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
${generatedGuidePages.map((page) => `  <url><loc>${origin}/guides/${page.slug}/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`).join("\n")}
${tools.map((tool) => `  <url><loc>${origin}/tools/${tool.slug}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("./sitemap.xml", import.meta.url), sitemap);
await writeFile(new URL("./robots.txt", import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
