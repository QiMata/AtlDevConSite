const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'content', 'assets', 'img', 'community-partner');
const outFile = path.join(__dirname, '..', 'content', '_data', 'communityPartners.json');

function isImage(name) {
    return /\.(png|jpg|jpeg|gif|svg)$/i.test(name);
}

try {
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, {
            recursive: true
        });
    }
    const files = fs.readdirSync(imagesDir).filter(isImage).map(f => `/assets/img/community-partner/${f}`);
    fs.writeFileSync(outFile, JSON.stringify(files, null, 2));
    console.log(`Wrote ${files.length} community partner entries to ${outFile}`);
} catch (err) {
    console.error('Error generating community partners data:', err);
    process.exit(1);
}