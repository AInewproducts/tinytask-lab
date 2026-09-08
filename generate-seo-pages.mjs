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
  if (tool.slug === "timestamp-converter") {
    return {
      title: "Unix Timestamp Converter: Seconds, Milliseconds & Dates | TinyTask Lab",
      ogTitle: "Unix Timestamp Converter | TinyTask Lab",
      description: "Convert Unix timestamps to readable dates or turn dates into Unix time. Check 10-digit seconds and 13-digit milliseconds locally in your browser.",
      heading: "Time Shift",
      content: `<h2>Convert Unix timestamps and readable dates</h2>
        <p>Use this Unix timestamp converter when you need to turn a machine timestamp into a human-readable date, or create a Unix timestamp from a date and time. It runs in the current browser tab, so you can check a value without sending it to a server.</p>
        <h3>Seconds or milliseconds?</h3>
        <p>A 10-digit Unix timestamp usually represents seconds. A 13-digit value usually represents milliseconds. Checking the unit first avoids dates that are off by a factor of 1,000.</p>
        <h3>How to convert a timestamp</h3>
        <ol><li>Paste the timestamp or choose a date and time.</li><li>Confirm whether the timestamp is in seconds or milliseconds.</li><li>Review the resulting date and timezone before copying it into a log, report, or API request.</li></ol>
        <p>Read the <a href="../../guides/timestamp-converter-guide/">timestamp conversion guide</a> for a practical workflow, or use the <a href="../../guides/unix-timestamp-seconds-vs-milliseconds/">seconds vs milliseconds check</a> when the unit is unclear.</p>
        <h3>Does timezone change a Unix timestamp?</h3>
        <p>The Unix timestamp represents one instant in time. Timezone affects how that instant is displayed as a local date and clock time. Always record the timezone used when comparing a displayed date with a timestamp.</p>`,
      faq: [
        { question: "Is a Unix timestamp in seconds or milliseconds?", answer: "Most 10-digit Unix timestamps are seconds; most 13-digit values are milliseconds. Confirm the source format before converting." },
        { question: "Does this timestamp converter upload my value?", answer: "No. The conversion runs in the current browser tab and does not require an account." },
      ],
    };
  }

  if (tool.slug === "image-compressor") {
    return {
      title: "Compress Images Online Without Uploading | TinyTask Lab",
      ogTitle: "Compress Images in Your Browser | TinyTask Lab",
      description: "Compress JPG and PNG images locally in your browser before publishing to a website, blog, portfolio, or email. No account or upload required.",
      heading: "Image Squeeze",
      content: `<h2>Compress JPG and PNG images in your browser</h2>
        <p>Reduce image file size before a website, article, portfolio, or email becomes heavier than it needs to be. Image Squeeze processes supported images in the current browser tab, so the file is not uploaded to TinyTask Lab.</p>
        <h3>When image compression helps</h3>
        <p>Compression is most useful when an image is larger than its published layout needs, or when its format and quality settings preserve more data than viewers can see. Compare the output size and visual result before replacing the source.</p>
        <h3>How to compress an image</h3>
        <ol><li>Select a JPG or PNG image.</li><li>Create the compressed result in the browser.</li><li>Compare the file size and inspect the result at its intended display size before downloading it.</li></ol>
        <p>Use the <a href="../../guides/image-compression-for-websites/">image compression for websites guide</a> for publishing decisions, or see the <a href="../../guides/when-image-compression-makes-file-larger/">file-larger explanation</a> when a new export is not smaller.</p>
        <h3>Are images uploaded?</h3>
        <p>No. Supported image processing happens locally in the current browser tab. No account is required to start.</p>`,
      faq: [
        { question: "Can I compress an image without uploading it?", answer: "Yes. Image Squeeze processes supported JPG and PNG files in the current browser tab." },
        { question: "Will compression always make an image smaller?", answer: "No. Already-optimized files or certain PNG images can become larger. Compare the resulting file size before using it." },
      ],
    };
  }

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
        <h3>Check component states, not just one color token</h3>
        <p>Test the actual foreground and background used for default, hover, focus, disabled, and error states. A token that passes on a white canvas can fail on a tinted surface, image overlay, or dark-mode component. A passing ratio is one focused color-pair check, not a full accessibility audit.</p>
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
  const relatedContent = tool.slug === "contrast-checker"
    ? `<p class="eyebrow">WCAG resources</p><h2>Continue the contrast review</h2><a href="../../guides/wcag-color-contrast-resources/">WCAG color contrast resources<br><small>Find the tool, thresholds, component checklists, and practical next steps in one place.</small></a><a href="../../guides/wcag-aa-vs-aaa/">WCAG AA vs AAA<br><small>Choose a practical contrast target for the product and content you are reviewing.</small></a><a href="../../guides/color-contrast-accessibility-checklist/">Color contrast accessibility checklist<br><small>Check text, controls, states, and imagery before release.</small></a>`
    : `<p class="eyebrow">More tiny tasks</p><h2>Related browser tools</h2>${related.map((item) => `<a href="../${item.slug}/">${item.name}<br><small>${item.description}</small></a>`).join("")}`;
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
      <aside class="related-tools">${relatedContent}</aside>
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
  author: { "@id": `${origin}/#organization` },
  publisher: { "@id": `${origin}/#organization` },
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

