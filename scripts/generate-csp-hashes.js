// Generates CSP SHA-256 hashes for every inline <script> in the HTML served by
// express.static('public'). Run in the Docker build stage after the Next.js static
// export has been copied into public/:
//
//   node scripts/generate-csp-hashes.js <htmlDir> <outputFile>
//
// Exits non-zero (failing the build) if no HTML files or no inline scripts are found.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const [htmlDir, outputFile] = process.argv.slice(2);
if (!htmlDir || !outputFile) {
    console.error('Usage: node scripts/generate-csp-hashes.js <htmlDir> <outputFile>');
    process.exit(1);
}

function listHtmlFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return listHtmlFiles(full);
        return entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
    });
}

// Inline scripts only: <script> tags without a src attribute.
const INLINE_SCRIPT = /<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi;

const htmlFiles = listHtmlFiles(htmlDir);
const hashes = new Set();
let inlineScripts = 0;

for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(INLINE_SCRIPT)) {
        inlineScripts++;
        const digest = crypto.createHash('sha256').update(match[1], 'utf8').digest('base64');
        hashes.add(`sha256-${digest}`);
    }
}

if (htmlFiles.length === 0 || hashes.size === 0) {
    console.error(`CSP hash generation failed: htmlFiles=${htmlFiles.length} hashes=${hashes.size}`);
    process.exit(1);
}

const result = {
    generatedAt: new Date().toISOString(),
    htmlFiles: htmlFiles.length,
    inlineScripts,
    hashes: [...hashes].sort(),
};
fs.writeFileSync(outputFile, `${JSON.stringify(result, null, 2)}\n`);
console.log(`CSP hashes: htmlFiles=${result.htmlFiles} inlineScripts=${inlineScripts} hashes=${result.hashes.length}`);