const guideDetails = {
  "wcag-aa-vs-aaa": {
    answer: "WCAG AA is the practical baseline for most product interfaces. AAA is a stricter target that can improve readability, but it is not realistic for every component or brand color.",
    applies: "For normal text, AA requires 4.5:1 and AAA requires 7:1. For large text, AA requires 3:1 and AAA requires 4.5:1.",
    checks: ["Set the product's minimum target before choosing colors.", "Use the normal-text threshold unless the text clearly qualifies as large text.", "Check component states separately instead of approving one default color pair."],
  },
  "4-5-1-contrast-ratio": {
    answer: "A 4.5:1 contrast ratio is the WCAG AA minimum for normal-size text against its background.",
    applies: "It applies to normal text in WCAG 2.x. Large text can use the lower 3:1 AA threshold, but thin or borderline-sized text should be treated as normal text.",
    checks: ["Use the actual foreground and background colors, including opacity.", "Check hover, focus, error, and disabled states as separate pairs.", "Review the pair in the final font size and weight, not only as a swatch."],
  },
  "7-1-contrast-ratio": {
    answer: "A 7:1 contrast ratio is the WCAG AAA target for normal-size text. It is stricter than the 4.5:1 AA baseline.",
    applies: "AAA can be valuable for reading-heavy experiences or critical information, but an interface can still meet WCAG AA without every normal-text pair reaching 7:1.",
    checks: ["Start by making essential text meet AA.", "Use 7:1 where the design system can support it without changing meaning or hierarchy.", "Do not use a higher ratio as a substitute for clear labels, size, and spacing."],
  },
  "large-text-contrast-rules": {
    answer: "Large text may use a lower WCAG contrast threshold: 3:1 for AA and 4.5:1 for AAA.",
    applies: "In WCAG 2.x, large text generally means at least 24 CSS pixels (about 18 pt), or at least 18.66 CSS pixels bold (about 14 pt bold). If there is doubt, use the normal-text threshold.",
    checks: ["Measure the rendered text, not the design-tool label.", "Confirm the bold weight is actually used in the browser.", "Use normal-text thresholds for small labels, helper text, and most controls."],
  },
  "button-contrast-checklist": {
    answer: "A button needs more than one passing text color. Its label, boundary or fill, focus indicator, and every interactive state need review.",
    applies: "WCAG contrast requirements differ by element and state. A readable label can still fail if a visible control boundary or focus indicator disappears into the background.",
    checks: ["Check label text against the button fill.", "Check the button boundary or fill against the surrounding surface.", "Test hover, focus, disabled, loading, and error states in the real UI."],
  },
  "link-color-contrast": {
    answer: "Links must be readable against their background and should not rely on color alone to communicate that they are links.",
    applies: "The link color needs an appropriate contrast ratio against its background. When links appear in body text, use another visual cue such as an underline or a non-color distinction.",
    checks: ["Check the default and visited link colors against the page surface.", "Keep a persistent non-color cue for inline links where needed.", "Review hover and focus styles, not just the resting state."],
  },
  "placeholder-text-contrast": {
    answer: "Placeholder text is often too faint to be useful. Treat it as supporting information, not as the only label for a required field.",
    applies: "If placeholder text conveys useful information, users still need to be able to read it against the input surface. A visible label remains the safer pattern.",
    checks: ["Keep a persistent field label outside the placeholder.", "Check placeholder text against the input background.", "Test empty, focused, filled, error, and disabled input states."],
  },
  "error-message-color-contrast": {
    answer: "Error feedback must remain readable and understandable without relying on red alone.",
    applies: "Error text, icons, field borders, and message surfaces each need to work in their actual context. The message should state the problem and the next action in text.",
    checks: ["Check error text against the message background.", "Add descriptive text or an icon instead of communicating an error only by color.", "Test the field, summary, and focus destination together."],
  },
  "dark-mode-color-contrast": {
    answer: "A color pair that passes on a light surface may fail in dark mode because the actual backgrounds, overlays, and component states change.",
    applies: "Dark themes require their own review for body text, muted text, borders, icons, buttons, focus rings, overlays, and imagery.",
    checks: ["Check every token against its dark-theme surface.", "Test text over elevated cards, dialogs, and translucent overlays.", "Review focus, selected, disabled, and error states on real devices."],
  },
  "color-contrast-accessibility-checklist": {
    answer: "A useful color-contrast review checks real components and states, not just a single palette sheet.",
    applies: "Contrast is one accessibility requirement among many. Passing a ratio does not replace testing labels, keyboard focus, text size, or meaning conveyed by color.",
    checks: ["Check normal and large text using the appropriate threshold.", "Check controls, icons, focus indicators, and state changes in context.", "Record approved pairs as design tokens and retest them before release."],
  },
  "timestamp-converter-guide": {
    answer: "Convert a Unix timestamp to a readable date when you need to inspect an API value, log entry, database field, or event time. Convert in the other direction when a system expects Unix time.",
    applies: "Start by identifying the unit and timezone. A 10-digit value is commonly seconds and a 13-digit value is commonly milliseconds; the display timezone changes the readable date, not the instant represented by the timestamp.",
    checks: ["Keep the original value with its source system or API field name.", "Confirm seconds versus milliseconds before accepting the date.", "Record the timezone used when comparing a timestamp with a displayed time."],
  },
  "unix-timestamp-seconds-vs-milliseconds": {
    answer: "A Unix timestamp is commonly stored in seconds as a 10-digit value or milliseconds as a 13-digit value. Using the wrong unit produces a date that is dramatically wrong.",
    applies: "Check documentation or a nearby known value when a timestamp is ambiguous. Some JavaScript APIs use milliseconds while many Unix-oriented APIs use seconds.",
    checks: ["Count the digits, but treat that as a strong clue rather than the only evidence.", "Convert a known sample and compare it with the source event time.", "Keep the chosen unit explicit in API and database documentation."],
  },
  "convert-unix-timestamp-to-date": {
    answer: "To convert a Unix timestamp to a date, enter the value with the correct unit and choose the timezone used for display. The same instant can show a different clock time in another timezone.",
    applies: "Use this for logs, API debugging, analytics exports, database records, and support investigations where a numeric time needs to be reviewed by a person.",
    checks: ["Verify seconds or milliseconds first.", "Use UTC when comparing events from different regions.", "Include the timezone beside any readable date you share in a report."],
  },
  "convert-date-to-unix-timestamp": {
    answer: "To create a Unix timestamp from a date, specify the full date, clock time, and timezone before converting. Leaving out the timezone can shift the resulting instant.",
    applies: "Use this for API requests, scheduled jobs, test fixtures, database fields, and time-based filters that require a numeric Unix value.",
    checks: ["Use an unambiguous date format and include the timezone.", "Confirm whether the receiving system expects seconds or milliseconds.", "Round-trip the output back to a date before submitting a critical value."],
  },
  "timestamp-timezone-guide": {
    answer: "A Unix timestamp identifies an instant; a timezone determines how that instant is displayed as a local date and time. Confusion begins when one is treated as the other.",
    applies: "Timezone review matters for scheduled work, international users, support investigations, dashboards, logs, and daylight-saving changes.",
    checks: ["Store and compare machine times in UTC where practical.", "Show a timezone label beside user-facing dates and times.", "Test dates around daylight-saving transitions when a product supports affected regions."],
  },
  "image-compression-for-websites": {
    answer: "Compress website images after choosing the right displayed dimensions and format. The best result is not only a smaller file: it still looks acceptable at the size visitors actually see.",
    applies: "Use this before publishing hero images, blog media, product screenshots, portfolios, and documentation. It is especially useful when source files are larger than their rendered dimensions.",
    checks: ["Resize oversized images before judging compression quality.", "Compare the compressed file size with the original and inspect both at the intended layout size.", "Keep the original source so a visual regression can be corrected later."],
  },
  "compress-jpg-in-browser": {
    answer: "JPG compression can reduce file size substantially for photographic images, but the right setting depends on the original quality and the displayed size.",
    applies: "Use it for photos, screenshots with photographic detail, and article imagery. Inspect faces, gradients, fine text, and sharp edges after compression.",
    checks: ["Start with the original file and a realistic display size.", "Compare the output visually before publishing it.", "Use a different format or keep the original if artifacts are visible."],
  },
  "compress-png-in-browser": {
    answer: "PNG compression works best when the image benefits from optimization without losing transparency or sharp UI edges. Not every PNG will become meaningfully smaller.",
    applies: "Use it for interface screenshots, graphics, diagrams, and transparent assets. Consider WebP separately when browser support and the asset requirements allow it.",
    checks: ["Confirm that transparency is retained where needed.", "Compare output dimensions and file size with the original.", "Inspect text, icons, and flat color areas for unwanted changes."],
  },
  "when-image-compression-makes-file-larger": {
    answer: "An image can become larger after compression when it was already optimized, when the new format is not suited to its pixels, or when metadata and encoding choices add overhead.",
    applies: "This is common with small assets, already-compressed JPGs, simple PNGs, and conversions made without changing the image dimensions.",
    checks: ["Keep the smaller of the original and output files.", "Compare dimensions, format, and file size before replacing an asset.", "Do not assume a conversion is an improvement without a visual and size check."],
  },
  "browser-image-compression-limits": {
    answer: "Browser-based image compression is practical for ordinary publishing assets, but very large decoded images can consume substantial device memory before an output file is created.",
    applies: "Use a smaller source or resize first for very high-resolution photos, scans, and images with many megapixels, especially on mobile devices.",
    checks: ["Check pixel dimensions as well as file size.", "Process one large image at a time on lower-memory devices.", "Keep a smaller working copy for web publication rather than repeatedly editing the camera original."],
  },
};

function guideArticle(page, tool) {
  const detail = guideDetails[page.slug];
  if (!detail) {
    return `<h2>What to check</h2><p>${page.description} Start with the real input, state, or output you are working with rather than a generic example. A focused check prevents small details from becoming rework later.</p>
<h2>A practical workflow</h2><ol><li>Define the specific result you need before opening a tool.</li><li>Use a small, representative sample and review the output in context.</li><li>Keep the result only when it matches the requirement for the page, product, or campaign.</li></ol>
<h2>Use ${tool.name} locally</h2><p>TinyTask Lab provides a browser-first ${tool.name} workflow for this task. It does not require an account, and the tool input stays in the current browser tab.</p>
<p><a class="button primary" href="../../tools/${tool.slug}/">Open ${tool.name} →</a></p>
<h2>Next step</h2><p>After completing this check, review the related guide below for another practical part of the same workflow.</p>`;
  }
  return `<h2>Short answer</h2><p>${detail.answer}</p>
<h2>When this applies</h2><p>${detail.applies}</p>
<h2>Practical review steps</h2><ol>${detail.checks.map((item) => `<li>${item}</li>`).join("")}</ol>
<h2>Check the actual color pair</h2><p>Use the <a href="../../tools/${tool.slug}/">free ${tool.name}</a> with the foreground and background colors from the real component. It provides an immediate AA and AAA ratio check in the current browser tab.</p>
<h2>Source and limit</h2><p>For the formal requirement, review <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">W3C's WCAG contrast minimum guidance</a>. A ratio result checks a color pair; it is not a complete accessibility audit.</p>`;
}

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
    author: { "@id": `${origin}/#organization` },
    publisher: { "@id": `${origin}/#organization` },
  };
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${page.title} | TinyTask Lab</title><meta name="description" content="${page.description}"><link rel="canonical" href="${url}">
<meta property="og:type" content="article"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/og.png"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="../../styles.css?v=paypal2"><script type="application/ld+json">${escapeJson(schema)}</script></head>
<body><main id="toolPage"><nav class="site-nav shell"><a class="brand" href="../../"><span class="brand-mark">T</span>TinyTask Lab</a><a class="back-link" href="../../tools/${tool.slug}/">← ${tool.name}</a></nav>
<header class="tool-header shell"><div class="tool-hero-badge accent-${tool.accent}">${tool.badge}</div><div><p class="eyebrow">${tool.category} guide</p><h1>${page.title}</h1><p>${page.description}</p></div></header>
<section class="seo-content shell"><article>${guideArticle(page, tool)}</article>
<aside class="related-tools"><p class="eyebrow">Related guides</p><h2>Continue the workflow</h2>${related.map((item) => `<a href="../${item.slug}/">${item.title}<br><small>${item.description}</small></a>`).join("")}<a href="../${alternate.slug}/">${alternate.title}<br><small>${alternate.description}</small></a></aside></section>
<footer class="site-footer shell"><span>© 2026 TinyTask Lab</span><span class="footer-links"><a href="../../terms/index.html">Terms</a><a href="../../privacy/index.html">Privacy</a><a href="../../refunds/index.html">Refunds</a><a href="../../contact/index.html">Contact</a></span></footer></main></body></html>`;
}

for (const [index, page] of generatedGuidePages.entries()) {
  const directory = new URL(`./guides/${page.slug}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), generatedGuideHtml(page, index));
}

const wcagHubUrl = `${origin}/guides/wcag-color-contrast-resources/`;
const wcagHubItems = [
  ["WCAG Contrast Checker", `${origin}/tools/contrast-checker/`, "Check a foreground and background pair against AA and AAA thresholds."],
  ["WCAG Contrast Ratio Guide", guideUrl, "Understand normal text, large text, AA, and AAA thresholds."],
  ["WCAG AA vs AAA", `${origin}/guides/wcag-aa-vs-aaa/`, "Choose a practical contrast target for a product."],
  ["4.5:1 Contrast Ratio", `${origin}/guides/4-5-1-contrast-ratio/`, "The AA baseline for normal text."],
  ["7:1 Contrast Ratio", `${origin}/guides/7-1-contrast-ratio/`, "The AAA target for normal text."],
  ["Button Contrast Checklist", `${origin}/guides/button-contrast-checklist/`, "Review labels, boundaries, focus, and states."],
  ["Dark Mode Contrast Checklist", `${origin}/guides/dark-mode-color-contrast/`, "Review dark-theme text, surfaces, and states."],
  ["Color Contrast Accessibility Checklist", `${origin}/guides/color-contrast-accessibility-checklist/`, "Use a final pre-release contrast review."],
];
const wcagHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "WCAG Color Contrast Resources",
  description: "A practical collection of WCAG color contrast tools, thresholds, and checklists.",
  url: wcagHubUrl,
  isPartOf: { "@id": `${origin}/#organization` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: wcagHubItems.map(([name, url], index) => ({ "@type": "ListItem", position: index + 1, name, url })),
  },
};
const wcagHubHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>WCAG Color Contrast Resources: Tools, Ratios & Checklists | TinyTask Lab</title><meta name="description" content="Use practical WCAG color contrast tools, AA and AAA ratio guides, and component checklists for accessible interfaces.">
<link rel="canonical" href="${wcagHubUrl}"><meta property="og:type" content="website"><meta property="og:title" content="WCAG Color Contrast Resources"><meta property="og:description" content="Tools, ratio explanations, and practical checklists for accessible color contrast."><meta property="og:url" content="${wcagHubUrl}"><meta property="og:image" content="${origin}/og.png"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="../../styles.css?v=paypal2"><script type="application/ld+json">${escapeJson(wcagHubSchema)}</script></head>
<body><main id="toolPage"><nav class="site-nav shell"><a class="brand" href="../../"><span class="brand-mark">T</span>TinyTask Lab</a><a class="back-link" href="../../tools/contrast-checker/">← Contrast checker</a></nav>
<header class="tool-header shell"><div class="tool-hero-badge accent-lime">AA</div><div><p class="eyebrow">Accessibility resource hub</p><h1>WCAG color contrast resources</h1><p>Practical tools, thresholds, and checklists for reviewing text and interface colors before release.</p></div></header>
<section class="seo-content shell"><article><h2>Start with the exact component</h2><p>Contrast requirements depend on the actual foreground, background, text size, and interface state. Check the live color pair first, then use the relevant guide to understand the threshold and edge cases.</p><h2>Core WCAG thresholds</h2><table><thead><tr><th>Content</th><th>AA</th><th>AAA</th></tr></thead><tbody><tr><td>Normal text</td><td>4.5:1</td><td>7:1</td></tr><tr><td>Large text</td><td>3:1</td><td>4.5:1</td></tr></tbody></table><p>These figures are useful starting points, but accessibility also requires clear labels, visible focus, readable typography, and testing in context.</p><h2>Tools and guides</h2>${wcagHubItems.map(([name, url, description]) => `<p><a href="${url}"><strong>${name}</strong></a><br>${description}</p>`).join("")}<h2>Source</h2><p>For formal interpretation, consult the <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">W3C WCAG contrast minimum guidance</a>.</p></article></section>
<footer class="site-footer shell"><span>© 2026 TinyTask Lab</span><span class="footer-links"><a href="../../about/">About</a><a href="../../terms/index.html">Terms</a><a href="../../privacy/index.html">Privacy</a><a href="../../contact/index.html">Contact</a></span></footer></main></body></html>`;
await mkdir(new URL("./guides/wcag-color-contrast-resources/", import.meta.url), { recursive: true });
await writeFile(new URL("./guides/wcag-color-contrast-resources/index.html", import.meta.url), wcagHubHtml);

const timestampHubUrl = `${origin}/guides/unix-timestamp-resources/`;
const timestampHubItems = [
  ["Unix Timestamp Converter", `${origin}/tools/timestamp-converter/`, "Convert Unix timestamps and readable dates in either direction."],
  ["Timestamp Converter Guide", `${origin}/guides/timestamp-converter-guide/`, "Use a safe workflow for API values, logs, and reports."],
  ["Seconds vs Milliseconds", `${origin}/guides/unix-timestamp-seconds-vs-milliseconds/`, "Tell apart common 10-digit and 13-digit timestamp values."],
  ["Convert Unix Timestamp to Date", `${origin}/guides/convert-unix-timestamp-to-date/`, "Read a machine timestamp as a date and time."],
  ["Convert Date to Unix Timestamp", `${origin}/guides/convert-date-to-unix-timestamp/`, "Create a timestamp from a date, time, and timezone."],
  ["Timestamp and Time Zone Guide", `${origin}/guides/timestamp-timezone-guide/`, "Avoid confusing an instant with its local display time."],
];
const timestampHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Unix Timestamp Conversion Resources",
  description: "A practical collection of Unix timestamp conversion tools and guides for seconds, milliseconds, dates, and timezones.",
  url: timestampHubUrl,
  isPartOf: { "@id": `${origin}/#organization` },
  mainEntity: { "@type": "ItemList", itemListElement: timestampHubItems.map(([name, url], index) => ({ "@type": "ListItem", position: index + 1, name, url })) },
};
const timestampHubHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Unix Timestamp Converter Resources: Dates, Seconds & Milliseconds | TinyTask Lab</title><meta name="description" content="Convert Unix timestamps, identify seconds or milliseconds, and avoid timezone mistakes with practical browser-first guides.">
<link rel="canonical" href="${timestampHubUrl}"><meta property="og:type" content="website"><meta property="og:title" content="Unix Timestamp Conversion Resources"><meta property="og:description" content="Tools and practical guides for Unix timestamps, dates, units, and timezones."><meta property="og:url" content="${timestampHubUrl}"><meta property="og:image" content="${origin}/og.png"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="../../styles.css?v=paypal2"><script type="application/ld+json">${escapeJson(timestampHubSchema)}</script></head>
<body><main id="toolPage"><nav class="site-nav shell"><a class="brand" href="../../"><span class="brand-mark">T</span>TinyTask Lab</a><a class="back-link" href="../../tools/timestamp-converter/">← Timestamp converter</a></nav>
<header class="tool-header shell"><div class="tool-hero-badge accent-blue">00</div><div><p class="eyebrow">Developer resource hub</p><h1>Unix timestamp conversion resources</h1><p>Practical tools and checks for timestamps, readable dates, seconds, milliseconds, and timezones.</p></div></header>
<section class="seo-content shell"><article><h2>Start with the value's unit and timezone</h2><p>A Unix timestamp identifies an instant. To interpret it correctly, first confirm whether the source uses seconds or milliseconds, then choose the timezone used for display. This prevents the two most common conversion mistakes.</p><h2>Quick conversion workflow</h2><ol><li>Keep the original timestamp and identify its source field or API.</li><li>Check whether it is seconds or milliseconds.</li><li>Convert it and compare the result with a known event time in the correct timezone.</li></ol><h2>Tools and guides</h2>${timestampHubItems.map(([name, url, description]) => `<p><a href="${url}"><strong>${name}</strong></a><br>${description}</p>`).join("")}<h2>Use the converter locally</h2><p><a class="button primary" href="../../tools/timestamp-converter/">Open Unix Timestamp Converter →</a></p></article></section>
<footer class="site-footer shell"><span>© 2026 TinyTask Lab</span><span class="footer-links"><a href="../../about/">About</a><a href="../../privacy/index.html">Privacy</a><a href="../../contact/index.html">Contact</a></span></footer></main></body></html>`;
await mkdir(new URL("./guides/unix-timestamp-resources/", import.meta.url), { recursive: true });
await writeFile(new URL("./guides/unix-timestamp-resources/index.html", import.meta.url), timestampHubHtml);

const imageHubUrl = `${origin}/guides/image-compression-resources/`;
const imageHubItems = [
  ["Compress Images Online", `${origin}/tools/image-compressor/`, "Compress supported JPG and PNG files in the current browser tab."],
  ["Image Compression for Websites", `${origin}/guides/image-compression-for-websites/`, "Choose dimensions, format, and quality before publishing."],
  ["Compress JPG in Browser", `${origin}/guides/compress-jpg-in-browser/`, "Review photo compression before using the output."],
  ["Compress PNG in Browser", `${origin}/guides/compress-png-in-browser/`, "Check transparency, file size, and sharp UI edges."],
  ["Why Compression Can Make a File Larger", `${origin}/guides/when-image-compression-makes-file-larger/`, "Keep the smaller file instead of assuming a new export wins."],
  ["Browser Image Compression Limits", `${origin}/guides/browser-image-compression-limits/`, "Use practical limits for high-resolution assets and mobile devices."],
];
const imageHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Image Compression Resources",
  description: "A practical collection of browser-first image compression tools and guides for JPG, PNG, websites, and file-size checks.",
  url: imageHubUrl,
  isPartOf: { "@id": `${origin}/#organization` },
  mainEntity: { "@type": "ItemList", itemListElement: imageHubItems.map(([name, url], index) => ({ "@type": "ListItem", position: index + 1, name, url })) },
};
const imageHubHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Image Compression Resources: JPG, PNG & Website Images | TinyTask Lab</title><meta name="description" content="Compress JPG and PNG images locally, compare output quality, and prepare lighter images for websites and publishing.">
<link rel="canonical" href="${imageHubUrl}"><meta property="og:type" content="website"><meta property="og:title" content="Image Compression Resources"><meta property="og:description" content="Tools and practical guides for compressing JPG and PNG images before publishing."><meta property="og:url" content="${imageHubUrl}"><meta property="og:image" content="${origin}/og.png"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="../../styles.css?v=paypal2"><script type="application/ld+json">${escapeJson(imageHubSchema)}</script></head>
<body><main id="toolPage"><nav class="site-nav shell"><a class="brand" href="../../"><span class="brand-mark">T</span>TinyTask Lab</a><a class="back-link" href="../../tools/image-compressor/">← Image compressor</a></nav>
<header class="tool-header shell"><div class="tool-hero-badge accent-blue">IMG</div><div><p class="eyebrow">Image resource hub</p><h1>Image compression resources</h1><p>Practical browser-first checks for smaller JPG and PNG files without giving up the visual result you need.</p></div></header>
<section class="seo-content shell"><article><h2>Choose the right dimensions before compressing</h2><p>An image cannot become efficient only through a quality setting. Start with the size it will actually occupy on the page, then compare the original and compressed versions at that display size.</p><h2>Quick image compression workflow</h2><ol><li>Keep the original source file.</li><li>Resize an oversized source when the page does not need all of its pixels.</li><li>Compress, compare the output size, and inspect visual detail before publishing.</li></ol><h2>Tools and guides</h2>${imageHubItems.map(([name, url, description]) => `<p><a href="${url}"><strong>${name}</strong></a><br>${description}</p>`).join("")}<h2>Compress an image locally</h2><p><a class="button primary" href="../../tools/image-compressor/">Open Image Compressor →</a></p></article></section>
<footer class="site-footer shell"><span>© 2026 TinyTask Lab</span><span class="footer-links"><a href="../../about/">About</a><a href="../../privacy/index.html">Privacy</a><a href="../../contact/index.html">Contact</a></span></footer></main></body></html>`;
await mkdir(new URL("./guides/image-compression-resources/", import.meta.url), { recursive: true });
await writeFile(new URL("./guides/image-compression-resources/index.html", import.meta.url), imageHubHtml);

const aboutUrl = `${origin}/about/`;
const aboutHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>About TinyTask Lab | Browser-first Utility Tools</title><meta name="description" content="Learn what TinyTask Lab builds, how its browser-first tools handle inputs, and where to get support.">
<link rel="canonical" href="${aboutUrl}"><meta property="og:type" content="website"><meta property="og:title" content="About TinyTask Lab"><meta property="og:description" content="Browser-first utility tools for small image, text, data, URL, and accessibility tasks."><meta property="og:url" content="${aboutUrl}"><meta property="og:image" content="${origin}/og.png"><link rel="stylesheet" href="../styles.css?v=paypal2">
<script type="application/ld+json">${escapeJson({"@context":"https://schema.org","@type":"AboutPage","mainEntity":{"@type":"Organization","@id":`${origin}/#organization`,"name":"TinyTask Lab","url":origin,"email":"support@tinytasklab.com"}})}</script></head>
<body><main id="toolPage"><nav class="site-nav shell"><a class="brand" href="../"><span class="brand-mark">T</span>TinyTask Lab</a><a class="back-link" href="../#tools">← All tools</a></nav>
<header class="tool-header shell"><div class="tool-hero-badge accent-blue">TL</div><div><p class="eyebrow">Product information</p><h1>About TinyTask Lab</h1><p>Small, browser-first tools for common image, text, data, URL, and accessibility tasks.</p></div></header>
<section class="seo-content shell"><article><h2>What TinyTask Lab is</h2><p>TinyTask Lab publishes focused utilities for jobs such as checking WCAG color contrast, compressing or resizing images, formatting JSON, converting CSV, building UTM links, and cleaning text. Each tool is designed for one bounded task rather than a broad workspace.</p><h2>How the tools work</h2><p>The public tools are designed to run in the current browser tab. They do not require an account to start. Where a tool processes a file or text input locally, that behavior is described on the tool page and in the <a href="../privacy/index.html">Privacy Policy</a>.</p><h2>Useful starting points</h2><ul><li><a href="../tools/contrast-checker/">WCAG Contrast Check</a> for foreground and background color ratios.</li><li><a href="../tools/image-compressor/">Image Squeeze</a> for browser-based image compression.</li><li><a href="../tools/json-formatter/">JSON Tidy</a> for validating and formatting JSON.</li></ul><h2>Support and policies</h2><p>For support, purchase, refund, or privacy questions, contact <a href="mailto:support@tinytasklab.com">support@tinytasklab.com</a>. See the <a href="../terms/index.html">Terms</a>, <a href="../privacy/index.html">Privacy Policy</a>, and <a href="../refunds/index.html">Refund Policy</a> for the governing details.</p></article></section>
<footer class="site-footer shell"><span>© 2026 TinyTask Lab</span><span class="footer-links"><a href="../terms/index.html">Terms</a><a href="../privacy/index.html">Privacy</a><a href="../refunds/index.html">Refunds</a><a href="../contact/index.html">Contact</a></span></footer></main></body></html>`;
await mkdir(new URL("./about/", import.meta.url), { recursive: true });
await writeFile(new URL("./about/index.html", import.meta.url), aboutHtml);

const llms = `# TinyTask Lab\n\n> Free, browser-first utility tools for small image, text, data, URL, and WCAG color-contrast tasks. Public tools do not require an account to start.\n\n## Core tools\n\n- [WCAG Contrast Check](${origin}/tools/contrast-checker/): Check foreground and background colors against WCAG AA and AAA contrast thresholds.\n- [Image Squeeze](${origin}/tools/image-compressor/): Compress JPG and PNG images in the browser.\n- [Quick Resize](${origin}/tools/image-resizer/): Resize an image to exact pixel dimensions.\n- [JSON Tidy](${origin}/tools/json-formatter/): Validate, format, and minify JSON.\n- [CSV Bridge](${origin}/tools/csv-to-json/): Convert CSV into JSON.\n- [UTM Craft](${origin}/tools/utm-builder/): Build campaign URLs with UTM parameters.\n\n## Primary reference pages\n\n- [About TinyTask Lab](${aboutUrl}): Product scope, browser-first processing, and support details.\n- [WCAG Contrast Ratio Guide](${guideUrl}): AA and AAA ratio thresholds and a practical checking workflow.\n- [Unix Timestamp Conversion Resources](${timestampHubUrl}): Timestamp, date, seconds, milliseconds, and timezone guidance.\n- [Image Compression Resources](${imageHubUrl}): Browser-first JPG, PNG, website-image, and file-size guidance.\n- [Privacy Policy](${origin}/privacy/index.html): Data-handling information.\n- [Terms](${origin}/terms/index.html): Product terms.\n- [Refund Policy](${origin}/refunds/index.html): Purchase refund terms.\n- [Contact](${origin}/contact/index.html): Support contact.\n\n## Notes\n\n- Cite the specific tool or guide page for claims about a tool's capabilities.\n- WCAG contrast results are a focused color-pair check, not a full accessibility audit.\n- Do not infer account, cross-device transfer, or additional paid-feature commitments from the tools or purchase pages.\n`;
await writeFile(new URL("./llms.txt", import.meta.url), llms);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${["about", "terms", "privacy", "refunds", "contact"].map((page) => `  <url><loc>${origin}/${page}/index.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`).join("\n")}
  <url><loc>${guideUrl}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${wcagHubUrl}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${timestampHubUrl}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${imageHubUrl}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
${generatedGuidePages.map((page) => `  <url><loc>${origin}/guides/${page.slug}/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`).join("\n")}
${tools.map((tool) => `  <url><loc>${origin}/tools/${tool.slug}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(new URL("./sitemap.xml", import.meta.url), sitemap);
await writeFile(new URL("./robots.txt", import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
